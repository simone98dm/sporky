<template>
  <NuxtLink
    :to="`/track/${track.id}`"
    class="track-card group flex cursor-pointer flex-col gap-4 rounded-xl p-4 layer-1 transition-colors duration-300 hover:bg-[#282828]"
  >
    <!-- Artwork -->
    <div
      class="relative aspect-square w-full overflow-hidden rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
    >
      <img
        :src="track.cover"
        :alt="`${track.name} artwork`"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        class="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40"
      ></div>
      <button
        v-if="track.preview"
        type="button"
        class="absolute bottom-4 right-4 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-primary-container text-on-primary-container opacity-0 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group-hover:translate-y-0 group-hover:opacity-100"
        :aria-label="playing ? 'Pause preview' : 'Play preview'"
        @click.prevent="player.toggle(track)"
      >
        <span class="material-symbols-outlined fill">{{
          playing ? 'pause' : 'play_arrow'
        }}</span>
      </button>
    </div>

    <!-- Meta -->
    <div>
      <h3 class="truncate font-bold text-body-lg text-on-surface">
        {{ track.name }}
      </h3>
      <p class="truncate text-body-sm text-on-surface-variant">
        {{ artistNames }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Track } from '~/types';
import { useAudioPlayer } from '~/composables/useAudioPlayer';

interface TrackCardProps {
  track: Track;
}

const { track } = defineProps<TrackCardProps>();

const player = useAudioPlayer();
const playing = computed(
  () => player.isCurrent(track.id) && player.isPlaying.value,
);

const artistNames = computed(() => track.artists.map((a) => a.name).join(', '));
</script>
