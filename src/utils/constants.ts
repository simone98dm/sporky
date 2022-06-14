export let stateKey = "spotify_auth_state";

export let spotifyApi = "https://api.spotify.com/v1";

export type TimeLimit = "long_term" | "medium_term" | "short_term";
export type TrackType = "tracks" | "artists";

export type RequestOptions = {
  token: string;
  type?: TrackType;
  timespan?: TimeLimit;
  offset?: number;
  timelimit?: number;
};

export const TimeLimitLabel = {
  ["long_term"]: "1 year",
  ["medium_term"]: "6 months",
  ["short_term"]: "4 weeks",
};
