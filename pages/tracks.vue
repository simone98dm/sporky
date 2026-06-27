<template>
  <div class="mx-auto max-w-7xl">
    <!-- Header + time tabs -->
    <header
      class="mb-section-margin flex flex-col justify-between gap-6 md:flex-row md:items-end"
    >
      <div>
        <h2
          class="mb-2 text-display-lg-mobile font-extrabold tracking-tight text-on-surface md:text-display-lg"
        >
          Top Tracks
        </h2>
        <p class="text-body-lg text-on-surface-variant">
          Your most played tracks across all time and space.
        </p>
      </div>
      <TimePeriodSelector
        :model-value="timeRange"
        :disabled="isLoading"
        @update:model-value="handleTimeRangeChange"
      />
    </header>

    <!-- Error -->
    <ErrorMessage
      v-if="hasError"
      :message="errorMessage || 'An error occurred'"
      :show-retry="true"
      @retry="handleRetry"
    />

    <!-- Grid -->
    <div
      v-else
      class="grid grid-cols-1 gap-card-gap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <template v-if="isLoading">
        <TrackCardSkeleton v-for="n in 10" :key="n" />
      </template>

      <template v-else-if="currentTracks.length > 0">
        <TrackCard
          v-for="track in currentTracks"
          :key="track.id"
          :track="track"
        />
      </template>
    </div>

    <!-- Empty -->
    <div
      v-if="!isLoading && !hasError && currentTracks.length === 0"
      class="flex flex-col items-center justify-center rounded-xl py-16 text-center layer-1"
    >
      <span
        class="material-symbols-outlined mb-4 text-5xl text-on-surface-variant"
        >music_off</span
      >
      <h3 class="mb-2 text-headline-md text-on-surface">No tracks found</h3>
      <p class="max-w-md text-body-sm text-on-surface-variant">
        We couldn't find any tracks for this period. Try another time range or
        listen to more music on Spotify.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSporky } from '~/stores/sporky';

const store = useSporky();
const { errorMessage, timeRange, isLoading, hasError, currentTracks } =
  storeToRefs(store);

const handleRetry = () => store.getTopTracks();
const handleTimeRangeChange = (value: typeof timeRange.value) =>
  store.setTimeRange(value);

onMounted(() => store.getTopTracks());
</script>
