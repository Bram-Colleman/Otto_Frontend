<script setup>
import Navigation from "../components/Navigation.vue";
import { ref, onMounted } from "vue";

function clearstorage() {
  localStorage.clear();
}

const name = localStorage.getItem("name");
let profileInfo = ref();
let profilePicture = ref(profileInfo.profilePicture);

onMounted(() => {
  //   fetch("https://otto-backend.onrender.com/api/driver/create", {
  fetch("http://localhost:3000/api/driver/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        profileInfo = data;
        if (profileInfo.profilePicture != undefined) {
          document.querySelector(".profilePic").src =
            profileInfo.profilePicture;
        }
      } else {
        console.error("Something went wrong!");
      }
    });
});
</script>

<template>
  <Navigation v-bind:active="'settings'"></Navigation>
  <div class="container">
    <h2>Instellingen</h2>
    <div class="banner">
      <img
        class="profilePic"
        src="https://www.citypng.com/public/uploads/small/11665172290h3c0oe85yntqsk3jfcepujfl7xjo8hmmnvepmbpinagpfflrqftfskvkmpsrjpmqeavim8c1apjmlnb2eyx58engvsu7dbnibkqq.png"
      /><span>{{ name }}</span>
    </div>
    <div class="background">
      <div class="settingflex">
        <img src="../assets/icons/profile.svg" alt="mijn profiel" />
        <div class="lineheight">
          <p>Mijn profiel</p>
          <p class="p14">Pas mijn profiel aan</p>
        </div>
        <img src="../assets/icons/arrow.svg" alt="arrow">
      </div>
    </div>
    <button>
      <RouterLink @click="clearstorage" to="/login">Uitloggen</RouterLink>
    </button>
  </div>
</template>

<style scoped>

.lineheight {
  line-height: 0.2rem;
}
.p14 {
  font-size: 14px;
  color: #C2C9CC;
}
.settingflex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.background {
  background: #ffffff;
  box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  margin-top: 2rem;
  padding: 2rem;
}
.container {
  height: 100vh;
  background-color: white;
  padding: 56px;
}

h2 {
  color: #3289f3;
  font-family: "urbancat_rgbold";
  margin-top: 0;
}
.banner {
  background-color: #3289f3;
  overflow: hidden;
  background-image: url(../assets/backgroundcar.svg);
  background-size: 100%;
  background-position: 0% 25%;
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 5px;
}
.banner span {
  margin-left: 0.5rem;
  color: white;
}
.banner img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid white;
}
</style>
