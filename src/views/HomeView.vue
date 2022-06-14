<template>
  <main class="flex justify-center">
    <div
      v-if="userLogged"
      class="
        w-screen
        bg-white
        dark:bg-gray-900
        flex flex-row flex-wrap
        p-3
        overflow-hidden
      "
    >
      <div class="mx-auto md:w-2/3">
        <h1 class="text-white text-center text-4xl mb-4">
          You top traks since {{ selectedFilter }}
        </h1>
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
import { useAuthStore } from "@/stores/auth";
import { TimeLimitLabel } from "@/utils/constants";

export default Vue.extend({
  name: "HomeView",
  data: () => ({
    url: "",
    topStore: useTopStore(),
    authStore: useAuthStore(),
  }),
  components: { Song },
  mounted() {
    if (this.userLogged) {
      const token = this.authStore.token;
      this.topStore.retrieveSongs({ token });
    }
  },
  computed: {
    userLogged() {
      return this.authStore.isLogged;
    },
    isLoading() {
      return this.topStore.isLoading;
    },
    songs() {
      return this.topStore.getSongs;
    },
    selectedFilter() {
      return TimeLimitLabel[this.topStore.filter];
    },
  },
});
</script>
