<script setup>
  import { onMounted, ref } from "vue";
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { MapboxMap, MapboxGeolocateControl  } from '@studiometa/vue-mapbox-gl';


  onMounted(() => {
    setTimeout(() => {
      document.querySelector(".mapboxgl-ctrl-geolocate").click();
    }, 1000);
  });
  
</script>

<template>
  <MapboxMap
  style="height: 60vh"
  access-token="pk.eyJ1IjoiYnJhbWNvbGxlbWFuIiwiYSI6ImNsaGc1ZWFvcTB6MXkzcW80bDFza3pvNGoifQ.367IFe_vrfB9Efzy72dddg"
  map-style="mapbox://styles/mapbox/streets-v11"
  :center="[0, 0]"
  :zoom="16"
  @mb-created="(mapInstance) => map = mapInstance"
  >
    <MapboxGeolocateControl 
    :trackUserLocation="true"
    :position="'bottom-right'"
    />
  </MapboxMap>
</template>

<style>
.mapboxgl-ctrl-bottom-left, .mapboxgl-ctrl-attrib {
    display: none !important;
}
.mapboxgl-ctrl-geolocate {
  margin: .5rem;
}
.mapboxgl-ctrl-icon {
  background-size: 2.5rem;
}
.mapboxgl-ctrl {
  margin: 2rem 1rem!important;
}
</style>