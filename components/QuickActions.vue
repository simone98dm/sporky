<template>
  <div
    class="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
  >
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold text-white flex items-center gap-2">
        <div
          class="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center"
        >
          <svg
            class="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </div>
        Quick Actions
      </h3>
      <span class="text-sm text-gray-400">Share & Export</span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Save to Spotify Playlist -->
      <button
        class="group relative p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-400/30 hover:border-green-400/50 rounded-2xl transition-all duration-300 transform hover:scale-105"
        @click="saveToSpotifyPlaylist"
        :disabled="isLoading"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.42.179-.78.54-.84 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.081zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
              />
            </svg>
          </div>
          <div class="text-left">
            <h4 class="text-white font-semibold">Save to Spotify</h4>
            <p class="text-sm text-gray-300">Create playlist</p>
          </div>
        </div>
        <div
          v-if="isLoading"
          class="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center"
        >
          <div
            class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
      </button>

      <!-- Share Playlist URL -->
      <button
        v-if="lastCreatedPlaylistUrl"
        class="group relative p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-400/30 hover:border-blue-400/50 rounded-2xl transition-all duration-300 transform hover:scale-105"
        @click="sharePlaylistUrl"
        :disabled="isLoading"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
          </div>
          <div class="text-left">
            <h4 class="text-white font-semibold">Share Playlist</h4>
            <p class="text-sm text-gray-300">Copy link to clipboard</p>
          </div>
        </div>
      </button>

      <!-- Export Data -->
      <div class="relative">
        <button
          class="group w-full p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-400/30 hover:border-blue-400/50 rounded-2xl transition-all duration-300 transform hover:scale-105"
          @click="toggleExportMenu"
          :disabled="isLoading"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div class="text-left">
              <h4 class="text-white font-semibold">Export Data</h4>
              <p class="text-sm text-gray-300">Download your tracks</p>
            </div>
          </div>
        </button>

        <!-- Export Menu -->
        <div
          v-if="showExportMenu"
          class="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden z-10"
        >
          <button
            v-for="format in exportFormats"
            :key="format.type"
            class="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 border-b border-white/10 last:border-b-0"
            @click="exportData(format.type)"
          >
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 flex items-center justify-center">
                <component
                  :is="'span'"
                  v-html="format.icon"
                  class="text-gray-300"
                ></component>
              </div>
              <div>
                <p class="text-white text-sm font-medium">{{ format.name }}</p>
                <p class="text-xs text-gray-400">{{ format.description }}</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Open in Spotify -->
      <button
        class="group relative p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-400/30 hover:border-purple-400/50 rounded-2xl transition-all duration-300 transform hover:scale-105"
        @click="openInSpotify"
        :disabled="isLoading"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.42.179-.78.54-.84 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.081zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
              />
            </svg>
          </div>
          <div class="text-left">
            <h4 class="text-white font-semibold">Open in Spotify</h4>
            <p class="text-sm text-gray-300">View in app</p>
          </div>
        </div>
      </button>
    </div>

    <!-- Status Messages -->
    <div
      v-if="statusMessage"
      class="mt-4 p-3 rounded-xl"
      :class="
        statusMessage.type === 'success'
          ? 'bg-green-500/20 border border-green-400/30'
          : 'bg-red-500/20 border border-red-400/30'
      "
    >
      <p
        class="text-sm"
        :class="
          statusMessage.type === 'success' ? 'text-green-300' : 'text-red-300'
        "
      >
        {{ statusMessage.text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * QuickActions - Action buttons for sharing, exporting, and managing tracks
 * @example <QuickActions :tracks="currentTracks" :time-range="timeRange" />
 */
import { ref, onMounted, onUnmounted } from 'vue';
import type { Track } from '~/types';

// Props Interface - Named [ComponentName]Props
interface QuickActionsProps {
  tracks: Track[];
  timeRange: string;
}

// Props Destructuring with defaults
const { tracks, timeRange } = defineProps<QuickActionsProps>();

const sporkyStore = useSporky();
const showExportMenu = ref(false);
const isLoading = ref(false);
const statusMessage = ref<{ type: 'success' | 'error'; text: string } | null>(
  null,
);
const lastCreatedPlaylistUrl = ref<string | null>(null);

const exportFormats = [
  {
    type: 'json',
    name: 'JSON',
    description: 'Developer-friendly format',
    icon: '{ }',
  },
  {
    type: 'csv',
    name: 'CSV',
    description: 'Spreadsheet compatible',
    icon: '📊',
  },
  {
    type: 'txt',
    name: 'Text',
    description: 'Simple text list',
    icon: '📝',
  },
];

const toggleExportMenu = () => {
  showExportMenu.value = !showExportMenu.value;
};

const saveToSpotifyPlaylist = async () => {
  isLoading.value = true;
  try {
    const result = await sporkyStore.createSpotifyPlaylist();

    if (result.success && result.playlistUrl) {
      lastCreatedPlaylistUrl.value = result.playlistUrl;
      showStatusMessage('Playlist created on Spotify!', 'success');
    } else {
      showStatusMessage(result.error || 'Failed to create playlist', 'error');
    }
  } catch (error) {
    showStatusMessage('Failed to create playlist', 'error');
  } finally {
    isLoading.value = false;
  }
};

const sharePlaylistUrl = async () => {
  if (!lastCreatedPlaylistUrl.value) return;

  try {
    await navigator.clipboard.writeText(lastCreatedPlaylistUrl.value);
    showStatusMessage('Playlist URL copied to clipboard!', 'success');
  } catch (error) {
    showStatusMessage('Failed to copy to clipboard', 'error');
  }
};

const exportData = (format: string) => {
  showExportMenu.value = false;
  isLoading.value = true;

  try {
    let content = '';
    let mimeType = '';
    let filename = '';

    const timestamp = new Date().toISOString().split('T')[0];

    switch (format) {
      case 'json':
        content = JSON.stringify(tracks, null, 2);
        mimeType = 'application/json';
        filename = `sporky-tracks-${timeRange}-${timestamp}.json`;
        break;

      case 'csv':
        const csvHeader = 'Track Name,Artists,Album,Spotify URL\n';
        const csvRows = tracks
          .map(
            (track) =>
              `"${track.name}","${track.artists.map((a) => a.name).join('; ')}","${track.album}","${track.url}"`,
          )
          .join('\n');
        content = csvHeader + csvRows;
        mimeType = 'text/csv';
        filename = `sporky-tracks-${timeRange}-${timestamp}.csv`;
        break;

      case 'txt':
        content = `My Top Tracks (${timeRange}) - Generated ${new Date().toLocaleDateString()}\n\n${tracks
          .map(
            (track, index) =>
              `${index + 1}. ${track.name} - ${track.artists.map((a) => a.name).join(', ')}`,
          )
          .join('\n')}`;
        mimeType = 'text/plain';
        filename = `sporky-tracks-${timeRange}-${timestamp}.txt`;
        break;
    }

    // Create and trigger download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showStatusMessage(`Exported as ${format.toUpperCase()}!`, 'success');
  } catch (error) {
    showStatusMessage('Failed to export data', 'error');
  } finally {
    isLoading.value = false;
  }
};

const openInSpotify = () => {
  isLoading.value = true;
  try {
    // Open Spotify web player
    window.open('https://open.spotify.com/', '_blank');
    showStatusMessage('Opening Spotify...', 'success');
  } catch (error) {
    showStatusMessage('Failed to open Spotify', 'error');
  } finally {
    isLoading.value = false;
  }
};

const saveFavorites = () => {
  isLoading.value = true;
  try {
    // Save to localStorage as a simple bookmark system
    const favorites = {
      timeRange: timeRange,
      tracks: tracks,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      `sporky-favorites-${Date.now()}`,
      JSON.stringify(favorites),
    );
    showStatusMessage('Favorites saved locally!', 'success');
  } catch (error) {
    showStatusMessage('Failed to save favorites', 'error');
  } finally {
    isLoading.value = false;
  }
};

const showStatusMessage = (text: string, type: 'success' | 'error') => {
  statusMessage.value = { text, type };
  setTimeout(() => {
    statusMessage.value = null;
  }, 3000);
};

// Close export menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    showExportMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
