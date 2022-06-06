import { spotifyApi, stateKey } from "./constants";
import type {
  Tracks,
  SongInfo,
  ICreatePlaylistResponse,
  IUser,
} from "../models/Track";

export async function getUserInfo(access_token: string) {
  if (typeof access_token == "undefined") {
    return null;
  }

  return await fetch(`${spotifyApi}/me`, {
    headers: getHeader(access_token),
  }).then((response) => response.json() as unknown as IUser);
}

export async function getTopTracks(
  access_token: string,
  type: string,
  timeRange: string,
  offset: number,
  timeLimit: number
) {
  if (typeof access_token == "undefined") {
    return [];
  }

  let query = buildQueryParams({
    time_range: timeRange,
    offset: offset,
    limit: timeLimit,
  });

  return await fetch(`${spotifyApi}/me/top/${type}${query}`, {
    headers: {
      ...getHeader(access_token),
      Accept: "application/json",
    },
  })
    .then((response) => response.json() as unknown as Tracks)
    .then((response) => (response.items ? response.items : []))
    .catch((error) => {
      localStorage.removeItem(stateKey);
      console.log(error);
      return [];
    });
}

function getHeader(access_token: string): any {
  return {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
}

function buildQueryParams(params: any): string {
  let query = "?";
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const element = params[key];
      query += `&${key}=${element}`;
    }
  }
  return query;
}
