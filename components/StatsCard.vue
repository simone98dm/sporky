<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
    <div class="flex items-center gap-4 mb-4">
      <div :class="[
        'w-12 h-12 rounded-xl flex items-center justify-center',
        `bg-gradient-to-r ${gradientClass}`
    ]">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath"/>
        </svg>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
        <p class="text-gray-400 text-sm">{{ subtitle }}</p>
      </div>
    </div>
    
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-2xl font-bold text-white">{{ value }}</span>
        <span v-if="change" :class="[
            'text-sm font-medium px-2 py-1 rounded-lg',
            changeType === 'positive' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
        ]">
          {{ change }}
        </span>
      </div>
      
      <div v-if="description" class="text-gray-300 text-sm">
        {{ description }}
      </div>
      
      <!-- Progress bar if needed -->
      <div v-if="progress !== undefined" class="mt-4">
        <div class="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>Progress</span>
          <span>{{ Math.round(progress) }}%</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-2">
          <div 
            :class="[
                'h-2 rounded-full transition-all duration-500',
                `bg-gradient-to-r ${gradientClass}`
            ]"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * StatsCard - Statistics display card with icon, progress bar, and gradient styling
 * @example <StatsCard title="Total Tracks" :value="50" icon="music" color="green" />
 */
import { computed } from 'vue';

// Props Interface - Named [ComponentName]Props
interface StatsCardProps {
    title: string;
    subtitle?: string;
    value: string | number;
    description?: string;
    change?: string;
    changeType?: 'positive' | 'negative';
    progress?: number;
    icon?: 'music' | 'trending' | 'time' | 'heart';
    color?: 'green' | 'blue' | 'purple' | 'pink' | 'orange';
}

// Props Destructuring with defaults
const {
    title,
    subtitle,
    value,
    description,
    change,
    changeType,
    progress,
    icon = 'music',
    color = 'green'
} = defineProps<StatsCardProps>();

// Computed properties
const gradientClass = computed(() => {
    const gradients = {
        green: 'from-green-400 to-emerald-500',
        blue: 'from-blue-400 to-cyan-500',
        purple: 'from-purple-400 to-violet-500',
        pink: 'from-pink-400 to-rose-500',
        orange: 'from-orange-400 to-amber-500',
    };
    return gradients[color];
});

const iconPath = computed(() => {
    const paths = {
        music: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
        trending: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
        time: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        heart: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
    };
    return paths[icon];
});
</script>
