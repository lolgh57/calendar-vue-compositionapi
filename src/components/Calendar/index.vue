<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';

defineProps({
  date: String,
});

const CalendarHeader = defineAsyncComponent(() =>
  import('./CalendarHeader.vue')
);
const CalendarGrid = defineAsyncComponent(() => import('./CalendarGrid.vue'));
const CalendarOptions = defineAsyncComponent(() =>
  import('./CalendarOptions.vue')
);

const languages = ref([
  { id: 1, name: 'Русский', code: 'ru' },
  { id: 2, name: 'English', code: 'en' },
  { id: 3, name: 'Deutsch', code: 'de' },
]);

const selectedLanguage = ref(languages.value[0]);
const selectedLangCode = computed(() => selectedLanguage.value.code);

const calendarDays = ref([]);
const selectedDate = ref(new Date());

const currentDate = ref(selectedDate.value);
const currentMonth = ref(selectedDate.value.getMonth());
const currentYear = ref(selectedDate.value.getFullYear());

const formatDate = (date, withDay = false) => {
  const record = {
    month: 'long',
    year: 'numeric',
  };
  if (withDay) record.day = 'numeric';
  return date.toLocaleDateString(selectedLangCode.value, record);
};

const currentDateString = ref(formatDate(currentDate.value));

const switchMonth = (action) => {
  if (action === 'next')
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      currentDate.value.getDate()
    );
  else if (action === 'prev')
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      currentDate.value.getDate()
    );

  currentMonth.value = currentDate.value.getMonth();
  currentYear.value = currentDate.value.getFullYear();
  getMonthDays(currentDate.value.getMonth(), currentDate.value.getFullYear());
  currentDateString.value = formatDate(currentDate.value);
};

const switchLanguage = (lang) => {
  selectedLanguage.value = lang;
  currentDateString.value = formatDate(currentDate.value);
};

const selectDay = (day) => {
  selectedDate.value = new Date(day.date);
  currentDate.value = new Date(day.date);
  if (!day.isCurrentMonth) {
    currentMonth.value = selectedDate.value.getMonth();
    currentYear.value = selectedDate.value.getFullYear();
    currentDateString.value = formatDate(currentDate.value);
  }
  getMonthDays(selectedDate.value.getMonth(), selectedDate.value.getFullYear());
};

const enterDate = (date) => {
  selectedDate.value = new Date(date);
  currentDate.value = new Date(date);
  currentMonth.value = selectedDate.value.getMonth();
  currentYear.value = selectedDate.value.getFullYear();

  currentDateString.value = formatDate(currentDate.value);
  getMonthDays(selectedDate.value.getMonth(), selectedDate.value.getFullYear());
};

const isSelected = (date) => {
  if (!selectedDate.value) return false;
  return (
    date.getDate() === selectedDate.value.getDate() &&
    date.getMonth() === selectedDate.value.getMonth() &&
    date.getFullYear() === selectedDate.value.getFullYear()
  );
};

const getMonthDays = (month, year) => {
  const firstDayMonth = new Date(year, month, 1);
  const lastDayMonth = new Date(year, month + 1, 0);
  const days = [];
  let startDay = (firstDayMonth.getDay() + 6) % 7;

  for (let i = 0; i < startDay; i++) {
    const date = new Date(year, month, -(startDay - i - 1));
    days.push({
      date: date,
      isCurrentMonth: false,
      isSelected: isSelected(date),
    });
  }

  for (let i = firstDayMonth.getDate(); i <= lastDayMonth.getDate(); i++) {
    const date = new Date(year, month, i);
    days.push({
      date: date,
      isCurrentMonth: true,
      isSelected: isSelected(date),
    });
  }

  while (days.length % 7 !== 0) {
    const date = new Date(
      year,
      month + 1,
      days.length - lastDayMonth.getDate() - startDay + 1
    );
    days.push({
      date: date,
      isCurrentMonth: false,
      isSelected: isSelected(date),
    });
  }

  return (calendarDays.value = days);
};

onMounted(() => {
  getMonthDays(currentDate.value.getMonth(), currentDate.value.getFullYear());
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-xl">Calendar Vue 3 + Composition API</h1>
    <CalendarOptions
      :languages="languages"
      :selectedLanguage="selectedLanguage"
      @enterDate="enterDate"
      @switchLanguage="switchLanguage"
    />
    <div class="flex flex-col gap-2 border border-gray-500 rounded-md p-3">
      <CalendarHeader
        :currentDate="currentDateString"
        @switchMonth="switchMonth"
      />
      <CalendarGrid
        :calendarDays="calendarDays"
        :selectedLanguage="selectedLanguage"
        @selectDay="selectDay"
      />
    </div>
    <p class="text-lg">
      Выбранная дата:
      {{ formatDate(selectedDate, true) }}
    </p>
  </div>
</template>

<style scoped></style>
