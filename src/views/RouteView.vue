<script setup>
import Navigation from "../components/Navigation.vue";
import Routedetails from "../components/Routedetails.vue";
import { onMounted, ref } from "vue";
import moment from "moment";

moment.locale("nl", {
  monthsShort: "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
});

let rides = ref([]);
let showless = ref(true);
let detail = ref(false);
let detailid = ref();

function toggledetail(id) {
  detailid.value = id;
  detail.value = !detail.value;
}

//fetch rides by driver and display them

onMounted(() => {
  //  fetch("https://otto-backend.onrender.com/api/ride/getbydriver"
  let apiUrl = "http://localhost:3000/api/ride/getbydriver";
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      rides.value = data.rides;

      for (let i = 0; i < rides.value.length; i++) {
        try {
          rides.value[i].destination =
            rides.value[i].destination.split(",")[0] +
            ", " +
            rides.value[i].destination.split(",")[1].slice(5);
        } catch {
          console.log(rides.value[i].destination);
        }
      }
    });
});
</script>

<template>
  <Navigation v-bind:active="'route'"></Navigation>
  <div class="card">
    <h1>Routes</h1>
    <Routedetails
      v-bind:id="detailid"
      v-if="detail"
      @close="detail = !detail"
    />
    <div v-if="rides[0]">
      <span><strong>Mijn routes</strong></span>
      <div v-if="showless">
        <div v-for="ride in rides.slice(0, 2)" :key="rides.id">
          <!-- <Routedetails v-bind:id="ride._id" v-if="detail" /> -->
          <div class="background">
            <div class="clientinfo">
              <div class="flextime">
                <img src="../assets/icons/clock.svg" alt="clock" />
                <span>{{
                  moment(ride.timeStamp).format("DD MMM YYYY - HH:mm")
                }}</span>
              </div>
              <div class="flexadress">
                <img src="../assets/icons/ping.svg" alt="location" />
                <span>{{ ride.destination }}</span>
              </div>
            </div>
            <div class="rideicons">
              <img
                id="target"
                src="../assets/icons/target.svg"
                alt="target"
                @click="toggledetail(ride._id)"
              />
              <img src="../assets/icons/chatblue.svg" alt="chat" />
            </div>
          </div>
        </div>
        <div class="flex" style="justify-content: flex-end">
          <span @click="showless = !showless" class="link"
            ><strong>Bekijk meer</strong></span
          >
        </div>
      </div>
      <div v-else>
        <div v-for="ride in rides" :key="rides.id">
          <div class="background">
            <div class="clientinfo">
              <div class="flextime">
                <img src="../assets/icons/clock.svg" alt="clock" />
                <span>{{ moment(ride.timeStamp).format("LLL") }}</span>
              </div>
              <div class="flexadress">
                <img src="../assets/icons/ping.svg" alt="location" />
                <span>{{ ride.destination }}</span>
              </div>
            </div>
            <div class="rideicons">
              <img
                id="target"
                src="../assets/icons/target.svg"
                alt="target"
                @click="toggledetail(ride._id)"
              />
              <img src="../assets/icons/chatblue.svg" alt="chat" />
            </div>
          </div>
        </div>
        <div class="flex" style="justify-content: flex-end">
          <span @click="showless = !showless" class="link"
            ><strong>Bekijk minder</strong></span
          >
        </div>
      </div>
    </div>

    <div v-if="rides[0] === undefined" class="msg">
      <span>You don't have any rides</span>
    </div>
  </div>
</template>

<style scoped>
.link {
  text-align: right;
  color: #3289f3;
}
.card {
  margin-bottom: 8rem;
}
.msg {
  height: 3rem;
  background-color: white;
  text-align: center;
  font-weight: bold;
}

.rideicons img {
  width: 1.5rem;
}

#target {
  padding-right: 1.5rem;
}

.flextime,
.flexadress {
  display: flex;
  align-items: center;
  justify-content: left;
}

.flextime img,
.flexadress img {
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
  margin-right: 0.5rem;
}
.background {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  margin: 0.75rem 0;
  padding: 1.5rem 1.5rem;
}
</style>
