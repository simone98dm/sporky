<template>
  <div class="mx-auto mt-8 flex max-w-7xl flex-col gap-section-margin md:mt-12">
    <!-- Header -->
    <section
      class="flex flex-col justify-between gap-6 md:flex-row md:items-end"
    >
      <div>
        <h2
          class="mb-2 text-display-lg-mobile text-on-surface md:text-display-lg"
        >
          {{ greeting }}.
        </h2>
        <p class="text-body-lg text-on-surface-variant">
          Your listening patterns are evolving. Here's a look at your recent
          rhythm.
        </p>
      </div>
      <TimePeriodSelector
        :model-value="timeRange"
        variant="short"
        :disabled="isLoading"
        @update:model-value="handleTimeRangeChange"
      />
    </section>

    <!-- Error -->
    <ErrorMessage
      v-if="hasError"
      :message="errorMessage || 'An error occurred'"
      :show-retry="true"
      @retry="handleRetry"
    />

    <!-- Bento grid -->
    <section v-else class="grid grid-cols-1 gap-card-gap md:grid-cols-3">
      <template v-if="isLoading">
        <div v-for="n in 3" :key="n" class="h-64 rounded-xl skeleton"></div>
      </template>

      <template v-else-if="hasTracks">
        <!-- Top Artist -->
        <div
          class="layer-1 group relative h-64 cursor-default overflow-hidden rounded-xl p-6"
        >
          <div
            class="absolute inset-0 z-0 bg-cover bg-center opacity-40 blur-sm transition-opacity duration-300 group-hover:opacity-60"
            :style="{ backgroundImage: `url('${topArtistCover}')` }"
          ></div>
          <div
            class="absolute inset-0 z-0 bg-gradient-to-t from-[#181818] via-[#181818]/80 to-transparent"
          ></div>
          <div class="relative z-10 flex h-full flex-col justify-end">
            <div class="mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined fill text-sm text-primary"
                >stars</span
              >
              <span
                class="text-label-caps uppercase tracking-wider text-primary"
                >Top Artist</span
              >
            </div>
            <h3 class="text-headline-md text-on-surface">
              {{ topArtistName }}
            </h3>
            <p class="mt-1 text-body-sm text-on-surface-variant">
              {{ topArtistCount }} track{{ topArtistCount === 1 ? '' : 's' }} in
              your top
            </p>
          </div>
        </div>

        <!-- Diversity (repurposed Vibe Profile card with real data) -->
        <div class="layer-1 relative h-64 overflow-hidden rounded-xl p-6">
          <div
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
          ></div>
          <div class="relative z-10 mb-4 flex items-center justify-between">
            <span
              class="text-label-caps uppercase tracking-wider text-on-surface-variant"
              >Diversity</span
            >
            <span class="material-symbols-outlined text-on-surface-variant"
              >graphic_eq</span
            >
          </div>
          <div class="relative z-10 flex flex-grow items-center justify-center">
            <h3
              class="text-center text-display-lg-mobile leading-tight text-on-surface"
            >
              {{ uniqueArtistsCount }}<br /><span
                class="text-body-lg font-normal text-on-surface-variant"
                >unique artists</span
              >
            </h3>
          </div>
          <div class="relative z-10 mt-auto">
            <div
              class="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high"
            >
              <div
                class="h-full rounded-full bg-primary-container"
                :style="{ width: `${diversityPct}%` }"
              ></div>
            </div>
            <div
              class="mt-2 flex justify-between text-body-sm text-on-surface-variant"
            >
              <span>Variety score</span>
              <span>{{ diversityPct }}%</span>
            </div>
          </div>
        </div>

        <!-- Featured track (repurposed Active Session, glass) -->
        <div
          v-if="featuredTrack"
          class="glass-panel relative h-64 overflow-hidden rounded-xl border-primary-container/30 p-6"
        >
          <div class="z-10 mb-6 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div
                class="h-2 w-2 rounded-full bg-primary"
                :class="{ 'animate-pulse': isFeaturedPlaying }"
              ></div>
              <span
                class="text-label-caps uppercase tracking-wider text-primary"
                >Featured</span
              >
            </div>
            <button
              v-if="featuredTrack.preview"
              type="button"
              class="text-on-surface-variant transition-colors hover:text-on-surface"
              :aria-label="isFeaturedPlaying ? 'Pause preview' : 'Play preview'"
              @click="player.toggle(featuredTrack)"
            >
              <span class="material-symbols-outlined fill">{{
                isFeaturedPlaying ? 'pause_circle' : 'play_circle'
              }}</span>
            </button>
          </div>
          <NuxtLink
            :to="`/track/${featuredTrack.id}`"
            class="z-10 flex items-center gap-4"
          >
            <img
              :src="featuredTrack.cover"
              :alt="`${featuredTrack.name} artwork`"
              class="h-20 w-20 rounded-lg object-cover shadow-lg"
            />
            <div>
              <h4 class="text-lg leading-tight text-on-surface">
                {{ featuredTrack.name }}
              </h4>
              <p class="mt-1 text-body-sm text-on-surface-variant">
                {{ featuredArtists }}
              </p>
            </div>
          </NuxtLink>
          <!-- Decorative visualizer -->
          <div
            class="z-10 mt-auto flex h-12 items-end justify-center gap-1 opacity-50"
          >
            <span
              v-for="(h, i) in barHeights"
              :key="i"
              class="w-1.5 rounded-t-sm bg-primary"
              :style="{
                height: `${h}%`,
                animation: isFeaturedPlaying
                  ? `bounce ${0.8 + (i % 4) * 0.2}s infinite ${i * 80}ms`
                  : 'none',
              }"
            ></span>
          </div>
        </div>
      </template>

      <!-- Empty -->
      <div
        v-else
        class="col-span-full flex flex-col items-center justify-center rounded-xl py-16 text-center layer-1"
      >
        <span
          class="material-symbols-outlined mb-4 text-5xl text-on-surface-variant"
          >music_off</span
        >
        <h3 class="mb-2 text-headline-md text-on-surface">No tracks found</h3>
        <p class="max-w-md text-body-sm text-on-surface-variant">
          Listen to more music on Spotify or try a different time period.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSporky } from '~/stores/sporky';
import { useAudioPlayer } from '~/composables/useAudioPlayer';

const store = useSporky();
const {
  errorMessage,
  timeRange,
  isLoading,
  hasError,
  currentTracks,
  uniqueArtistsCount,
  topArtistName,
  topArtistCount,
  userProfile,
} = storeToRefs(store);

const player = useAudioPlayer();

const hasTracks = computed(() => currentTracks.value.length > 0);
const featuredTrack = computed(() => currentTracks.value[0]);

// Cover art of a track actually by the top artist (matches the displayed name).
const topArtistCover = computed(() => {
  const match = currentTracks.value.find((t) =>
    t.artists.some((a) => a.name === topArtistName.value),
  );
  return match?.cover ?? featuredTrack.value?.cover ?? '';
});
const featuredArtists = computed(() =>
  featuredTrack.value?.artists.map((a) => a.name).join(', '),
);
const isFeaturedPlaying = computed(
  () =>
    !!featuredTrack.value &&
    player.isCurrent(featuredTrack.value.id) &&
    player.isPlaying.value,
);

const diversityPct = computed(() =>
  Math.round(
    (uniqueArtistsCount.value / Math.max(currentTracks.value.length, 1)) * 100,
  ),
);

const barHeights = [100, 66, 25, 80, 50, 100, 33, 75];

const greeting = computed(() => {
  const h = new Date().getHours();
  const part = h < 12 ? 'Morning' : h < 18 ? 'Afternoon' : 'Evening';
  const name = userProfile.value?.display_name?.split(' ')[0];
  return name ? `Good ${part}, ${name}` : `Good ${part}`;
});

const handleRetry = () => store.getTopTracks();
const handleTimeRangeChange = (value: typeof timeRange.value) =>
  store.setTimeRange(value);

onMounted(() => {
  store.getUserProfile();
  store.getTopTracks();
});
</script>
