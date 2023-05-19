<script setup>
/* eslint-disable no-undef */
import { computed, mergeProps, onMounted, onUnmounted, ref } from "vue";
import { useGeolocation } from "../scripts/useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
const GOOGLE_MAPS_API_KEY = "AIzaSyBKhixrksRyCcnWxY2koJMH2GfDx6ywZgA";

const props = defineProps(["destination"]);


const { coords } = useGeolocation();
const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
}));
const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
const mapDiv = ref(null);
let map;

onMounted(async () => {
  await loader.load();
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();


  map = new google.maps.Map(mapDiv.value, {
    center: currPos.value,
    zoom: 16,
    streetViewControl: false,
    zoomControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    region: currPos.value
  });
  map.panTo(currPos.value);
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

  console.log(props.destination); //TODO
  if(props.destination) {
    const destination = computed(() => ({
      lat: props.destination[0],
      lng: props.destination[1]
    }));
    console.log(destination.value);

     getDirections(map, directionsRenderer, directionsService, destination.value);
  }
});


const getDirections = (map, directionsRenderer, directionsService, dest) => {
  directionsRenderer.setMap(map);
  let destlat = dest.lat;
  let destlng = dest.lng;
  
  const request = {
    origin: currPos.value,
    destination: dest,
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
  <div ref="mapDiv" style="width: 100%; height: 50vh;"></div>
</template>

<style scoped>
.gm-style-cc {
  display: none !important;
}

.gm-style a[href^="https://maps.google.com/maps"] {
  display: none !important;
}
</style>
