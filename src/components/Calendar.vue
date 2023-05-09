<script setup>
import { ref, onMounted } from "vue";
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";
import moment from "moment-timezone";


let availabilities = [];
const attrs = ref([
  {
    key: "today",
    highlight: "gray",
    dates: new Date(),
  },
]);

onMounted(() => {
  //  fetch("https://otto-backend.onrender.com/api/ride/getbydriver"
  let apiUrl = "http://localhost:3000/api/availability/getbydriver";
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      availabilities = data.availabilities;
      loadData();
    });
});

function loadData() {
  availabilities.forEach((item) => {
    const begintijd = moment(item.beginDate).format("HH:mm");
    const eindtijd = moment(item.endDate).format("HH:mm");
    let timeLabel = begintijd + " - " + eindtijd;
    attrs.value.push({
      highlight: "green",
      popover: {label: timeLabel, visibility:"click"},
      // dates: [new Date(item.beginDate), new Date(item.endDate)],
      dates: {
        start: new Date(item.beginDate),
        end: new Date(item.endDate)
      },
    });
  });
}

function sendAvailability() {
  let apiUrl = "http://localhost:3000/api/availability/create";
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      beginDate: rover.value.start,
      endDate: rover.value.end,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.reload();
    });
}

const rover = ref({
  start: null,
  end: null,
});
</script>

<template>
  <DatePicker
    class="kalender"
    v-model.range="rover"
    mode="dateTime"
    :attributes="attrs"
    transparent
    borderless
    timezone="Europe/Amsterdam"
    is24hr
  />
  <!-- TODO: fix styling -->
  <button v-if="rover.start" style="margin: -.25rem 0;" @click="sendAvailability">Voeg beschikbaarheid toe</button>
</template>

<style>

.vc-time-picker.vc-attached {
border: none!important;
}
.vc-time-select-group {
  background: none;
  border: none;
  height: 3rem;
}
.vc-time-select-group select {
  border: #accffb 1px solid;
  width: 3rem;
  height: 3rem;
  margin: 0 0.5rem;
}
.vc-base-select select.vc-align-left, .vc-base-select select.vc-align-right {
  text-align: center!important;
}

.kalender button {
  background-color: white;
}

.kalender {
  width: 100%;
}
</style>
