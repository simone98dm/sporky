<template>
  <div>
    <!-- display song info -->
    <div
      class="rounded-lg shadow-lg bg-neutral-600 dark:bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased mb-5 relative"
      :style="{
        backgroundImage: 'url(' + song.cover + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
      }"
    >
      <div class="md:w-1/3 w-full">
        <img
          class="rounded-lg shadow-lg antialiased"
          :src="song.cover"
          alt="track_cover"
        />
      </div>
      <div class="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
        <div
          class="w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0"
        >
          <div class="text-4xl text-white font-mono leading-tight song-name">
            {{ song.name }}
          </div>
          <div v-if="song.artists" class="text-normal text-gray-400 mb-4">
            <span
              class="border-b border-dashed border-gray-500 pb-1 mr-2"
              v-for="(artist, i) in song.artists"
              :key="i"
            >
              {{ artist.name }}{{ i < song.artists.length - 1 ? ',' : '' }}
            </span>
          </div>
          <div class="mb-0">
            <button
              @click="handleOpenSpotify"
              class="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white text-sm cursor-pointer song-url m-3 transition-colors duration-200"
            >
              Open in Spotify
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * SongInfo - Displays individual track information with album art and metadata
 * @example <SongInfo :song="track" @open-spotify="handleOpen" />
 */
import type { Track } from '~/types';

// Props Interface - Named [ComponentName]Props
interface SongInfoProps {
  song: Track;
}

// Props Destructuring with defaults
const { song } = defineProps<SongInfoProps>();

// Emits Interface - Named [ComponentName]Events
interface SongInfoEvents {
  'open-spotify': [url: string];
}

const emit = defineEmits<SongInfoEvents>();

// Computed properties
const formattedArtists = computed(() => {
  return song.artists.map((artist) => artist.name).join(', ');
});

// Methods
function handleOpenSpotify() {
  emit('open-spotify', song.url);
}
</script>
