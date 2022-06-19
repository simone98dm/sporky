<template>
  <a
    class="
      bg-gray-600
      text-white
      rounded
      hover:bg-gray-500
      cursor-pointer
      text-sm
      px-5
      py-2
      mr-2
      md:mr-4 md:px-10 md:py-4 md:text-md
    "
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
