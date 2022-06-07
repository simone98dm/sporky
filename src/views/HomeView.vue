<template>
  <main class="container">
    <Song
      v-for="(song, i) in songs"
      :name="song.name"
      :artists="song.artists"
      :url="song.url"
      :cover="song.cover"
      :key="i"
    ></Song>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Song from "@/components/Song.vue";
import { useTopStore } from "@/stores/top";
import { buildSpotifyRedirectUrl } from "@/utils/common";
import { SongInfo } from "@/models/Track";

export default Vue.extend({
  name: "HomeView",
  data: () => ({
    songs: [] as SongInfo[],
    topStore: useTopStore(),
  }),
  components: { Song },
  mounted() {
    const { token } = this.extractTokenFromUrl();
    if (token) {
      this.topStore.retrieveTopSongs({ token }).then(() => {
        this.songs = this.topStore.songs;
      });
    }

    if (!token) {
      const url = buildSpotifyRedirectUrl();
      window.location.href = url;
    }
  },
  methods: {
    extractTokenFromUrl(): { token: string } {
      const r = this.$route.hash.substring(1, this.$route.hash.length - 1);
      let p = "";
      if (r) {
        p = r.split("=")[1];
      }
      return {
        token: p,
      };
    },
  },
});
</script>
