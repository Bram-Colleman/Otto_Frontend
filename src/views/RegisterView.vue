<script setup>
import { ref } from "vue";
import Background from "../components/Background.vue";


let givenName = ref("");
let familyName = ref("");
let dateOfBirth = ref("");
let gender = ref("");
let street = ref("");
let housenumber = ref("");
let postalcode = ref("");
let city = ref("");
let password = ref("");
let passwordCheck = ref("");
let email = ref("");
let phone = ref("");
let address = "";

function register() {
    address = street.value + " " + housenumber.value + ", " + postalcode.value + " " + city.value;

//   fetch("https://otto-backend.onrender.com/api/driver/create", {
  fetch("http://localhost:3000/api/driver/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      givenName: givenName.value,
      familyName: familyName.value,
      dateOfBirth: dateOfBirth.value,
      gender: gender.value,
      address: address,
      password: password.value,
      passwordCheck: passwordCheck.value,
      email: email.value,
      phone: phone.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        console.log("Error");
        message.value = true;
      }
    });
}

// let currentPage = 1;

// function nextPage() {

// }

</script>

<template>
    <Background></Background>
    <RouterLink to="/">Back</RouterLink>
    <div class="card">
        <h1 id="title">Registreren</h1>
        <form @submit.prevent="register">
            <div class="group">
                <label for="givenName">Voornaam</label>
                <input type="text" name="givenName" v-model="givenName" placeholder="Voornaam">
                <label for="familyName">Achternaam</label>
                <input type="text" name="familyName" v-model="familyName" placeholder="Achternaam">
                <label for="email">E-mail</label>
                <input type="email" name="email" v-model="email" placeholder="voorbeeld@otto.be">
            </div>
            <div class="group hidden">
                <div class="address">
                    <label for="address">Adres</label>
                    <div>
                        <label for="street">Straat</label>
                        <input type="text" name="street" v-model="street">
                    </div>
                    <div>
                        <label for="housenumber">Huisnummer</label>
                        <input type="text" name="housenumber" v-model="housenumber">
                    </div>
                    <div>
                        <label for="postalcode">Postcode</label>
                        <input type="text" name="postalcode" v-model="postalcode">
                    </div>
                    <div>
                        <label for="city">Plaats</label>
                        <input type="text" name="city" v-model="city">
                    </div>
                </div>
                <label for="dateOfBirth">Geboortedatum</label>
                <input type="date" name="dateOfBirth" v-model="dateOfBirth">
                <label for="gender">Geslacht</label>
                <div class="radio">
                    <div>
                        <input type="radio" name="gender" value="M" id="male" v-model="gender"> <label for="male">Man</label>
                    </div>
                    <div>
                        <input type="radio" name="gender" value="F" id="female" v-model="gender"> <label for="female">Vrouw</label>
                    </div>
                    <div>
                        <input type="radio" name="gender" value="X" id="other" v-model="gender"> <label for="other">Anders</label>
                    </div>
                </div>
                <label for="password">Wachtwoord</label>
                <input type="password" name="password" v-model="password">
                <label for="confirmPassword">Bevestig Wachtwoord</label>
                <input type="password" name="confirmPassword" v-model="passwordCheck">
                <input type="submit" name="" value="Registreer">
            </div>
            <button @click="">Volgende</button>
            <div class="separator">Of</div>
            <button @click="" class="itsme"><img src="../assets/itsme.svg" alt="">Aanmelden met itsme</button>
        </form>
    </div>
</template>

<style scoped>
.card {
    background-color: white;
    margin-top: 150px;
    padding: 43px 26px 0 26px;
    border-radius: 15px 15px 0px 0px;
}
#title {
    text-align: center;
    color: #3289F3;
    font-family: 'urbancat_rgbold';
    margin-top: 0;
}
.group {
    display: flex;
    flex-direction: column;
}
.hidden {
    display: none;
}
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: rgba(223, 223, 223, 1);
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid rgba(223, 223, 223, 1);
}

.separator:not(:empty)::before {
  margin-right: 16px;
}

.separator:not(:empty)::after {
  margin-left: 16px;
}

.itsme {
    background-color: white;
    border: #E4E8E1 solid 1px;
    color: #2D3131;
    font-family: 'Roboto Slab', serif;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
}
.itsme img {
   width: 40px;
   margin-right: 16px; 
}

form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 20rem;
}
.radio, .address>div {
    display: flex;
}
.address>div>input {
    flex-grow: 1;
}
</style>
