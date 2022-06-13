<template>
  <header class="sticky top-0 z-50">
    <nav
      class="
        flex
        items-center
        justify-between
        flex-wrap
        backdrop-filter backdrop-blur-sm
        bg-blue-700
        p-6
      "
    >
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Spork</span>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow" v-if="!isLogged">
          <nav-link label="Login" :href="url"></nav-link>
        </div>
        <div v-else>
          <nav-link label="Top 4 weeks" @click="groupPerWeek"></nav-link>
          <nav-link label="Top 6 month" @click="groupPerMonth"></nav-link>
          <nav-link label="Top 1 year" @click="groupPerYear"></nav-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import { useAuthStore } from "@/stores/auth";
import { useTopStore } from "@/stores/top";
import { buildSpotifyRedirectUrl } from "@/utils/common";
import { extractTokenFromUrl } from "@/utils/httputils";
import NavLink from "./NavLink.vue";
export default Vue.extend({
  components: { NavLink },
  name: "TheNavbar",
  data: () => ({
    authStore: useAuthStore(),
    url: "",
    topStore: useTopStore(),
  }),
  computed: {
    isLogged() {
      return this.authStore.isLogged;
    },
  },
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
