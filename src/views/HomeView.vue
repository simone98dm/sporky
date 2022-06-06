<template>
  <main class="container">
    <Song
      v-for="(song, i) in songs"
      :name="song.name"
      :artists="song.artists"
      :url="song.url"
      :cover="song.cover"
      :preview="song.preview"
      :key="i"
    ></Song>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Song from "@/components/Song.vue";
import { PropType } from "@vue/runtime-dom";
import { mapActions } from "pinia";
import { mapTrackToSong } from "@/models/utils";

export default Vue.extend({
  name: "HomeView",
  data: () => ({
    songs: [],
  }),
  components: { Song },
  mounted() {
    this.getSongs();
  },
  methods: {
    getSongs() {
      fetch("./server/data.json")
        .then((response) => response.json())
        .then((data: { items: any[] }) => {
          data.items.map((track) => {
            this.songs.push(mapTrackToSong(track));
          });
        });
    },
  },
});
</script>
