<template>
  <div id="app">
    <TheNavbar />
    <div
      class="
        w-full
        bg-white
        dark:bg-gray-900
        flex flex-row flex-wrap
        p-2
      "
    >
      <router-view />
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
