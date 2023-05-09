<script setup>
import Navigation from '../components/Navigation.vue';
import Mapbox from '../components/leaflet/Map.vue';



let name = localStorage.getItem('name').split(" ")[0];
</script>

<template>
  <Navigation v-bind:active="'home'" style="z-index: 1000;"></Navigation>
  <div class="card">
    <h1>Hi, {{name}} 👋</h1>
    <Mapbox class="map"></Mapbox>
  </div>
</template>

<style scoped>
.card {
  padding-left: 0!important;
  padding-right: 0!important;
}
.map {
  border-radius: 10px;
}
</style>
