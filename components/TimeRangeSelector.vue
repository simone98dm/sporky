<template>
  <div class="w-full">
    <label for="time-range" class="block text-sm font-medium text-gray-300 mb-3">
      Time Range
    </label>
    
    <!-- Custom Radio Group -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <button
        v-for="[value, label] in Object.entries(TIME_RANGE_LABELS)"
        :key="value"
        :class="[
            'relative p-4 rounded-xl border-2 transition-all duration-300 text-left',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105',
            modelValue === value
                ? 'border-green-400 bg-green-400/10 text-white'
                : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
        ]"
        :disabled="disabled"
        @click="!disabled && $emit('update:modelValue', value)"
      >
        <!-- Selection Indicator -->
        <div class="absolute top-3 right-3">
          <div :class="[
            'w-4 h-4 rounded-full border-2 transition-all duration-300',
            modelValue === value
                ? 'border-green-400 bg-green-400'
                : 'border-gray-500'
        ]">
            <div v-if="modelValue === value" class="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
          </div>
        </div>
        
        <!-- Content -->
        <div>
          <div class="font-semibold text-sm mb-1">{{ getTimeRangeTitle(value) }}</div>
          <div class="text-xs opacity-75">{{ getTimeRangeDescription(value) }}</div>
        </div>
        
        <!-- Icon -->
        <div class="mt-3">
          <svg :class="[
            'w-5 h-5 transition-colors duration-300',
            modelValue === value ? 'text-green-400' : 'text-gray-500'
        ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getTimeRangeIcon(value)"/>
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TIME_RANGE_LABELS } from "~/utils/const";

interface Props {
    modelValue: string;
    disabled?: boolean;
}

defineProps<Props>();

defineEmits<{
    "update:modelValue": [value: string];
}>();

const getTimeRangeTitle = (value: string) => {
    const titles = {
        short_term: "Recent",
        medium_term: "This Year",
        long_term: "All Time"
    };
    return titles[value as keyof typeof titles] || value;
};

const getTimeRangeDescription = (value: string) => {
    const descriptions = {
        short_term: "Last 4 weeks",
        medium_term: "Last 6 months",
        long_term: "Last few years"
    };
    return descriptions[value as keyof typeof descriptions] || value;
};

const getTimeRangeIcon = (value: string) => {
    const icons = {
        short_term: "M13 10V3L4 14h7v7l9-11h-7z", // Lightning bolt for recent
        medium_term: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", // Calendar for medium
        long_term: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" // Clock for long term
    };
    return icons[value as keyof typeof icons] || icons.short_term;
};
</script>
