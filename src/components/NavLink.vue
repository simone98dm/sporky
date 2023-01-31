<template>
  <a
    class="bg-gray-300 dark:bg-slate-700 hover:bg-gray-400 dark:hover:bg-slate-800 rounded cursor-pointer font-bolder px-5 py-2 mr-2 md:mr-4 md:px-10 md:py-4"
    v-on="$listeners"
  >
    {{ label }}
  </a>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NavLink",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
});
</script>
