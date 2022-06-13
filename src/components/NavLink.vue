<template>
  <a
    class="
      block
      lg:inline-block
      text-teal-200
      hover:text-white
      bg-blue-600
      font-semibold
      leading-none
      text-white
      py-4
      px-10
      rounded
      hover:bg-blue-500
      focus:ring-2 focus:ring-offset-2 focus:ring-green-600 focus:outline-none
      cursor-pointer
      mr-4
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