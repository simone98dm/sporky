<template>
  <div
    class="flex w-fit items-center rounded-full border border-white/10 bg-surface-container-low p-1"
  >
    <button
      v-for="option in TIME_RANGE_OPTIONS"
      :key="option.value"
      type="button"
      :disabled="disabled"
      :class="[
        'rounded-full px-4 py-1.5 text-body-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'label' ? 'px-6' : '',
        modelValue === option.value
          ? 'tab-active'
          : 'text-on-surface-variant hover:text-on-surface',
      ]"
      @click="emit('update:modelValue', option.value)"
    >
      {{ variant === 'short' ? option.short : option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { TIME_RANGE_OPTIONS } from '~/utils/const';

type TimeRange = (typeof TIME_RANGE_OPTIONS)[number]['value'];

interface TimePeriodSelectorProps {
  modelValue: TimeRange;
  variant?: 'short' | 'label';
  disabled?: boolean;
}

const { variant = 'label', disabled = false } =
  defineProps<TimePeriodSelectorProps>();

interface TimePeriodSelectorEvents {
  'update:modelValue': [value: TimeRange];
}

const emit = defineEmits<TimePeriodSelectorEvents>();
</script>
