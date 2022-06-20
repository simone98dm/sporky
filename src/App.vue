<template>
  <div id="app">
    <TheNavbar />
    <div class="w-full bg-gray-900 p-2">
      <router-view />
      <div class="text-center text-white">
        <span>Made with ❤️ by simone98dm </span><br />
        <span>
          This project is on
          <a href="https://github.com/simone98dm/sporky" class="text-blue-300">
            Github
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheNavbar from "./components/TheNavbar.vue";

export default Vue.extend({
  name: "App",
  components: { TheNavbar },
});
</script>
