<template>
  <div
    :class="[
      'rounded-lg',
      'shadow-lg',
      'bg-neutral-600',
      'dark:bg-gray-600',
      'w-full',
      'flex flex-row flex-wrap',
      'p-3',
      'antialiased',
      'mb-5',
    ]"
    :style="{
      backgroundImage: 'url(' + cover + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundBlendMode: 'multiply',
    }"
  >
    <div class="md:w-1/3 w-full">
      <img
        class="rounded-lg shadow-lg antialiased"
        :src="cover"
        alt="track_cover"
      />
    </div>
    <div class="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
      <div
        :class="[
          'w-full',
          'text-right text-gray-700',
          'font-semibold',
          'relative',
          'pt-3',
          'md:pt-0',
        ]"
      >
        <div class="text-4xl text-white font-mono leading-tight">
          {{ name }}
        </div>
        <div
          v-if="artists"
          class="text-normal text-gray-300 hover:text-gray-400 cursor-pointer"
        >
          <span
            class="border-b border-dashed border-gray-500 pb-1"
            v-for="(artist, i) in artists"
            :key="i"
            >{{ artist.name }}</span
          >
        </div>
        <div
          v-if="url"
          class="text-sm text-gray-300 hover:text-gray-400 cursor-pointer md:absolute pt-3 md:pt-0 bottom-0 right-0"
        >
          <a :href="url" target="_black">Open</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  name: "SongComponent",
  props: {
    name: {
      type: String,
      required: true,
    },
    artists: {
      type: Array as PropType<{ name: string }[]>,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      required: false,
      default: undefined,
    },
  },
});
</script>
