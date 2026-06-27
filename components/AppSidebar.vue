<template>
  <!-- Desktop sidebar -->
  <aside
    class="fixed left-0 top-0 z-40 hidden h-full w-[280px] flex-col border-r border-surface-container-low bg-surface px-6 py-8 md:flex"
  >
    <AppSidebarContent />
  </aside>

  <!-- Mobile drawer -->
  <Transition name="fade">
    <div
      v-if="navOpen"
      class="fixed inset-0 z-50 bg-black/60 md:hidden"
      @click="navOpen = false"
    ></div>
  </Transition>
  <Transition name="slide">
    <aside
      v-if="navOpen"
      class="fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r border-surface-container-low bg-surface px-6 py-8 md:hidden"
    >
      <button
        type="button"
        class="absolute right-4 top-4 text-on-surface-variant hover:text-on-surface"
        aria-label="Close menu"
        @click="navOpen = false"
      >
        <span class="material-symbols-outlined">close</span>
      </button>
      <AppSidebarContent @navigate="navOpen = false" />
    </aside>
  </Transition>
</template>

<script setup lang="ts">
import { watch } from 'vue';

const navOpen = useState<boolean>('nav-open', () => false);
const route = useRoute();

// Close the drawer whenever the route changes.
watch(
  () => route.fullPath,
  () => {
    navOpen.value = false;
  },
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
