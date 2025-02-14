import { ref } from "vue";
import { defineStore } from "pinia";
import type { UserDTO, Track, TrackDTO } from "~/types";
import { mapTrackToSong } from "~/utils/mapper";
import { generateRandomString } from "~/utils/common";

export const useSporky = defineStore("sporky-store", () => {
  const errorMessage = ref<string | null>(null);
  const tracks = ref<Record<string, Track[]> | null>(null);
  const timeRange = ref("short_term");

  const {
    public: { clientId },
  } = useRuntimeConfig();

  const login = async () => {
    const state = generateRandomString(16);
    const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=user-top-read&state=${state}`;
    window.location.href = authorizeUrl;
  };

  const logout = () => {
    const accessToken = useCookie(COOKIE_NAME);
    accessToken.value = "";
    navigateTo("/login");
  };

  const getUserProfile = async () => {
    const accessToken = useCookie(COOKIE_NAME);
    try {
      const response = await $fetch<UserDTO>("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      return response;
    } catch (error: any) {
      errorMessage.value = error.message || "Failed to fetch user profile.";
      console.error("Error getting user profile:", error);
      return null;
    }
  };

  const getTopTracks = async (
    type: string = "tracks",
    offset: number = 0,
    timeLimit: number = 10
  ) => {
    try {
      const accessToken = useCookie(COOKIE_NAME);
      const response = await $fetch<TrackDTO>(
        `https://api.spotify.com/v1/me/top/${type}`,
        {
          params: {
            time_range: timeRange.value,
            offset: offset,
            limit: timeLimit,
          },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
          },
        }
      );

      const songs = response.items.map((item) => mapTrackToSong(item));

      tracks.value = {
        [timeRange.value]: songs,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    errorMessage,
    tracks,
    timeRange,
    login,
    logout,
    getUserProfile,
    getTopTracks,
  };
});
