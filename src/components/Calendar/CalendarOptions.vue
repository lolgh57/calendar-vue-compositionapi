<template>
  <div class="flex flex-col justify-between gap-4 items-center">
    <div
      @click="isSelectLangOpen = !isSelectLangOpen"
      class="relative w-full flex border border-gray-500 rounded-md p-2 cursor-pointer select-none"
    >
      <div class="w-full flex flex-row justify-between items-center">
        <span> Выберите язык: {{ selectedLanguage.name }} </span>
        <ArrowDown
          class="size-4 transition duration-150 ease-in-out"
          :class="{
            'rotate-180': isSelectLangOpen,
          }"
        />
      </div>
      <Transition name="fade">
        <div
          v-if="isSelectLangOpen"
          class="absolute top-10 left-0 w-full p-2 border border-gray-500 rounded-md bg-[#242424] z-10"
        >
          <div
            v-for="lang in languages"
            :key="lang.id"
            @click="switchLanguage(lang)"
            class="rounded-sm py-1.5 px-1 cursor-pointer hover:bg-gray-600 transition duration-150 ease-in-out"
            :class="{
              'bg-gray-500': selectedLanguage.id === lang.id,
            }"
          >
            {{ lang.name }}
          </div>
        </div>
      </Transition>
    </div>
    <input
      type="text"
      v-maska="'####-##-##'"
      v-model="inputDate"
      placeholder='Введите дату в формате "гггг-мм-дд"'
      class="flex w-full border border-gray-500 rounded-md p-2 outline-none"
      :class="{
        'border-red-400': !isValidDate,
      }"
      @maska="onMaska"
      @keyup.enter="onMaska"
    />
  </div>
</template>

<script setup>
import { ArrowDown } from 'lucide-vue-next';
import { ref, Transition } from 'vue';
import { vMaska } from 'maska/vue';

const props = defineProps({
  languages: Array,
  selectedLanguage: Object,
});

const isSelectLangOpen = ref(false);
const inputDate = ref('');
const isValidDate = ref(true);

const emit = defineEmits(['switchLanguage', 'enterDate']);

const switchLanguage = (lang) => {
  emit('switchLanguage', lang);
};

const enterDate = (date) => {
  emit('enterDate', date);
};

// maska incorrect validate
const onMaska = (event) => {
  isValidDate.value =
    event.detail.completed ||
    (event.detail.masked === '' && !event.detail.completed);
  console.log(isValidDate.value);

  if (event.detail.completed) return enterDate(event.detail.masked);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
