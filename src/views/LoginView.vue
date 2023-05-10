<script setup>
import { ref } from "vue";

let email = ref("");
let password = ref("");
let error = ref(false);

function login() {
  fetch("https://otto-backend.onrender.com/api/driver/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email: email.value,
        password: password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        window.location.href = "/";
      } else {
        console.error("Something went wrong!");
        error.value = !error.value;
      }
    });
}


</script>

<template>
    <RouterLink to="/start">Back</RouterLink>
    <div class="card">
        <h1>Inloggen</h1>
        <form @submit.prevent="login">
          <span v-if="error" class="error center">E-mail of wachtwoord is incorrect!</span>
            <label for="email">E-mail</label>
            <input type="email" name="email" v-model="email" placeholder="voorbeeld@otto.be">

            <label for="password">Wachtwoord</label>
            <input type="password" name="password" v-model="password">

            <button type="submit" >Log in</button>
            <div class="container-itsme">
                <div class="separator">Of</div>
                <button @click="" class="itsme"><img src="../assets/itsme.svg" alt="">Inloggen met itsme</button>
            </div>
            <span class="center">Nog geen account? <RouterLink to="/register">Registreren</RouterLink></span>
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
    width: 100%;
    padding: .5rem 0;
}
.itsme img {
   width: 40px;
   margin-right: 16px; 
}

form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
}

.center {
    text-align: center;
    width: 100%;
}
</style>
