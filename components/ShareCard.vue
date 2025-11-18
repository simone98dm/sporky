<template>
  <div
    ref="shareCardRef"
    class="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-6 text-white overflow-hidden share-card"
    style="width: 400px; height: 500px"
  >
    <!-- Abstract Background Figures -->
    <div class="absolute inset-0 opacity-20">
      <!-- Large geometric shapes -->
      <div
        class="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full blur-2xl transform rotate-45"
      ></div>
      <div
        class="absolute top-20 -right-20 w-48 h-48 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl transform -rotate-12"
      ></div>
      <div
        class="absolute bottom-10 left-1/4 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl transform rotate-30"
      ></div>

      <!-- Abstract geometric elements -->
      <div
        class="absolute top-1/3 left-10 w-20 h-20 border-4 border-purple-400/30 rounded-full transform rotate-45"
      ></div>
      <div
        class="absolute bottom-1/3 right-10 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg transform -rotate-30"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-indigo-400/40 rounded-full"
      ></div>

      <!-- Flowing lines -->
      <div class="absolute top-0 left-0 w-full h-full">
        <svg class="w-full h-full" viewBox="0 0 400 500" fill="none">
          <path
            d="M50 100 Q100 50 200 80 T350 120"
            stroke="url(#gradient1)"
            stroke-width="2"
            opacity="0.3"
          />
          <path
            d="M350 200 Q300 250 200 220 T50 280"
            stroke="url(#gradient2)"
            stroke-width="2"
            opacity="0.3"
          />
          <path
            d="M100 350 Q150 400 250 380 T350 420"
            stroke="url(#gradient3)"
            stroke-width="2"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ec4899" />
              <stop offset="100%" stop-color="#8b5cf6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#06b6d4" />
              <stop offset="100%" stop-color="#3b82f6" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#f59e0b" />
              <stop offset="100%" stop-color="#dc2626" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 h-full flex flex-col">
      <!-- Header -->
      <div class="text-center mb-4 flex-shrink-0" style="margin-bottom: 16px">
        <div class="flex items-center justify-center gap-3 mb-3">
          <div
            class="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
          </div>
          <h1
            class="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Sporky
          </h1>
        </div>
        <p class="text-sm text-gray-300 font-medium">My Top Artists</p>
        <p class="text-xs text-gray-400 mt-1 font-medium">
          {{ timeRangeLabel }}
        </p>
      </div>

      <!-- Artists List -->
      <div class="flex-1 space-y-2 overflow-hidden" style="max-height: 280px">
        <div
          v-for="artist in top5Artists"
          :key="artist.name"
          class="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/20 artist-card"
        >
          <!-- Rank Badge -->
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            :class="getRankColor(artist.rank)"
          >
            {{ artist.rank }}
          </div>

          <!-- Artist Info -->
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-sm truncate text-white artist-name">
              {{ artist.name }}
            </h3>
            <p class="text-xs text-gray-400">
              {{ artist.count }} track{{ artist.count !== 1 ? 's' : '' }}
            </p>
          </div>

          <!-- Decorative Accent -->
          <div class="flex flex-col gap-1">
            <div
              class="w-2 h-2 rounded-full"
              :class="getAccentColor(artist.rank)"
            ></div>
            <div
              class="w-2 h-2 rounded-full opacity-60"
              :class="getAccentColor(artist.rank)"
            ></div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-4 flex-shrink-0" style="margin-top: 16px">
        <p class="text-xs text-gray-400 font-medium">Generated by Sporky 🎵</p>
        <p class="text-xs text-gray-500 mt-1">
          {{ new Date().toLocaleDateString() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ShareCard - Visual share card component for top artists
 * Can be converted to PNG for social media sharing
 */
import { ref, computed } from 'vue';

interface ArtistData {
  name: string;
  count: number;
  rank: number;
}

interface ShareCardProps {
  top5Artists: ArtistData[];
  timeRange: string;
}

const props = defineProps<ShareCardProps>();

const shareCardRef = ref<HTMLDivElement>();

// Time range labels
const timeRangeLabels = {
  short_term: 'Last 4 Weeks',
  medium_term: 'Last 6 Months',
  long_term: 'All Time',
};

const timeRangeLabel = computed(() => {
  return (
    timeRangeLabels[props.timeRange as keyof typeof timeRangeLabels] ||
    props.timeRange
  );
});

// Color scheme for ranks
const getRankColor = (rank: number): string => {
  const colors = {
    1: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black',
    2: 'bg-gradient-to-r from-gray-300 to-gray-500 text-black',
    3: 'bg-gradient-to-r from-orange-600 to-red-600 text-white',
    4: 'bg-gradient-to-r from-blue-400 to-blue-600 text-white',
    5: 'bg-gradient-to-r from-purple-400 to-purple-600 text-white',
  };
  return colors[rank as keyof typeof colors] || 'bg-gray-600 text-white';
};

// Accent colors for decorative elements
const getAccentColor = (rank: number): string => {
  const colors = {
    1: 'bg-yellow-400',
    2: 'bg-gray-400',
    3: 'bg-orange-500',
    4: 'bg-blue-500',
    5: 'bg-purple-500',
  };
  return colors[rank as keyof typeof colors] || 'bg-gray-500';
};

// Expose the element for PNG generation
defineExpose({
  shareCardRef,
});
</script>

<style scoped>
/* Ensure text is crisp for PNG export */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Ensure proper text rendering for PNG export */
.share-card {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.2;
}

/* Prevent text overflow in artist names */
.artist-name {
  word-break: break-word;
  hyphens: auto;
  overflow-wrap: break-word;
  height: 24px;
}

/* Ensure consistent spacing for PNG export */
.artist-card {
  min-height: 56px;
  display: flex;
  align-items: center;
}
</style>
