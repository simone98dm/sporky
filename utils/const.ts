// Cookie names
export const COOKIE_NAME = 'sporky_access_token';
export const OAUTH_STATE_COOKIE = 'spotify_oauth_state';

// Spotify API endpoints
export const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
export const SPOTIFY_AUTH_BASE = 'https://accounts.spotify.com';

// Time ranges for Spotify API
export const TIME_RANGES = {
  SHORT_TERM: 'short_term',
  MEDIUM_TERM: 'medium_term',
  LONG_TERM: 'long_term',
} as const;

// Time range labels for UI
export const TIME_RANGE_LABELS = {
  [TIME_RANGES.SHORT_TERM]: 'Short term (4 weeks)',
  [TIME_RANGES.MEDIUM_TERM]: 'Medium term (6 months)',
  [TIME_RANGES.LONG_TERM]: 'Long term (1 year)',
} as const;

// Pill options for the time-period selector (Stitch design)
export const TIME_RANGE_OPTIONS = [
  { value: TIME_RANGES.SHORT_TERM, label: 'Last 4 Weeks', short: '4 Weeks' },
  { value: TIME_RANGES.MEDIUM_TERM, label: 'Last 6 Months', short: '6 Months' },
  { value: TIME_RANGES.LONG_TERM, label: 'All Time', short: '1 Year' },
] as const;

// API limits
export const DEFAULT_TRACK_LIMIT = 10;
export const MAX_TRACK_LIMIT = 50;

// Spotify OAuth scopes
export const SPOTIFY_SCOPES = 'user-top-read user-read-private';

// Legal / privacy (see docs/privacy-audit.md). Bump the date when policies change.
export const PRIVACY_CONTROLLER = 'Simone Dal Mas';
export const PRIVACY_CONTACT_EMAIL = 'simone.dalmas@outlook.it';
export const POLICY_LAST_UPDATED = '8 October 2026';
