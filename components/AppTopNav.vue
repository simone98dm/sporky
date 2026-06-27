<template>
  <header
    class="fixed right-0 top-0 z-30 flex h-16 w-full items-center justify-between bg-surface/60 px-container-padding backdrop-blur-3xl md:w-[calc(100%-280px)]"
  >
    <!-- Left: hamburger (mobile) + nav links (desktop) -->
    <div class="flex items-center gap-6">
      <button
        type="button"
        class="text-on-surface-variant transition-colors hover:text-on-surface md:hidden"
        aria-label="Open menu"
        @click="navOpen = true"
      >
        <span class="material-symbols-outlined">menu</span>
      </button>

      <div class="hidden items-center gap-6 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          :class="[
            'pb-1 transition-opacity active:scale-[0.98]',
            route.path === link.to
              ? 'border-b-2 border-primary font-medium text-primary'
              : 'text-on-surface-variant hover:text-on-surface',
          ]"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>

    <!-- Right: avatar -->
    <div class="ml-auto flex items-center gap-4">
      <div
        class="relative h-8 w-8 overflow-hidden rounded-full border border-surface-variant"
      >
        <img
          v-if="avatar"
          :src="avatar"
          alt="User avatar"
          class="h-full w-full object-cover"
        />
        <div
          v-else
          class="flex h-full w-full items-center justify-center bg-surface-variant text-on-surface-variant"
        >
          <span class="material-symbols-outlined text-base">person</span>
        </div>
        <span
          class="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-surface bg-primary"
        ></span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useSporky } from '~/stores/sporky';

const store = useSporky();
const { userProfile } = storeToRefs(store);
const route = useRoute();
const navOpen = useState<boolean>('nav-open', () => false);

const avatar = computed(() => userProfile.value?.images?.[0]?.url ?? null);

const links = [
  { label: 'Dashboard', to: '/' },
  { label: 'Top Charts', to: '/tracks' },
];
</script>
