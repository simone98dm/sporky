<template>
  <div class="flex h-full flex-col gap-y-6">
    <!-- Brand -->
    <div class="mb-4 flex items-center gap-4">
      <div
        class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container/20"
      >
        <span class="material-symbols-outlined fill text-primary"
          >graphic_eq</span
        >
      </div>
      <div>
        <h1 class="text-display-lg-mobile leading-none text-primary">Sporky</h1>
        <p class="mt-1 text-body-sm text-on-surface-variant">
          Premium Analytics
        </p>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-grow flex-col gap-2">
      <NuxtLink
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        :class="[
          'flex items-center gap-4 rounded-lg px-4 py-3 transition-colors duration-200 active:scale-95',
          isActive(item)
            ? 'border-r-4 border-primary bg-surface-variant font-bold text-primary'
            : 'font-medium text-on-surface-variant hover:bg-surface-variant',
        ]"
        @click="emit('navigate')"
      >
        <span
          class="material-symbols-outlined"
          :class="{ fill: isActive(item) }"
          >{{ item.icon }}</span
        >
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <!-- CTA -->
    <NuxtLink
      to="/tracks"
      class="mb-2 w-full rounded-full bg-primary-container py-3 text-center font-bold text-on-primary-container transition-colors hover:bg-primary-fixed-dim hover:text-on-primary active:scale-95"
      @click="emit('navigate')"
    >
      View Insights
    </NuxtLink>

    <!-- Footer -->
    <div
      class="mt-auto flex flex-col gap-2 border-t border-surface-container-low pt-6"
    >
      <button
        type="button"
        class="flex items-center gap-4 rounded-lg px-4 py-2 font-medium text-on-surface-variant transition-colors hover:bg-surface-variant"
        @click="store.logout()"
      >
        <span class="material-symbols-outlined">logout</span>
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useSporky } from '~/stores/sporky';

interface NavItem {
  label: string;
  icon: string;
  to: string;
  match?: string; // route prefix for active state
}

const emit = defineEmits<{ navigate: [] }>();

const store = useSporky();
const { currentTracks } = storeToRefs(store);
const route = useRoute();

// Visualizer opens the first available track's detail page.
const visualizerTo = computed(() =>
  currentTracks.value[0] ? `/track/${currentTracks.value[0].id}` : '/tracks',
);

const navItems = computed<NavItem[]>(() => [
  { label: 'Home', icon: 'home', to: '/' },
  { label: 'Top Charts', icon: 'leaderboard', to: '/tracks' },
  {
    label: 'Visualizer',
    icon: 'equalizer',
    to: visualizerTo.value,
    match: '/track',
  },
]);

const isActive = (item: NavItem) =>
  item.match ? route.path.startsWith(item.match) : route.path === item.to;
</script>
