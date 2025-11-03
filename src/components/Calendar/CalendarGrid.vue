<template>
  <div class="grid grid-cols-7 gap-2">
    <div v-for="day in weekDays" :key="day">{{ day }}</div>

    <div
      v-for="(day, index) in calendarDays"
      :key="index"
      @click="handleSelectDay(day)"
      class="py-1.5 px-1 rounded-sm shrink-0 cursor-pointer hover:bg-gray-600 transition duration-150 ease-in-out"
      :class="{
        'opacity-50': !day.isCurrentMonth,
        'bg-gray-500': day.isSelected,
      }"
    >
      {{ day.date.getDate() }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  calendarDays: Array,
  selectedLanguage: Object,
});

const selectedLangCode = computed(() => props.selectedLanguage.code);

const weekDays = computed(() => {
  const formatter = new Intl.DateTimeFormat(selectedLangCode.value, {
    weekday: 'short',
  });
  const days = [];

  for (let i = 1; i <= 7; i++) {
    days.push(formatter.format(new Date(0, 0, i)));
  }

  return days;
});

const emit = defineEmits(['selectDay']);

const handleSelectDay = (day) => {
  emit('selectDay', day);
};
</script>

<style scoped></style>
