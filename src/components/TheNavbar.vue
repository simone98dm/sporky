<template>
  <header class="sticky top-0 z-30">
    <nav
      class="flex justify-between items-center bg-gray-900 shadow-lg p-4 text-white"
    >
      <span class="font-semibold text-xl tracking-tight">Sporky</span>
      <div v-if="!authStore.isLogged">
        <NavLink label="Login" :href="url" />
      </div>
      <div v-else class="flex flex-row flex-wrap">
        <NavLink label="Top 4 weeks" @click="groupPerWeek" />
        <NavLink label="Top 6 month" @click="groupPerMonth" />
        <NavLink label="Top 1 year" @click="groupPerYear" />
        <BackgroundAudio />
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import NavLink from "./NavLink.vue";
import BackgroundAudio from "./BackgroundAudio.vue";
import { useAuthStore } from "@/stores/auth";
import { useTopStore } from "@/stores/top";
import { buildSpotifyRedirectUrl } from "@/utils/common";
import { extractTokenFromUrl } from "@/utils/http";

export default Vue.extend({
  components: { NavLink, BackgroundAudio },
  name: "TheNavbar",
  data: () => ({
    authStore: useAuthStore(),
    topStore: useTopStore(),
    url: "",
  }),
  mounted() {
    const { token } = extractTokenFromUrl(this.$route.hash);
    if (!token) {
      const url = buildSpotifyRedirectUrl();
      this.url = url;
    }
    if (token) {
      this.authStore.login(token);
    }
  },
  methods: {
    groupPerYear() {
      this.topStore.filterList(this.authStore.token, "long_term");
    },
    groupPerWeek() {
      this.topStore.filterList(this.authStore.token, "short_term");
    },
    groupPerMonth() {
      this.topStore.filterList(this.authStore.token, "medium_term");
    },
  },
});
</script>
