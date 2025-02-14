import type { Track, TrackDetails } from "~/types";

export function mapTrackToSong(track: TrackDetails): Track {
  return {
    name: track.name,
    artists: track.artists,
    album: track.album.name,
    cover: track.album.images[0].url,
    preview: track.preview_url,
    url: track.uri,
  };
}
