<template>
  <div v-if="current">
    <div class="float" @click="stopSong">
      <div class="float-content">
        <strong>Stop playing "{{ current.name }}"</strong>
        <progress :max="songLength" :value="songProgress"></progress>
      </div>
    </div>
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
    songLength: 0,
    songProgress: 0,
  }),
  computed: {
    current(): { name: string; url: string } | null {
      this.audio.pause();
      this.audio.currentTime = 0;

      if (this.topStore.currentPlayingSong) {
        this.audio = new Audio(this.topStore.currentPlayingSong.url);
        this.audio.play();
        this.audio.addEventListener("ended", this.stopSong);
        this.audio.addEventListener("timeupdate", this.updateSong);
      }

      return this.topStore.currentPlayingSong;
    },
  },
  beforeDestroy() {
    if (this.audio) {
      this.audio.removeEventListener("ended", this.stopSong);
      this.audio.addEventListener("timeupdate", this.updateSong);
    }
  },
  methods: {
    stopSong() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.topStore.stopPreview();
    },
    updateSong() {
      this.songLength = this.audio.duration;
      this.songProgress = this.audio.currentTime;
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
  cursor: pointer;
}
.float-content {
  display: flex;
  flex-direction: column;
}
progress::-moz-progress-bar {
  width: 100%;
  height: 2px;
  margin-top: 10px;
  background: white;
}
progress::-webkit-progress-value {
  width: 100%;
  height: 2px;
  margin-top: 10px;
  background: white;
}
progress[value]::-webkit-progress-bar {
  background-color: #1db954;
}
progress {
  width: 100%;
  height: 2px;
  margin-top: 10px;
  color: white;
  border-radius: 50%;
}
@media only screen and (min-width: 768px) {
  .float {
    bottom: 20px;
    right: 20px;
    width: 400px;
  }
}
</style>
