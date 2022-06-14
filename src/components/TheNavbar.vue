<template>
  <header class="sticky top-0 z-30">
    <nav class="flex items-center justify-between bg-gray-900 shadow-lg p-4">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Spork</span>
      </div>
      <div class="item-end">
        <div v-if="!isLogged">
          <NavLink label="Login" :href="url" />
        </div>
        <div v-else>
          <NavLink label="Top 4 weeks" @click="groupPerWeek" />
          <NavLink label="Top 6 month" @click="groupPerMonth" />
          <NavLink label="Top 1 year" @click="groupPerYear" />
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
