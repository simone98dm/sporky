import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { UserDTO, Track, TrackDTO } from '~/types';
import { mapTrackToSong } from '~/utils/mapper';
import { generateRandomString } from '~/utils/common';
import { useSpotifyApi } from '~/composables/useSpotifyApi';
import {
  COOKIE_NAME,
  OAUTH_STATE_COOKIE,
  SPOTIFY_AUTH_BASE,
  TIME_RANGES,
  DEFAULT_TRACK_LIMIT,
  SPOTIFY_SCOPES,
} from '~/utils/const';

// Types for better type safety
type TimeRange = 'short_term' | 'medium_term' | 'long_term';
type ApiState = 'idle' | 'loading' | 'success' | 'error';

export const useSporky = defineStore('sporky-store', () => {
  // Composables
  const {
    getCurrentUser,
    getTopTracks: fetchTopTracks,
    createPlaylist,
    addTracksToPlaylist,
  } = useSpotifyApi();

  // Cookie reference (create once, reuse everywhere)
  const accessToken = useCookie(COOKIE_NAME);

  // State
  const errorMessage = ref<string | null>(null);
  const tracks = ref<Record<TimeRange, Track[]>>({
    short_term: [],
    medium_term: [],
    long_term: [],
  });
  const timeRange = ref<TimeRange>(TIME_RANGES.SHORT_TERM);
  const apiState = ref<ApiState>('idle');
  const userProfile = ref<UserDTO | null>(null);

  // Computed
  const isLoading = computed(() => apiState.value === 'loading');
  const hasError = computed(() => apiState.value === 'error');
  const currentTracks = computed(() => tracks.value[timeRange.value]);
  const isAuthenticated = computed(() => {
    return !!accessToken.value;
  });

  // Business logic: Computed properties for music analytics
  const uniqueArtistsCount = computed(() => {
    const artistNames = new Set<string>();
    currentTracks.value.forEach((track) => {
      track.artists.forEach((artist) => {
        artistNames.add(artist.name);
      });
    });
    return artistNames.size;
  });

  const topArtistData = computed(() => {
    const artistCounts = new Map<string, number>();

    currentTracks.value.forEach((track) => {
      track.artists.forEach((artist) => {
        const count = artistCounts.get(artist.name) || 0;
        artistCounts.set(artist.name, count + 1);
      });
    });

    let topArtist = '';
    let maxCount = 0;

    artistCounts.forEach((count, artist) => {
      if (count > maxCount) {
        maxCount = count;
        topArtist = artist;
      }
    });

    return { name: topArtist || 'Unknown', count: maxCount };
  });

  const topArtistName = computed(() => topArtistData.value.name);
  const topArtistCount = computed(() => topArtistData.value.count);

  // Top 5 artists for sharing
  const top5Artists = computed(() => {
    const artistCounts = new Map<string, number>();

    currentTracks.value.forEach((track) => {
      track.artists.forEach((artist) => {
        const count = artistCounts.get(artist.name) || 0;
        artistCounts.set(artist.name, count + 1);
      });
    });

    return Array.from(artistCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count], index) => ({
        name,
        count,
        rank: index + 1,
      }));
  });

  // Helper functions
  const clearError = () => {
    errorMessage.value = null;
    apiState.value = 'idle';
  };

  const setError = (message: string) => {
    errorMessage.value = message;
    apiState.value = 'error';
  };

  const setLoading = () => {
    clearError();
    apiState.value = 'loading';
  };

  const getAccessToken = () => {
    if (!accessToken.value) {
      throw new Error('No access token found');
    }
    return accessToken.value;
  };

  // Get runtime config
  const {
    public: { clientId, redirectUri },
  } = useRuntimeConfig();

  // Actions
  const login = async () => {
    try {
      clearError();
      const state = generateRandomString(16);

      const authorizeUrl = `${SPOTIFY_AUTH_BASE}/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
        redirectUri,
      )}&scope=${encodeURIComponent(SPOTIFY_SCOPES)}&state=${state}`;

      // Store state for validation (optional security enhancement)
      const stateCookie = useCookie(OAUTH_STATE_COOKIE);
      stateCookie.value = state;

      // Use window.open for better debugging, fallback to location.href
      if (process.client) {
        const popup = window.open(authorizeUrl, '_self');
        if (!popup) {
          // Fallback if popup blocked
          window.location.href = authorizeUrl;
        }
      }
    } catch (error) {
      setError('Failed to initiate login');
    }
  };

  const logout = () => {
    try {
      // Clear access token using the shared reference
      accessToken.value = '';

      // Clear oauth state
      const stateCookie = useCookie(OAUTH_STATE_COOKIE);
      stateCookie.value = '';

      // Reset store state
      tracks.value = {
        short_term: [],
        medium_term: [],
        long_term: [],
      };
      userProfile.value = null;
      clearError();

      navigateTo('/login');
    } catch (error) {
      // Force navigation even if there's an error
      navigateTo('/login');
    }
  };

  const getUserProfile = async (): Promise<UserDTO | null> => {
    if (userProfile.value) {
      return userProfile.value; // Return cached profile
    }

    try {
      setLoading();
      const response = await getCurrentUser();

      userProfile.value = response;
      apiState.value = 'success';
      return response;
    } catch (error: any) {
      setError(error.message || 'Failed to fetch user profile');

      // If unauthorized, redirect to login
      if (error.isUnauthorized) {
        logout();
      }

      return null;
    }
  };

  const getTopTracks = async (
    type: string = 'tracks',
    offset: number = 0,
    limit: number = DEFAULT_TRACK_LIMIT,
  ): Promise<void> => {
    // Return early if already have data for this time range
    if (tracks.value[timeRange.value].length > 0 && offset === 0) {
      return;
    }

    try {
      setLoading();
      const response = await fetchTopTracks(timeRange.value, offset, limit);
      const songs = response.items.map((item) => mapTrackToSong(item));

      // Properly update the tracks for the current time range
      tracks.value[timeRange.value] =
        offset === 0 ? songs : [...tracks.value[timeRange.value], ...songs];

      apiState.value = 'success';
    } catch (error: any) {
      setError(error.message || 'Failed to fetch top tracks');

      // If unauthorized, redirect to login
      if (error.isUnauthorized) {
        logout();
      }
    }
  };

  // Helper to change time range and fetch tracks
  const setTimeRange = async (newTimeRange: TimeRange) => {
    timeRange.value = newTimeRange;
    await getTopTracks();
  };

  // Create Spotify playlist with current tracks
  const createSpotifyPlaylist = async (
    playlistName?: string,
    playlistDescription?: string,
  ): Promise<{ success: boolean; playlistUrl?: string; error?: string }> => {
    try {
      // Ensure user profile is loaded
      if (!userProfile.value) {
        await getUserProfile();
      }

      if (!userProfile.value?.id) {
        return { success: false, error: 'User profile not available' };
      }

      // Get track URIs from current tracks
      // Note: track.url already contains the Spotify URI (spotify:track:{id})
      const trackUris = currentTracks.value
        .map((track) => track.url)
        .filter(
          (uri): uri is string =>
            uri !== null && uri.startsWith('spotify:track:'),
        );

      if (trackUris.length === 0) {
        return { success: false, error: 'No tracks available to add' };
      }

      // Generate playlist name based on time range
      const timeRangeLabels = {
        short_term: 'Last 4 Weeks',
        medium_term: 'Last 6 Months',
        long_term: 'All Time',
      };
      const defaultName =
        playlistName || `My Top Tracks - ${timeRangeLabels[timeRange.value]}`;
      const defaultDescription =
        playlistDescription ||
        `Generated by Sporky on ${new Date().toLocaleDateString()}`;

      // Create the playlist
      const playlist = await createPlaylist(
        userProfile.value.id,
        defaultName,
        defaultDescription,
        false, // private by default
      );

      // Add tracks to the playlist
      await addTracksToPlaylist(playlist.id, trackUris);

      return {
        success: true,
        playlistUrl: playlist.external_urls.spotify,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to create playlist',
      };
    }
  };

  return {
    // State
    errorMessage: readonly(errorMessage),
    tracks: readonly(tracks),
    timeRange,
    userProfile: readonly(userProfile),

    // Computed
    isLoading,
    hasError,
    currentTracks,
    isAuthenticated,
    uniqueArtistsCount,
    topArtistData,
    topArtistName,
    topArtistCount,
    top5Artists,

    // Actions
    login,
    logout,
    getUserProfile,
    getTopTracks,
    setTimeRange,
    createSpotifyPlaylist,
    clearError,
  };
});
