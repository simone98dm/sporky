import { SongInfo } from "@/models/Track";
import { getTopTracks } from "@/utils/httputils";
import { defineStore } from "pinia";

export const useTopStore = defineStore({
  id: "top",
  state: () => ({
    songs: [] as SongInfo[],
  }),
  actions: {
    async retrieveTopSongs(options: {
      token: string;
      type?: string;
      timespan?: string;
      offset?: number;
      timelimit?: number;
    }) {
      let { token, type, timespan, offset, timelimit } = options;
      if (!type) {
        type = "tracks";
      }
      if (!timespan) {
        timespan = "medium_term";
      }
      if (!offset) {
        offset = 0;
      }
      if (!timelimit) {
        timelimit = 50;
      }
      const songs = await getTopTracks(
        token,
        type,
        timespan,
        offset,
        timelimit
      );
      this.songs = songs;
    },
  },
});
