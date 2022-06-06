<template>
  <header>
    <nav class="flex items-center justify-between flex-wrap bg-blue-700 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Spork</span>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <router-link
            class="
              block
              mt-4
              lg:inline-block lg:mt-0
              text-teal-200
              hover:text-white
              mr-4
            "
            to="/"
            >Home</router-link
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TheNavbar",
});
</script>
