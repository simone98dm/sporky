<template>
  <footer
    class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-6 text-body-sm text-on-surface-variant"
  >
    <span>&copy; {{ year }} Sporky</span>
    <nav aria-label="Legal" class="flex gap-6">
      <NuxtLink
        to="/privacy"
        class="underline-offset-4 transition-colors hover:text-on-surface hover:underline focus-visible:text-on-surface focus-visible:underline"
        >Privacy Policy</NuxtLink
      >
      <NuxtLink
        to="/cookies"
        class="underline-offset-4 transition-colors hover:text-on-surface hover:underline focus-visible:text-on-surface focus-visible:underline"
        >Cookie Policy</NuxtLink
      >
    </nav>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>
