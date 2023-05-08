<template>
    <div style="height:60vh; width:100vw;">
      <l-map ref="map" v-model:zoom="zoom" :center="center" @ready="onReady" :use-global-leaflet="false">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
      </l-map>
    </div>
  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

  export default {
    components: {
      LMap,
      LTileLayer,
    },
    data() {
      return {
        zoom: 16,
        center: [51,4],
        longitude: null,
        latitude: null,
      };
    },
    mounted() {
        const successCallback = (position) => {
          this.center = [position.coords.latitude,position.coords.longitude];
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
        };

        const errorCallback = (error) => {
          console.log(error);
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    },
    methods: {
        onReady (mapObject) {        
            mapObject.options.center[0] = this.latitude;
            mapObject.options.center[1] = this.longitude;
            mapObject.panTo([this.latitude, this.longitude]);

            // mapObject.locate();
        },
        onLocationFound(location){
        console.log(location)
        }
    },
  };
  </script>

<style>
.leaflet-control-attribution, .leaflet-control-zoom {
    display: none;
}
</style>
    