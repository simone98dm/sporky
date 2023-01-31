<template>
  <div
    class="rounded-lg shadow-lg bg-neutral-600 dark:bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased mb-5"
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
        class="w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0"
      >
        <div class="text-4xl text-white font-mono leading-tight song-name">
          {{ name }}
        </div>
        <div v-if="artists" class="text-normal text-gray-400">
          <span
            class="border-b border-dashed border-gray-500 pb-1"
            v-for="(artist, i) in artists"
            :key="i"
          >
            {{ artist.name }}
          </span>
        </div>
        <div class="mb-0">
          <button
            class="px-4 py-2 rounded-md text-white text-sm cursor-pointer song-url m-3 bg-gray-500"
            @click="togglePreview"
          >
            Play preview
          </button>
          <a
            class="bg-gray-500 px-4 py-2 rounded-md text-white text-sm cursor-pointer song-url m-3"
            :href="url"
            target="_black"
            >Open</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useTopStore } from "@/stores/top";
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "SongComponent",
  props: {
    name: {
      type: String,
      required: true,
    },
    artists: {
      type: [] as PropType<{ name: string }[]>,
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
  data: () => ({
    topStore: useTopStore(),
  }),
  methods: {
    togglePreview() {
      if (this.preview) {
        this.topStore.playPreview({
          url: this.preview,
          name: this.name + " - " + this.artists.map((a) => a.name).join(", "),
        });
      }
    },
  },
});
</script>
