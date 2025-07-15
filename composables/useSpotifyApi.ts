import { SPOTIFY_API_BASE, COOKIE_NAME } from "~/utils/const";
import { useErrorHandler } from "./useErrorHandler";
import type { UserDTO, TrackDTO } from "~/types";

/**
 * Composable for Spotify API interactions
 */
export const useSpotifyApi = () => {
    const { getErrorMessage, isUnauthorizedError } = useErrorHandler();

    const getHeaders = (): Record<string, string> => {
        const accessToken = useCookie(COOKIE_NAME);

        if (!accessToken.value) {
            throw new Error("No access token available");
        }

        return {
            "Authorization": `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
    };

    const apiRequest = async <T>(
        endpoint: string,
        options: any = {}
    ): Promise<T> => {
        try {
            const headers = getHeaders();

            return await $fetch<T>(`${SPOTIFY_API_BASE}${endpoint}`, {
                ...options,
                headers: {
                    ...headers,
                    ...options.headers,
                },
            }) as T;
        } catch (error: any) {
            // Re-throw with consistent error format
            throw {
                ...error,
                message: getErrorMessage(error),
                isUnauthorized: isUnauthorizedError(error),
            };
        }
    };

    const getCurrentUser = (): Promise<UserDTO> => {
        return apiRequest<UserDTO>("/me");
    };

    const getTopTracks = (
        timeRange: string,
        offset = 0,
        limit = 10
    ): Promise<TrackDTO> => {
        return apiRequest<TrackDTO>("/me/top/tracks", {
            params: {
                time_range: timeRange,
                offset,
                limit,
            },
        });
    };

    return {
        getCurrentUser,
        getTopTracks,
        apiRequest,
    };
};
