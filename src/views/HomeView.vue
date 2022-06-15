<template>
  <main class="flex justify-center items-center mt-4 overflow-hidden">
    <div class="mx-auto md:w-2/3 sm:mx-10 xs:mx-5">
      <div v-if="userLogged">
        <h1 class="text-white text-center text-4xl mb-4">
          Hey👋
          <span v-if="username">{{ username }}</span>
        </h1>
        <h3 class="text-white text-center text-xl mb-4">
          Your top tracks since {{ selectedFilter }}
        </h3>
        <div v-if="!isLoading">
          <Song
            v-for="(song, i) in songs"
            :name="song.name"
            :artists="song.artists"
            :url="song.url"
            :cover="song.cover"
            :key="i"
          />
        </div>
        <div v-else>Loading...</div>
      </div>
      <div v-else>
        <h1 class="text-white text-center text-4xl mb-4 h-screen">
          You need to be logged in to see your top tracks, please login
        </h1>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Song from "@/components/Song.vue";
import { useTopStore } from "@/stores/top";
import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";
import { TimeLimitLabel } from "@/utils/constants";

export default Vue.extend({
  name: "HomeView",
  data: () => ({
    url: "",
    topStore: useTopStore(),
    authStore: useAuthStore(),
    userStore: useUserStore(),
  }),
  components: { Song },
  mounted() {
    if (this.userLogged) {
      const token = this.authStore.token;
      this.topStore.retrieveSongs({ token });
      this.userStore.retriveUsername(token);
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
    username() {
      return this.userStore.getUsername;
    },
  },
});
</script>
