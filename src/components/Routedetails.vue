<script setup>
import { onMounted, ref, defineAsyncComponent, computed } from "vue";
const Map = defineAsyncComponent(() => import("./Map.vue"));
// import Map from "./Map.vue";
import moment from "moment";

let componentIndex = 0;
const emit = defineEmits(["accept"]);
let isLoading = true;

const props = defineProps(["id", "accepted"]);
const ride = ref({ destination: [], residents: [], timeStamp: "" });
let destination = ref();
let distance = ref("");

onMounted(() => {
  fetch("https://otto-backend.onrender.com/api/ride/getbyid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        // console.log(ride.value.destination[0]);
        isLoading = false;
      } else {
        console.error("Something went wrong!");
      }
    });
});
function onDistance(d) {
  distance.value = d;
}
</script>

<template>
  <div class="darken" @click="$emit('close')"></div>
  <div class="detail">
    <div class="background">
      <div class="textcontainer">
        <div>
          <div class="flexcontent">
            <img src="../assets/icons/ping.svg" alt="ping" />
            <span>{{ ride.originAddress }}</span>
          </div>
          <div class="flexcontent">
            <img src="../assets/icons/flag.svg" alt="vlag" />
            <span>{{ ride.destinationAddress }}</span>
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
              <span>{{ distance }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mapcontainer">
        <Map
          v-if="!isLoading"
          :destination="ride.destination"
          :o="ride.origin"
          :key="componentIndex"
          @distance="onDistance"
        ></Map>
      </div>
      <div>
        <div class="accept" v-if="!props.accepted">
          <div>
            <img src="../assets/icons/check.svg" alt="" @click="this.$emit('accept')">
          </div>
          <div>
            <img src="../assets/icons/cross.svg" alt="" @click="this.$emit('close')">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accept div {
  width: 50%;
  text-align: center;
}
.accept div:first-child {
  border-right: 1px solid #e5e5e5;
}
.accept img {
  height: 1.5rem;
}
.accept {
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  padding: 1rem 0;
}
.mapcontainer {
  width: 100%;
  height: 25vh;
  border-radius: 0 0 1rem 1rem;
  overflow: hidden;
}
.background {
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.06);
  border-radius: 1rem;
}
.textcontainer {
  padding: 1rem 2rem;
}
.darken {
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
.detail {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 80%;
  z-index: 1001;
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


</style>
