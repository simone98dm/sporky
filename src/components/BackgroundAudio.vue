<template>
  <div v-if="current" class="ml-3">
    <button class="float" @click="stopSong">
      Stop playing "{{ current.name }}"
    </button>
  </div>
</template>

<script lang="ts">
import { useTopStore } from "@/stores/top";
import Vue from "vue";
export default Vue.extend({
  name: "BackgroundAudio",
  data: () => ({
    topStore: useTopStore(),
    audio: new Audio(),
  }),
  computed: {
    current(): { name: string; url: string } | null {
      this.audio.pause();
      this.audio.currentTime = 0;

      if (this.topStore.currentPlayingSong) {
        this.audio = new Audio(this.topStore.currentPlayingSong.url);
        this.audio.play();
      }

      return this.topStore.currentPlayingSong;
    },
  },
  methods: {
    stopSong() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.topStore.stopPreview();
    },
  },
});
</script>

<style scoped>
.float {
  position: fixed;
  /* width: 60px; */
  padding: 5px 25px;
  height: 60px;
  bottom: 0px;
  right: 0px;
  width: 100%;
  background-color: #1db954;
  color: #fff;
  border-radius: 15px;
  text-align: center;
  box-shadow: 2px 2px 3px rgb(35, 35, 35);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

@media only screen and (min-width: 768px) {
  .float {
    bottom: 20px;
    right: 20px;
    width: 400px;
  }
}
</style>
