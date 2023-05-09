<script setup>
import Navigation from '../components/Navigation.vue';
import Mapbox from '../components/leaflet/Map.vue';

</script>

<template>
  <Navigation v-bind:active="'route'"></Navigation>
  <div class="card">
    <h1>Routes</h1>
    <Mapbox class="map"></Mapbox>

  </div>
</template>

<style scoped>
.card {
  padding-left: 0!important;
  padding-right: 0!important;
}
</style>
