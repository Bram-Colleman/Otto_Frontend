<script setup>
/* eslint-disable no-undef */
import { computed, onMounted, ref } from "vue";
import { useGeolocation } from "../scripts/useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_MAPS_API_KEY = "AIzaSyBKhixrksRyCcnWxY2koJMH2GfDx6ywZgA";

const { coords } = useGeolocation();
const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
}));
const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
const mapDiv = ref(null);
const currpos = ref(null);

onMounted(async () => {
  await loader.load();
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  let map = new google.maps.Map(mapDiv.value, {
    center: currPos.value,
    zoom: 16,
    streetViewControl: false,
    zoomControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
  });
  let marker = new google.maps.Marker({
    position: currPos.value,
    map: map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 7,
      fillOpacity: 1,
      strokeWeight: 2,
      fillColor: "#3289F3",
      strokeColor: "#ffffff",
    },
  });
   getDirections(map, directionsRenderer, directionsService);
});

const getDirections = (map, directionsRenderer, directionsService) => {
  directionsRenderer.setMap(map);
  const request = {
    origin: currPos.value,
    destination: { lat: 50.5, lng: 4 },
    optimizeWaypoints: true, //laat google snelste weg berekenen
    travelMode: "DRIVING",
  };

  directionsService.route(request, (result, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(result);
    }
  });
};
</script>

<template>
  <div ref="mapDiv" style="width: 100vw; height: 66vh"></div>
</template>

<style scoped></style>
