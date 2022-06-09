<template>
  <main class="flex justify-center">
    <div
      v-if="userLogged"
      :class="[
        'w-screen',
        'bg-white',
        'dark:bg-gray-900',
        'flex flex-row flex-wrap',
        'p-3',
        'overflow-hidden',
      ]"
    >
      <div class="mx-auto md:w-2/3">
        <Song
          v-for="(song, i) in songs"
          :name="song.name"
          :artists="song.artists"
          :url="song.url"
          :cover="song.cover"
          :key="i"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Song from "@/components/Song.vue";
import { useTopStore } from "@/stores/top";
import { MappedTrack } from "@/models/Track";
import { useAuthStore } from "@/stores/auth";

export default Vue.extend({
  name: "HomeView",
  data: () => ({
    songs: [] as MappedTrack[],
    url: "",
    topStore: useTopStore(),
    authStore: useAuthStore(),
  }),
  components: { Song },
  mounted() {
    if (this.userLogged) {
      const token = this.authStore.token;
      this.topStore.retrieveTopSongs({ token }).then(() => {
        this.songs = this.topStore.getSongs;
      });
    }
  },
  computed: {
    userLogged() {
      return this.authStore.isLogged;
    },
  },
});
</script>
