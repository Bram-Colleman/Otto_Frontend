<script setup>
import { ref } from "vue";
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";

const attrs = ref([
  {
    key: "today",
    highlight: "gray",
    dates: new Date(),
  },
]);

const range = ref({
  start: new Date(),
  end: new Date(),
});
</script>

<template>
  <DatePicker
    class="kalender"
    v-model.range="range"
    mode="dateTime"
    :attributes="attrs"
    transparent
    borderless
  />
</template>

<style>
.kalender button {
  background-color: white;
}

.kalender {
  width: 100%;
}

.vc-weekday-7,
.vc-weekday-1 {
  color: #3289f3;
}

.vc-light {
  --vc-hover-bg: #3289f3;
  --vc-focus-ring: #3289f3;
}

.vc-blue {
  --vc-accent-50: #3289f3;
  --vc-accent-100: #3289f3;
  --vc-accent-200: #3289f3;
  --vc-accent-300: #3289f3;
  --vc-accent-400: #3289f3;
  --vc-accent-500: #3289f3;
  --vc-accent-600: #3289f3;
  --vc-accent-700: #3289f3;
  --vc-accent-800: #3289f3;
  --vc-accent-900: #3289f3;
}

.vc-gray {
  --vc-accent-50: #accffb;
  --vc-accent-100: #accffb;
  --vc-accent-200: #accffb;
  --vc-accent-300: #accffb;
  --vc-accent-400: #accffb;
  --vc-accent-500: #accffb;
  --vc-accent-600: #accffb;
  --vc-accent-700: #accffb;
  --vc-accent-800: #accffb;
  --vc-accent-900: #accffb;
}
</style>
