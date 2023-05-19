<script setup>
import Navigation from '../components/Navigation.vue';
import Map from '../components/Map.vue';



let name = localStorage.getItem('name').split(" ")[0];
</script>

<template>
  <Navigation v-bind:active="'home'" style="z-index: 1000;"></Navigation>
  <div class="card">
    <h1>Hi, {{name}} 👋</h1>
    <Map></Map>
  </div>
</template>

<style scoped>
.card {
  padding-left: 0!important;
  padding-right: 0!important;
}
</style>
