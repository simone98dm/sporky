<template>
  <header>
    <nav class="flex items-center justify-between flex-wrap bg-blue-700 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Spork</span>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow" v-if="!isLogged">
          <a
            class="
              block
              lg:inline-block
              text-teal-200
              hover:text-white
              bg-green-600
              font-semibold
              leading-none
              text-white
              py-4
              px-10
              rounded
              hover:bg-green-500
              focus:ring-2
              focus:ring-offset-2
              focus:ring-green-600
              focus:outline-none
            "
            :href="url"
          >
            Login
          </a>
        </div>
        <div v-else>
          <a
            class="
              block
              lg:inline-block
              text-teal-200
              hover:text-white
              bg-blue-600
              font-semibold
              leading-none
              text-white
              py-4
              px-10
              rounded
              hover:bg-blue-500
              focus:ring-2
              focus:ring-offset-2
              focus:ring-green-600
              focus:outline-none
              cursor-pointer
              mr-4
            "
            @click="groupPerWeek"
          >
            Top 4 weeks
          </a>

          <a
            class="
              block
              lg:inline-block
              text-teal-200
              hover:text-white
              bg-blue-600
              font-semibold
              leading-none
              text-white
              py-4
              px-10
              rounded
              hover:bg-blue-500
              focus:ring-2
              focus:ring-offset-2
              focus:ring-green-600
              focus:outline-none
              cursor-pointer
              mr-4
            "
            @click="groupPerMonth"
          >
            Top 6 month
          </a>

          <a
            class="
              block
              lg:inline-block
              text-teal-200
              hover:text-white
              bg-blue-600
              font-semibold
              leading-none
              text-white
              py-4
              px-10
              rounded
              hover:bg-blue-500
              focus:ring-2
              focus:ring-offset-2
              focus:ring-green-600
              focus:outline-none
              cursor-pointer
              mr-4
            "
            @click="groupPerYear"
          >
            Top 1 year
          </a>
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
import { TimeLimit } from "@/utils/constants";
import { extractTokenFromUrl } from "@/utils/httputils";
export default Vue.extend({
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
      this.topStore.setFilter(this.authStore.token, TimeLimit.Years);
    },
    groupPerWeek() {
      this.topStore.setFilter(this.authStore.token, TimeLimit.Weeks);
    },
    groupPerMonth() {
      this.topStore.setFilter(this.authStore.token, TimeLimit.Months);
    },
  },
});
</script>
