<script setup>
import Navigation from "../components/Navigation.vue";
import DatePicker from "../components/Calendar.vue";
</script>

<template>
  <Navigation v-bind:active="'calender'"></Navigation>
  <h1>Beschikbaarheden</h1>
  <div class="card">
    <DatePicker />
  </div>
</template>

<style scoped>
h1 {
  color: white;
  position: fixed;
  top: 3.5rem;
  width: 100vw;
}
</style>
