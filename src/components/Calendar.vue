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
  let apiUrl = "https://otto-backend.onrender.com/api/availability/getbydriver";
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
      popover: { label: timeLabel, visibility: "click" },
      // dates: [new Date(item.beginDate), new Date(item.endDate)],
      dates: {
        start: new Date(item.beginDate),
        end: new Date(item.endDate),
      },
    });
  });
}

function sendAvailability() {
  let apiUrl = "https://otto-backend.onrender.com/api/availability/create";
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
  <button class="plus" v-if="rover.start" @click="sendAvailability">+</button>
</template>

<style>
.plus {
  line-height: 0;
  font-size: 2rem;
  position: absolute;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  left: calc(50% - 60px / 2 + 150px);
  top: calc(50% - 60px / 2 + 260px);

  /* Primary Blue */

  background: #3289f3;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
}

.vc-time-picker.vc-attached {
  border: none !important;
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
.vc-base-select select.vc-align-left,
.vc-base-select select.vc-align-right {
  text-align: center !important;
}

.kalender button {
  background-color: white;
}

.kalender {
  width: 100%;
}
</style>
