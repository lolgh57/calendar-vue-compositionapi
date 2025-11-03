<template>
  <div class="flex flex-row justify-between gap-4 items-center">
    <button
      @click.prevent="handleSwitchMonth('prev')"
      class="border border-gray-600 rounded-sm group cursor-pointer"
    >
      <div
        class="p-2 group-hover:bg-gray-500 transition duration-150 ease-in-out"
      >
        <ArrowLeft class="size-4" />
        <span class="sr-only">Previous month</span>
      </div>
    </button>
    <span>{{ currentDate }}</span>
    <button
      @click.prevent="handleSwitchMonth('next')"
      class="border border-gray-600 rounded-sm group cursor-pointer"
    >
      <div
        class="p-2 group-hover:bg-gray-500 transition duration-150 ease-in-out"
      >
        <ArrowRight class="size-4" />
        <span class="sr-only">Next month</span>
      </div>
    </button>
  </div>
</template>

<script setup>
import { ArrowRight, ArrowLeft } from 'lucide-vue-next';

const props = defineProps({
  currentDate: Date,
});

const emit = defineEmits(['switchMonth']);

const handleSwitchMonth = (action) => {
  emit('switchMonth', action);
};
</script>

<style scoped></style>
