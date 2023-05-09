<script setup>
import { onMounted, ref } from "vue";


const props = defineProps(['id']);
const ride = ref();
onMounted(() => {
  console.log(props.id);
  fetch("http://localhost:3000/api/ride/getbyid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      "id": props.id,
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        console.log(data);
      } else {
        console.error("Something went wrong!");
      }
    });

});
</script>

<template>
  <div class="background">
    <div>
      <div class="flexcontent">
        <img src="../assets/icons/ping.svg" alt="ping" />
        <span>Maanstraat 2, 2800 Mechelen</span>
        <!-- <span>{{ ride.origin }}</span> -->
      </div>
      <div class="flexcontent">
        <img src="../assets/icons/flag.svg" alt="vlag" />
        <span>Steenstraat 51, 2800 Mechelen</span>
        <!-- <span>{{ ride.destination }}</span> -->
      </div>
      <div class="flexcontent">
        <img src="../assets/icons/clock.svg" alt="klok" />
        <span>14 april 2023</span>
        <!-- <span>{{ ride.timeStamp }}</span> -->
      </div>
      <div class="flex2">
        <div class="flex">
          <img src="../assets/icons/people.svg" alt="people" />
          <span>2 personen</span>
          <!-- <span>{{ ride.passengers }}</span> -->
        </div>
        <div class="flex">
          <img src="../assets/icons/twopings.svg" alt="twopings" />
          <span>2,2 km</span>
          <!-- <span>{{ ride.distance }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

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
}
</style>
