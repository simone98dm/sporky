import { MappedTrack, SongInfo } from "@/models/Track";
import { RequestOptions, TimeLimit, TrackType } from "@/utils/constants";
import { getTopTracks } from "@/utils/httputils";
import { defineStore } from "pinia";

export const useTopStore = defineStore({
  id: "top",
  state: () => ({
    songs: [] as MappedTrack[],
    filter: "long_term" as TimeLimit,
    loading: false,
  }),
  getters: {
    getSongs(): MappedTrack[] {
      return this.songs;
    },
    isLoading(): boolean {
      return this.loading;
    },
  },
  actions: {
    async retrieveSongs(options: RequestOptions) {
      this.loading = true;
      let { token, type, timespan, offset, timelimit } = options;

      if (!type) {
        type = "tracks";
      }
      if (!timespan) {
        timespan = "long_term";
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
      this.loading = false;
    },
    async filterList(token: string, filter: TimeLimit) {
      this.filter = filter;
      await this.retrieveSongs({
        token,
        timespan: this.filter,
      });
    },
  },
});
