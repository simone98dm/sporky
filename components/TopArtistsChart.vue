<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-white flex items-center gap-2">
        <div class="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        Top Artists
      </h3>
      <span class="text-sm text-gray-400">Most played</span>
    </div>
    
    <div v-if="artistsData.length === 0" class="text-center py-8">
      <p class="text-gray-400">No artist data available</p>
    </div>
    
    <div v-else class="space-y-4">
      <div
        v-for="(artist, index) in artistsData.slice(0, 5)"
        :key="artist.name"
        class="group"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              {{ index + 1 }}
            </span>
            <span class="text-white font-medium truncate max-w-[200px]">{{ artist.name }}</span>
          </div>
          <span class="text-sm text-gray-400">{{ artist.count }} track{{ artist.count !== 1 ? 's' : '' }}</span>
        </div>
        
        <!-- Progress Bar -->
        <div class="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000 ease-out transform origin-left"
            :style="{ width: `${artist.percentage}%` }"
          ></div>
        </div>
      </div>
      
      <div v-if="artistsData.length > 5" class="text-center pt-4">
        <button
          class="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
          @click="showAll = !showAll"
        >
          {{ showAll ? 'Show Less' : `+${artistsData.length - 5} more artists` }}
        </button>
      </div>
      
      <!-- Extended List -->
      <div v-if="showAll && artistsData.length > 5" class="space-y-3 pt-4 border-t border-white/10">
        <div
          v-for="(artist, index) in artistsData.slice(5)"
          :key="artist.name"
          class="flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-5 h-5 text-xs text-gray-400 bg-gray-700 rounded-full">
              {{ index + 6 }}
            </span>
            <span class="text-gray-300 text-sm truncate max-w-[180px]">{{ artist.name }}</span>
          </div>
          <span class="text-xs text-gray-500">{{ artist.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Track {
    name: string;
    artists: { name: string }[];
    album: string;
    cover: string;
    url: string;
    preview: string;
}

interface ArtistData {
    name: string;
    count: number;
    percentage: number;
}

interface Props {
    tracks: Track[];
}

const props = defineProps<Props>();
const showAll = ref(false);

const artistsData = computed(() => {
    const artistCounts = new Map<string, number>();

    // Count artist occurrences
    props.tracks.forEach(track => {
        track.artists.forEach(artist => {
            const count = artistCounts.get(artist.name) || 0;
            artistCounts.set(artist.name, count + 1);
        });
    });

    // Convert to array and sort by count
    const artistsArray = Array.from(artistCounts.entries()).map(([name, count]) => ({
        name,
        count
    }));

    artistsArray.sort((a, b) => b.count - a.count);

    // Calculate percentages relative to the top artist
    const maxCount = artistsArray[0]?.count || 1;

    return artistsArray.map(artist => ({
        ...artist,
        percentage: (artist.count / maxCount) * 100
    }));
});
</script>
