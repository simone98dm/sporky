<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-6">
    <div class="max-w-md w-full">
      <!-- Main Card -->
      <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
        <!-- Header -->
        <div class="text-center mb-8">
          <!-- Logo -->
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl mb-6">
            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          
          <h1 class="text-3xl font-bold text-white mb-3">
            Welcome to <span class="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Sporky</span>
          </h1>
          <p class="text-gray-300 text-lg">
            Discover your musical journey through your top Spotify tracks
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <p class="text-red-300 text-sm">{{ errorMessage }}</p>
          </div>
        </div>

        <!-- Features List -->
        <div class="space-y-4 mb-8">
          <div class="flex items-center gap-3 text-gray-300">
            <div class="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <span>View your top tracks from different periods</span>
          </div>
          <div class="flex items-center gap-3 text-gray-300">
            <div class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <span>Beautiful visualizations of your music taste</span>
          </div>
          <div class="flex items-center gap-3 text-gray-300">
            <div class="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <span>Secure and private - we don't store your data</span>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="$route.query.error" class="mb-6">
          <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
            <div class="flex items-center justify-center w-10 h-10 bg-red-500/20 rounded-full mx-auto mb-3">
              <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L3.732 16.5C2.962 17.333 3.924 19 5.464 19z"/>
              </svg>
            </div>
            <p class="text-red-400 font-medium">Authentication Error</p>
            <p class="text-red-300 text-sm mt-1">There was a problem connecting to Spotify. Please try again.</p>
          </div>
        </div>

        <!-- Login Button -->
        <button
          class="group relative w-full p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/25"
          @click="handleLogin"
        >
          <span class="relative z-10 flex items-center justify-center gap-3">
            <!-- Spotify Logo -->
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Continue with Spotify
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <!-- Privacy Note -->
        <p class="text-xs text-gray-400 text-center mt-6 leading-relaxed">
          By continuing, you agree to connect your Spotify account. We only access your top tracks data and don't store any personal information.
        </p>
      </div>        <!-- Additional Info -->
        <div class="mt-8 text-center">
          <p class="text-gray-400 text-sm">
            Don't have Spotify? 
            <a href="https://spotify.com" target="_blank" class="text-green-400 hover:text-green-300 transition-colors">
              Sign up for free
            </a>
          </p>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSporky } from "~/stores/sporky";

const client = useSporky();
const route = useRoute();

const handleLogin = async () => {
  try {
    await client.login();
  } catch (error) {
    console.error("Login failed:", error);
  }
};

// Check for error in URL params
const errorParam = computed(() => route.query.error as string);
const errorMessage = computed(() => {
  if (!errorParam.value) return null;

  switch (errorParam.value) {
    case 'access_denied':
      return 'Access was denied. Please try again.';
    case 'no_code':
      return 'Authorization failed. Please try again.';
    case 'auth_failed':
      return 'Authentication failed. Please check your credentials.';
    case 'true':
      return 'An error occurred during login. Please try again.';
    default:
      return `Error: ${errorParam.value}`;
  }
});
</script>
