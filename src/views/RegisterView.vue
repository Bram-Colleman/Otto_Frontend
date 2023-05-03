<script setup>
import { ref } from "vue";

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

</script>

<template>
    <RouterLink to="/">Back</RouterLink>
    <h1>Registreer</h1>
    <form @submit.prevent="register">
        <label for="givenName">Voornaam</label>
        <input type="text" name="givenName" v-model="givenName">
        <label for="familyName">Achternaam</label>
        <input type="text" name="familyName" v-model="familyName">
        <label for="email">E-mail</label>
        <input type="email" name="email" v-model="email">
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
    </form>
</template>

<style scoped>
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
