import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { UserDTO, Track, TrackDTO } from "~/types";
import { mapTrackToSong } from "~/utils/mapper";
import { generateRandomString } from "~/utils/common";
import { useSpotifyApi } from "~/composables/useSpotifyApi";
import {
  COOKIE_NAME,
  OAUTH_STATE_COOKIE,
  SPOTIFY_AUTH_BASE,
  TIME_RANGES,
  DEFAULT_TRACK_LIMIT
} from "~/utils/const";

// Types for better type safety
type TimeRange = "short_term" | "medium_term" | "long_term";
type ApiState = "idle" | "loading" | "success" | "error";

export const useSporky = defineStore("sporky-store", () => {
  // Composables
  const { getCurrentUser, getTopTracks: fetchTopTracks } = useSpotifyApi();

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
  const apiState = ref<ApiState>("idle");
  const userProfile = ref<UserDTO | null>(null);

  // Computed
  const isLoading = computed(() => apiState.value === "loading");
  const hasError = computed(() => apiState.value === "error");
  const currentTracks = computed(() => tracks.value[timeRange.value]);
  const isAuthenticated = computed(() => {
    return !!accessToken.value;
  });

  // Helper functions
  const clearError = () => {
    errorMessage.value = null;
    apiState.value = "idle";
  };

  const setError = (message: string) => {
    errorMessage.value = message;
    apiState.value = "error";
  };

  const setLoading = () => {
    clearError();
    apiState.value = "loading";
  };

  const getAccessToken = () => {
    if (!accessToken.value) {
      throw new Error("No access token found");
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
        redirectUri
      )}&scope=user-top-read&state=${state}`;

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
      setError("Failed to initiate login");
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    try {
      // Clear access token using the shared reference
      accessToken.value = "";

      // Clear oauth state
      const stateCookie = useCookie(OAUTH_STATE_COOKIE);
      stateCookie.value = "";

      // Reset store state
      tracks.value = {
        short_term: [],
        medium_term: [],
        long_term: [],
      };
      userProfile.value = null;
      clearError();

      navigateTo("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Force navigation even if there's an error
      navigateTo("/login");
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
      apiState.value = "success";
      return response;
    } catch (error: any) {
      setError(error.message || "Failed to fetch user profile");
      console.error("Error getting user profile:", error);

      // If unauthorized, redirect to login
      if (error.isUnauthorized) {
        logout();
      }

      return null;
    }
  };

  const getTopTracks = async (
    type: string = "tracks",
    offset: number = 0,
    limit: number = DEFAULT_TRACK_LIMIT
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
      tracks.value[timeRange.value] = offset === 0 ? songs : [...tracks.value[timeRange.value], ...songs];

      apiState.value = "success";
    } catch (error: any) {
      setError(error.message || "Failed to fetch top tracks");
      console.error("Error getting top tracks:", error);

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

    // Actions
    login,
    logout,
    getUserProfile,
    getTopTracks,
    setTimeRange,
    clearError,
  };
});
