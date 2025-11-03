<script setup>
import { defineAsyncComponent } from 'vue';

const Calendar = defineAsyncComponent(() =>
  import('./components/Calendar/index.vue')
);
</script>

<template>
  <div class="flex flex-col items-center">
    <Calendar />
  </div>
</template>

<style scoped></style>
