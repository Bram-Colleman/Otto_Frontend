<script setup>
import Navigation from "../components/Navigation.vue";
import { ref, onMounted } from "vue";

function clearstorage() {
  localStorage.clear();
}

const name = localStorage.getItem("name");
let profileInfo = ref();
let logout = ref();

onMounted(() => {
  //   fetch("https://otto-backend.onrender.com/api/driver/create", {
  fetch("http://localhost:3000/api/driver/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
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
        <img src="../assets/icons/arrow.svg" alt="arrow" />
      </div>
      <div class="settingflex">
        <img src="../assets/icons/profile.svg" alt="mijn profiel" />
        <div class="lineheight">
          <p>Voorkeuren</p>
          <p class="p14">Pas mijn voorkeuren aan</p>
        </div>
        <img src="../assets/icons/arrow.svg" alt="arrow" />
      </div>
      <div class="settingflex">
        <img src="../assets/icons/privacy.svg" alt="mijn profiel" />
        <div class="lineheight">
          <p>Privacy</p>
        </div>
        <img src="../assets/icons/arrow.svg" alt="arrow" />
      </div>
      <div class="settingflex">
        <img src="../assets/icons/notification.svg" alt="mijn profiel" />
        <div class="lineheight">
          <p>Meldingen</p>
        </div>
        <img src="../assets/icons/arrow.svg" alt="arrow" />
      </div>
      <div class="settingflex" @click="logout = !logout">
        <img src="../assets/icons/logout.svg" alt="mijn profiel" />
        <div class="lineheight">
          <p>Uitloggen</p>
        </div>
        <img src="../assets/icons/arrow.svg" alt="arrow" />
      </div>
    </div>
  </div>
  <div v-if="logout">
    <div class="darken"></div>
    <div class="flex col confirm">
      <p>Ben je zeker dat je wilt uitloggen?</p>
      <div class="flex grow">
        <button @click="logout = !logout" id="confirmnee">Nee</button>
        <RouterLink @click="clearstorage" to="/login">
          <button>Ja</button>
        </RouterLink>
      </div>
    </div>
  </div>
  <div class="container2">
    <p>More</p>
    <div class="background2">
      <div class="settingflex">
        <img src="../assets/icons/heart.svg" alt="over ons" />
        <div class="lineheight">
          <p>Over ons</p>
        </div>
        <img src="../assets/icons/arrow.svg" alt="arrow" />
      </div>
      <div class="settingflex">
        <img src="../assets/icons/bell.svg" alt="feedback" />
        <div class="lineheight">
          <p>Geef feedback</p>
        </div>
        <img src="../assets/icons/arrow.svg" alt="arrow" />
      </div>
      <div class="settingflex">
        <img src="../assets/icons/heart.svg" alt="contact" />
        <div class="lineheight">
          <p>Contact</p>
        </div>
        <img src="../assets/icons/arrow.svg" alt="arrow" />
      </div>
      <div class="settingflex">
        <img src="../assets/icons/bell.svg" alt="fout rapporteren" />
        <div class="lineheight">
          <p>Fout rapporteren</p>
        </div>
        <img src="../assets/icons/arrow.svg" alt="arrow" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.darken {
  background-color: black;
  opacity: 0.5;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.confirm {
  text-align: center;
  position: fixed;
  background-color: white;
  width: 85%;
  border-radius: 5px;
  box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.06);
  top: 50vh;
  left: 0;
  transform: translateY(-50%);
  margin: 0 7.5%;
  padding: 1rem 0;
}
.grow {
  justify-content: space-around;
}
.confirm a {
  margin: 0 !important;
}
.confirmnee,
.confirm a {
  margin: 0.5rem;
  width: 45%;
}
#confirmnee {
  background-color: rgba(223, 223, 223, 1);
  color: #00131d;
  width: 50%;
}
.lineheight {
  line-height: 0.2rem;
  margin-left: 1rem;
  flex-grow: 1;
}
.p14 {
  font-size: 14px;
  color: #c2c9cc;
  margin: 0;
}
.settingflex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
}
.background {
  background: #ffffff;
  box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  margin-top: 1.5rem;
  padding: 0 1.5rem;
}

.background2 {
  background: #ffffff;
  box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 0 1.5rem;
  margin-bottom: 8rem;
}
.container {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1rem 2rem 0;
}

.container2 {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 0rem 2rem;
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
