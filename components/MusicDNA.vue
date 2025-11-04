<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-white flex items-center gap-2">
        <div class="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        Music DNA
      </h3>
      <span class="text-sm text-gray-400">Your style</span>
    </div>
    
    <div v-if="genreTags.length === 0" class="text-center py-8">
      <p class="text-gray-400">Analyzing your music taste...</p>
    </div>
    
    <div v-else class="space-y-4">
      <!-- Primary Genres -->
      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-gray-300 uppercase tracking-wide">Primary Genres</h4>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="genre in genreTags.slice(0, 3)"
            :key="genre.name"
            class="px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-full text-sm font-medium text-white backdrop-blur-sm"
          >
            <span>{{ genre.name }}</span>
            <span class="ml-2 text-xs text-green-300">{{ genre.percentage }}%</span>
          </div>
        </div>
      </div>
      
      <!-- Secondary Genres -->
      <div v-if="genreTags.length > 3" class="space-y-3">
        <h4 class="text-sm font-semibold text-gray-300 uppercase tracking-wide">Secondary Genres</h4>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="genre in genreTags.slice(3, 8)"
            :key="genre.name"
            class="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-gray-300 backdrop-blur-sm"
          >
            <span>{{ genre.name }}</span>
            <span class="ml-1 text-xs text-gray-400">{{ genre.percentage }}%</span>
          </div>
        </div>
      </div>
      
      <!-- Music Characteristics -->
      <div class="pt-4 border-t border-white/10">
        <h4 class="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-3">Your Music Profile</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-300">Artist Diversity</span>
              <span class="text-white font-medium">{{ diversityScore }}%</span>
            </div>
            <div class="w-full bg-gray-700/50 rounded-full h-2">
              <div
                class="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000"
                :style="{ width: `${diversityScore}%` }"
              ></div>
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-300">Era Spread</span>
              <span class="text-white font-medium">{{ eraSpread }}%</span>
            </div>
            <div class="w-full bg-gray-700/50 rounded-full h-2">
              <div
                class="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-1000"
                :style="{ width: `${eraSpread}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Taste Indicators -->
      <div class="flex flex-wrap gap-2 pt-2">
        <span
          v-for="indicator in tasteIndicators"
          :key="indicator.name"
          class="px-2 py-1 text-xs font-medium rounded-md"
          :class="indicator.color"
        >
          {{ indicator.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * MusicDNA - Genre analysis and music taste characteristics display
 * @example <MusicDNA :tracks="currentTracks" />
 */
import { computed } from 'vue';
import type { Track } from '~/types';

// Props Interface - Named [ComponentName]Props
interface MusicDNAProps {
    tracks: Track[];
}

// Props Destructuring with defaults
const { tracks } = defineProps<MusicDNAProps>();

// Computed properties - Genre extraction and analysis
const genreTags = computed(() => {
    const genreCounts = new Map<string, number>();
    const totalTracks = tracks.length;

    // Extract genres from artists (this is a simplified approach since Spotify's track API doesn't include genres)
    // In a real implementation, you'd need to fetch artist details to get genres
    const mockGenres = [
        'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Indie', 'R&B', 'Alternative', 'Folk',
        'Jazz', 'Classical', 'Country', 'Reggae', 'Blues', 'Funk', 'Ambient'
    ];

    // Mock genre assignment based on artist names (in real app, use Spotify's artist API)
    tracks.forEach(() => {
        const randomGenre = mockGenres[Math.floor(Math.random() * mockGenres.length)];
        const count = genreCounts.get(randomGenre) || 0;
        genreCounts.set(randomGenre, count + 1);
    });

    const genresArray = Array.from(genreCounts.entries()).map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / totalTracks) * 100)
    }));

    return genresArray.sort((a, b) => b.count - a.count).slice(0, 8);
});

// Artist diversity calculation
const diversityScore = computed(() => {
    const uniqueArtists = new Set();
    tracks.forEach(track => {
        track.artists.forEach(artist => {
            uniqueArtists.add(artist.name);
        });
    });

    return Math.min(Math.round((uniqueArtists.size / tracks.length) * 100), 100);
});

// Era spread calculation (simplified since album is a string)
const eraSpread = computed(() => {
    // Since we don't have release dates in the current track structure,
    // we'll simulate era diversity based on track variety
    const trackNames = new Set(tracks.map(track => track.name));
    const diversityFactor = trackNames.size / tracks.length;

    return Math.min(Math.round(diversityFactor * 100), 100);
});

// Taste indicators based on listening patterns
const tasteIndicators = computed(() => {
    const indicators = [];

    if (diversityScore.value > 70) {
        indicators.push({ name: 'Eclectic', color: 'bg-purple-500/20 text-purple-300 border border-purple-400/30' });
    }

    if (diversityScore.value < 30) {
        indicators.push({ name: 'Focused', color: 'bg-blue-500/20 text-blue-300 border border-blue-400/30' });
    }

    if (eraSpread.value > 60) {
        indicators.push({ name: 'Time Traveler', color: 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' });
    }

    if (tracks.length > 40) {
        indicators.push({ name: 'Power Listener', color: 'bg-green-500/20 text-green-300 border border-green-400/30' });
    }

    return indicators;
});
</script>
