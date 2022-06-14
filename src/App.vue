<template>
  <div id="app">
    <TheNavbar />
    <div class="w-full bg-gray-900 p-2">
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
