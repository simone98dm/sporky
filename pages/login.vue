<template>
  <div class="flex justify-center items-center mt-4 overflow-hidden">
    <!-- Login form -->
    <div class="mx-auto md:max-w-screen-lg sm:mx-10 xs:mx-5">
      <div>
        <h1 class="text-center text-4xl mb-4">
          You need to be logged in to see your top tracks, please login
        </h1>
      </div>

      <div class="flex flex-col items-center justify-center">
        <span v-if="$route.query.error" class="text-red-500 text-xl mb-4">
          There's an error, try again later
        </span>

        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/2"
          @click="client.login()"
        >
          Login with Spotify
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSporky } from "~/stores/sporky";
const client = useSporky();
</script>
