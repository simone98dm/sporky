<template>
  <div class="flex flex-col items-center justify-center p-12">
    <!-- Animated Spinner -->
    <div class="relative">
      <!-- Outer Ring -->
      <div class="w-16 h-16 border-4 border-gray-700 rounded-full animate-spin border-t-green-400"></div>
      <!-- Inner Ring -->
      <div class="absolute top-2 left-2 w-12 h-12 border-4 border-gray-800 rounded-full animate-spin border-t-blue-400" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
      <!-- Center Dot -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></div>
    </div>
    
    <!-- Message -->
    <div v-if="message" class="mt-6 text-center">
      <p class="text-white font-medium text-lg">{{ message }}</p>
      <div class="flex items-center justify-center mt-2 space-x-1">
        <div class="w-2 h-2 bg-green-400 rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
        <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
        <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
    message?: string;
}

defineProps<Props>();
</script>
