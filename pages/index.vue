<template>
  <div class="flex justify-center items-center mt-4 overflow-hidden">
    <div class="flex flex-col items-center md:max-w-screen-lg sm:mx-10 xs:mx-5">
      <h1 class="text-center text-4xl mb-4">Your top tracks</h1>
      <span v-if="errorMessage" class="text-center text-red-500 text-xl">
        {{ errorMessage }}
      </span>

      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/2 mb-4"
        @click="client.logout()"
      >
        Logout with Spotify
      </button>

      <select
        class="block w-full p-2 mb-4 border border-gray-300 rounded-md"
        v-model="timeRange"
        @change="client.getTopTracks()"
      >
        <option value="short_term">Short term (4 weeks)</option>
        <option value="medium_term">Medium term (6 months)</option>
        <option value="long_term">Long term (1 year)</option>
      </select>

      <span v-if="!tracks">Loading...</span>
      <div v-else>
        <SongInfo v-for="song in tracks[timeRange]" :key="song" :song />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useSporky } from "~/stores/sporky";

const client = useSporky();
const { tracks, timeRange, errorMessage } = storeToRefs(client);

onMounted(async () => {
  await client.getTopTracks();
});
</script>
