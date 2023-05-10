<script setup>
import { onMounted, ref } from "vue";
import moment from "moment";

const emits = defineEmits(["close"]);

const props = defineProps(["id"]);
const ride = ref({ destination: "", residents: [], timeStamp: "" });
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
        ride.value.destination =
          ride.value.destination.split(",")[0] +
          ", " +
          ride.value.destination.split(",")[1].slice(5);
        ride.value.timeStamp = moment(ride.value.timeStamp).format("DD MMM YYYY - HH:mm");
      } else {
        console.error("Something went wrong!");
      }
    });
});
</script>

<template>
  <div class="darken" @click="$emit('close')"></div>
  <div class="detail">
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
  opacity: .5;
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
  padding: 1rem 2rem ;
}
</style>
