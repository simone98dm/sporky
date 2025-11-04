<template>
  <div class="min-h-screen py-8 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl mb-6">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
          Your Top <span class="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Tracks</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover your most listened-to songs and explore your musical journey through different time periods
        </p>
      </div>

      <!-- Control Panel -->
      <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-12 border border-white/20">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <!-- Time Range Selector -->
          <div class="flex-1">
            <TimeRangeSelector
              v-model="timeRange"
              :disabled="isLoading"
              @update:model-value="handleTimeRangeChange"
            />
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="hasError" class="mb-8">
        <ErrorMessage
          :message="errorMessage || 'An error occurred'"
          :show-retry="true"
          :dismissible="true"
          @retry="handleRetry"
          @dismiss="clearError"
        />
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-16">
        <LoadingSpinner message="Loading your musical journey..." />
      </div>
      
      <!-- Tracks Display -->
      <div v-else-if="currentTracks.length > 0" class="space-y-8">
        <!-- Mobile Layout: Stacked (md and below) -->
        <div class="block lg:hidden space-y-8">
          <!-- Track List -->
          <div class="space-y-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <span class="text-white font-bold text-sm">#</span>
                </div>
                Your Musical Favorites
              </h2>
              <div class="text-sm text-gray-400">
                Based on your listening history
              </div>
            </div>
            <div class="grid gap-6">
              <SongInfo 
                v-for="(song, index) in currentTracks" 
                :key="`${song.name}-${index}`" 
                :song="song"
                class="transform transition-all duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>

          <!-- Stats Cards Section -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Total Tracks"
              subtitle="In this period"
              :value="currentTracks.length"
              description="Songs you've been listening to"
              icon="music"
              color="green"
            />
            
            <StatsCard
              title="Unique Artists"
              subtitle="Diversity score"
              :value="uniqueArtistsCount"
              :description="`${Math.round((uniqueArtistsCount / Math.max(currentTracks.length, 1)) * 100)}% diversity in your taste`"
              icon="trending"
              color="blue"
              :progress="(uniqueArtistsCount / Math.max(currentTracks.length, 1))"
            />
            
            <StatsCard
              title="Top Artist"
              subtitle="Most frequent"
              :value="topArtistName"
              :description="`Appears ${topArtistCount} time${topArtistCount !== 1 ? 's' : ''}`"
              icon="heart"
              color="purple"
            />
          </div>

          <!-- Enhanced Analytics Section -->
          <div class="grid grid-cols-1 gap-8">
            <!-- Top Artists Chart -->
            <TopArtistsChart :tracks="currentTracks" />
            
            <!-- Music DNA Analysis -->
            <MusicDNA :tracks="currentTracks" />
          </div>

          <!-- Quick Actions -->
          <div>
            <QuickActions :tracks="currentTracks" :time-range="timeRange" />
          </div>
        </div>

        <!-- Desktop Layout: Side by side (lg and above) -->
        <div class="hidden lg:flex gap-8">
          <!-- Left: Song List (60% width) -->
          <div class="flex-1 w-3/5">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <span class="text-white font-bold text-sm">#</span>
                </div>
                Your Musical Favorites
              </h2>
              <div class="text-sm text-gray-400">
                Based on your listening history
              </div>
            </div>
            <div class="grid gap-6 pr-4">
              <SongInfo 
                v-for="(song, index) in currentTracks" 
                :key="`${song.name}-${index}`" 
                :song="song"
                class="transform transition-all duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>

          <!-- Right: Stats and Analytics (40% width) -->
          <div class="w-2/5 space-y-8">
            <!-- Stats Cards Section -->
            <div class="space-y-6">
              <h3 class="text-xl font-bold text-white">Your Stats</h3>
              <div class="grid grid-cols-1 gap-4">
                <StatsCard
                  title="Total Tracks"
                  subtitle="In this period"
                  :value="currentTracks.length"
                  description="Songs you've been listening to"
                  icon="music"
                  color="green"
                />
                
                <StatsCard
                  title="Unique Artists"
                  subtitle="Diversity score"
                  :value="uniqueArtistsCount"
                  :description="`${Math.round((uniqueArtistsCount / Math.max(currentTracks.length, 1)) * 100)}% diversity in your taste`"
                  icon="trending"
                  color="blue"
                  :progress="(uniqueArtistsCount / Math.max(currentTracks.length, 1))"
                />
                
                <StatsCard
                  title="Top Artist"
                  subtitle="Most frequent"
                  :value="topArtistName"
                  :description="`Appears ${topArtistCount} time${topArtistCount !== 1 ? 's' : ''}`"
                  icon="heart"
                  color="purple"
                />
              </div>
            </div>

            <!-- Enhanced Analytics Section -->
            <div class="space-y-6">
              <h3 class="text-xl font-bold text-white">Analytics</h3>
              <div class="space-y-6">
                <!-- Top Artists Chart -->
                <TopArtistsChart :tracks="currentTracks" />
                
                <!-- Music DNA Analysis -->
                <MusicDNA :tracks="currentTracks" />
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="space-y-6">
              <h3 class="text-xl font-bold text-white">Quick Actions</h3>
              <QuickActions :tracks="currentTracks" :time-range="timeRange" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="!isLoading && !hasError" class="text-center py-16">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-6">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-4">No tracks found</h3>
        <p class="text-gray-400 max-w-md mx-auto">
          We couldn't find any tracks for this time period. Try selecting a different time range or listen to more music on Spotify!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, computed } from "vue";
import { useSporky } from "~/stores/sporky";

const client = useSporky();
const {
  errorMessage,
  timeRange,
  isLoading,
  hasError,
  currentTracks,
  uniqueArtistsCount,
  topArtistName,
  topArtistCount
} = storeToRefs(client);

const handleRetry = async () => {
  await client.getTopTracks();
};

const handleTimeRangeChange = async (newTimeRange: string) => {
  await client.setTimeRange(newTimeRange as any);
};

onMounted(async () => {
  await client.getTopTracks();
});
</script>