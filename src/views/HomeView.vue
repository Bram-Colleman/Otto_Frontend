<script setup>
import Navigation from '../components/Navigation.vue';
import Map from '../components/Map.vue';
import Routedetails from '../components/Routedetails.vue';
import moment from "moment";
import { onMounted, ref } from "vue";

let name = localStorage.getItem('name').split(" ")[0];
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

onMounted(() => {
  getRides();
});

function getRides() {
  const apiUrl = "https://otto-backend.onrender.com/api/ride/getbydriver";
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
    });
}


</script>

<template>
  <Navigation v-bind:active="'home'" style="z-index: 1000;"></Navigation>
  <h1>Hi, {{name}} 👋</h1>
  <div class="map">
    <Map></Map> 
  </div>
  <!-- <div class="card">
  </div> -->
  <Routedetails
    v-bind:id="detailid"
    v-if="detail"
    @close="toggledetail(detailid)"
    :accepted="true"
  />
  <div class="card">
    <div class="flex dragcontainer">
      <div class="dragbar"></div>
    </div>
    <span><strong>Mijn routes</strong></span>
    <div v-if="rides[0]">
      <div v-if="showless">
        <div v-for="ride in rides.slice(0, 2)" :key="rides.id">
          <div class="background">
            <div class="clientinfo">
              <div class="flextime">
                <img src="../assets/icons/clock.svg" alt="clock" />
                <span>{{
                  moment(Date.parse(ride.timeStamp) - 7200000).format("DD MMM YYYY - HH:mm")
                }}</span>
              </div>
              <div class="flexadress">
                <img src="../assets/icons/ping.svg" alt="location" />
                <span>{{ ride.destinationAddress.split(',')[0] }}, {{ ride.destinationAddress.split(',')[1].slice(6) }}</span>
              </div>
            </div>
            <div class="rideicons flex">
              <img
                id="target"
                src="../assets/icons/target.svg"
                alt="target"
                @click="toggledetail(ride._id)"
              />
              <RouterLink to="/chat"><img src="../assets/icons/chatblue.svg" id="chat"></RouterLink>

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
                <span>{{ moment(Date.parse(ride.timeStamp) - 7200000).format("DD MMM YYYY - HH:mm") }}</span>
              </div>
              <div class="flexadress">
                <img src="../assets/icons/ping.svg" alt="location" />
                <span>{{ ride.destinationAddress.split(',')[0] }}, {{ ride.destinationAddress.split(',')[1].slice(6) }}</span>
              </div>
            </div>
            <div class="rideicons flex">
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
      <span>Je hebt geen routes gepland</span>
    </div>
  </div>
</template>

<style scoped>
.info {
  color: #3289f3;
  cursor: pointer;
  font-weight: bold;
}
.dragbar {
  width: 5rem;
  height: .4rem;
  background-color: rgb(226, 226, 226);
  margin-bottom: 1rem;
  border-radius: 6px;
}
.dragcontainer {
  width: 100%;
  justify-content: center;
}
h1 {
  color: white;
  position: fixed;
  top: 3.5rem;
  width: 100vw;

}
.map {
  position: fixed;
  top: 10rem;
  left: 0;
  width: 100%;
  height: calc(100vh - 25rem);
  flex-grow: 1;
}
.link {
  text-align: right;
  color: #3289f3;
}
.card {
  position: absolute;
  top: 25rem;
  padding-bottom: 8rem;
  padding-top: 1rem;
	animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

}
.msg {
  height: 3rem;
  background-color: white;
  text-align: center;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.75);
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

@keyframes slide-in-bottom {
  0% {
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
