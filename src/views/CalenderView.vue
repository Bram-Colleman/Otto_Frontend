<script setup>
import Navigation from "../components/Navigation.vue";
import DatePicker from "../components/Calendar.vue";
</script>

<template>
  <Navigation v-bind:active="'calender'"></Navigation>
  <div class="card">
    <h1>Beschikbaarheden</h1>
    <DatePicker />
  </div>
</template>

<style scoped></style>
