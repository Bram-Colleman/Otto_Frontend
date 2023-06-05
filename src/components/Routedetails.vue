<script setup>
import { onMounted, ref, defineAsyncComponent, computed } from "vue";
const Map = defineAsyncComponent(() => import("./Map.vue"));
// import Map from "./Map.vue";
import moment from "moment";
import { useGeolocation } from "../scripts/useGeolocation";


let componentIndex = 0;
const emits = defineEmits(["close"]);
let isLoading = true;

const props = defineProps(["id"]);
const ride = ref({ destination: [], residents: [], timeStamp: "" });
let destination = ref();
onMounted(() => {
  fetch("https://otto-backend.onrender.com/api/ride/getbyid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: props.id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        ride.value = data.ride[0];
        destination.value = ride.value.destination;
        ride.value.timeStamp = moment(ride.value.timeStamp).format(
          "DD MMM YYYY - HH:mm"
        );
        componentIndex++;
        isLoading = false;
        console.log(ride.value);
      } else {
        console.error("Something went wrong!");
      }
    });
});
</script>

<template>
  <div class="darken" @click="$emit('close')"></div>
  <div class="detail">
    <Map
      v-if="!isLoading"
      :destination="ride.destination"
      :key="componentIndex"
    ></Map>
    <div class="background">
      <div>
        <div class="flexcontent">
          <img src="../assets/icons/ping.svg" alt="ping" />
          <span>Maanstraat 2, 2800 Mechelen</span>
          <!-- <span>{{ ride.origin }}</span> -->
        </div>
        <div class="flexcontent">
          <img src="../assets/icons/flag.svg" alt="vlag" />
          <span>{{ ride.destination }}</span>
        </div>
        <div class="flexcontent">
          <img src="../assets/icons/clock.svg" alt="klok" />
          <span>{{ ride.timeStamp }}</span>
        </div>
        <div class="flex2">
          <div class="flex">
            <img src="../assets/icons/people.svg" alt="people" />
            <span>{{ ride.residents.length }} personen</span>
          </div>
          <div class="flex">
            <img src="../assets/icons/twopings.svg" alt="twopings" />
            <span>2,2 km</span>
            <!-- <span>{{ ride.distance }}</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.darken {
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
}
.detail {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 80%;
}
.flex2 {
  display: flex;
  justify-content: space-between;
  align-items: left;
  margin-top: -1rem;
}

.flex2 img {
  margin-right: 0.5rem;
}
.flexcontent {
  display: flex;
  align-items: left;
  margin: 1rem 0;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}

.flexcontent img {
  margin-right: 0.5rem;
}

.background {
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.06);
  padding: 1rem 2rem;
}
</style>
