<script setup>
import Navigation from '../components/Navigation.vue';

function clearstorage() {
    localStorage.clear();
}

let name = localStorage.getItem('name');
</script>

<template>
  <Navigation v-bind:active="'home'"></Navigation>
  <RouterLink @click="clearstorage" to="/start">Logout</RouterLink>
  <div class="card">
    <h1>Hi, {{name}} 👋</h1>
  </div>
</template>

<style scoped>

</style>
