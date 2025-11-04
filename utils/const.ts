// Cookie names
export const COOKIE_NAME = "sporky_access_token";
export const OAUTH_STATE_COOKIE = "spotify_oauth_state";

// Spotify API endpoints
export const SPOTIFY_API_BASE = "https://api.spotify.com/v1";
export const SPOTIFY_AUTH_BASE = "https://accounts.spotify.com";

// Time ranges for Spotify API
export const TIME_RANGES = {
    SHORT_TERM: "short_term",
    MEDIUM_TERM: "medium_term",
    LONG_TERM: "long_term",
} as const;

// Time range labels for UI
export const TIME_RANGE_LABELS = {
    [TIME_RANGES.SHORT_TERM]: "Short term (4 weeks)",
    [TIME_RANGES.MEDIUM_TERM]: "Medium term (6 months)",
    [TIME_RANGES.LONG_TERM]: "Long term (1 year)",
} as const;

// API limits
export const DEFAULT_TRACK_LIMIT = 10;
export const MAX_TRACK_LIMIT = 50;

// Spotify OAuth scopes
export const SPOTIFY_SCOPES = "user-top-read user-read-private user-read-email playlist-modify-public playlist-modify-private";
