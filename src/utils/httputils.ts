import { spotifyApi, stateKey } from "./constants";
import type { Tracks, SongInfo, IUser, MappedTrack } from "@/models/Track";

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
    .then((items: SongInfo[]) => {
      let songs: any[] = [];
      items.map((item) => {
        const song = mapTrackToSong(item);
        songs.push(song);
      });
      return songs;
    })
    .catch((error) => {
      localStorage.removeItem(stateKey);
      console.log(error);
      return [];
    });
}

function mapTrackToSong(track: SongInfo): MappedTrack {
  return {
    name: track.name,
    artists: track.artists,
    album: track.album.name,
    cover: track.album.images[0].url,
    url: track.uri,
  };
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

export function extractTokenFromUrl(hash: string): { token: string } {
  const r = hash.substring(1, hash.length - 1);
  let p = "";
  if (r) {
    p = r.split("=")[1];
  }

  return {
    token: p,
  };
}
