<script setup>
import Navigation from "../components/Navigation.vue";
import DatePicker from "../components/Calendar.vue";
</script>

<template>
  <Navigation v-bind:active="'calender'"></Navigation>
  <h1>Beschikbaarheden</h1>
  <div class="card">
    <div class="scale-in-center" >
      <DatePicker />
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: white;
  position: fixed;
  top: 3.5rem;
  width: 100vw;
}
.scale-in-center {
	animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@keyframes scale-in-center {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
