<template>
  <main class="flex justify-center items-center mt-4 overflow-hidden">
    <div class="mx-auto md:max-w-screen-lg sm:mx-10 xs:mx-5">
      <div v-if="authStore.isLogged">
        <h1 class="text-center text-4xl mb-4" v-if="userStore.getUsername">
          Hey👋 {{ userStore.getUsername }}
        </h1>
        <h3 class="text-center text-xl mb-4">
          Your top tracks since {{ selectedFilter }}
        </h3>
        <div v-if="!topStore.isLoading">
          <Song
            v-for="(song, i) in topStore.getSongs"
            :name="song.name"
            :artists="song.artists"
            :url="song.url"
            :cover="song.cover"
            :preview="song.preview"
            :key="i"
          />
        </div>
        <div v-else class="text-center text-4xl mb-4 h-screen">Loading...</div>
      </div>
      <div v-else>
        <h1 class="text-center text-4xl mb-4 h-screen">
          You need to be logged in to see your top tracks, please login
        </h1>
      </div>
    </div>
    <BackgroundAudio />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Song from "@/components/Song.vue";
import BackgroundAudio from "@/components/BackgroundAudio.vue";
import { useTopStore } from "@/stores/top";
import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";
import { TimeLimitLabel } from "@/utils/constants";

export default Vue.extend({
  name: "HomeView",
  components: { Song, BackgroundAudio },
  data: () => ({
    url: "",
    topStore: useTopStore(),
    authStore: useAuthStore(),
    userStore: useUserStore(),
  }),
  mounted() {
    if (this.authStore.isLogged) {
      const token = this.authStore.token;
      this.topStore.retrieveSongs({ token });
      this.userStore.retriveUsername(token);
    }
  },
  computed: {
    selectedFilter() {
      return TimeLimitLabel[this.topStore.filter];
    },
  },
});
</script>
