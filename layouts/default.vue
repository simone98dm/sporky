<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-20">
      <div
        class="h-full w-full bg-repeat"
        style="
          background-image: radial-gradient(
            circle at 1px 1px,
            rgba(156, 146, 172, 0.2) 1px,
            transparent 0
          );
          background-size: 20px 20px;
        "
      ></div>
    </div>

    <!-- Navigation Header -->
    <nav class="relative z-10 px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">Sporky</h1>
            <p class="text-sm text-gray-300">Your Music Journey</p>
          </div>
        </div>

        <!-- User Info (if authenticated) -->
        <div v-if="isAuthenticated" class="flex items-center space-x-4">
          <div class="hidden md:block text-right">
            <p class="text-sm text-gray-300">Welcome back!</p>
            <button
              @click="logout"
              class="text-xs text-gray-400 hover:text-red-400 transition-colors duration-200 underline cursor-pointer"
            >
              Sign out
            </button>
          </div>
          <div
            class="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="relative z-10">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="relative z-10 mt-20 py-8 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <p class="text-gray-400 text-sm">
          Made with ❤️ by
          <a
            href="https://simone98dm.dev"
            class="text-green-400 hover:text-green-300 transition-colors"
            >simone98dm</a
          >
          using
          <a
            href="https://nuxt.com"
            class="text-green-400 hover:text-green-300 transition-colors"
            >Nuxt</a
          >
          and
          <a
            href="https://developer.spotify.com"
            class="text-green-400 hover:text-green-300 transition-colors"
            >Spotify API</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSporky } from '~/stores/sporky';

const store = useSporky();
const { isAuthenticated } = storeToRefs(store);

const logout = () => {
  store.logout();
};
</script>
