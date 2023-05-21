<script setup>
import Navigation from '../components/Navigation.vue';
import Map from '../components/Map.vue';



let name = localStorage.getItem('name').split(" ")[0];
</script>

<template>
  <Navigation v-bind:active="'home'" style="z-index: 1000;"></Navigation>
  <h1>Hi, {{name}} 👋</h1>
  <div class="card">
    <Map></Map> 
  </div>
</template>

<style scoped>
h1 {
  color: white;
  position: fixed;
  top: 3.5rem;
  width: 100vw;
}
.card {
  padding-left: 0!important;
  padding-right: 0!important;
}
</style>
