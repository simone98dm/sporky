<template>
  <div class="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-6 mb-6">
    <div class="flex items-start gap-4">
      <!-- Icon -->
      <div class="flex-shrink-0">
        <div class="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
          <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L3.732 16.5C2.962 17.333 3.924 19 5.464 19z"/>
          </svg>
        </div>
      </div>
      
      <!-- Content -->
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-red-400 mb-2">
          {{ title || 'Something went wrong' }}
        </h3>
        <p class="text-red-300 mb-4 leading-relaxed">
          {{ message }}
        </p>
        
        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            v-if="showRetry"
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/25"
            @click="$emit('retry')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Try Again
          </button>
          
          <button
            v-if="dismissible"
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-gray-300 rounded-xl font-medium transition-colors duration-300 focus:outline-none"
            @click="$emit('dismiss')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ErrorMessage - Error display component with retry and dismiss actions
 * @example <ErrorMessage message="Failed to load" :show-retry="true" @retry="handleRetry" />
 */

// Props Interface - Named [ComponentName]Props
interface ErrorMessageProps {
    message: string;
    title?: string;
    showRetry?: boolean;
    dismissible?: boolean;
}

// Props Destructuring with defaults
const {
    message,
    title,
    showRetry = false,
    dismissible = false
} = defineProps<ErrorMessageProps>();

// Emits Interface - Named [ComponentName]Events
interface ErrorMessageEvents {
    retry: [];
    dismiss: [];
}

defineEmits<ErrorMessageEvents>();
</script>
