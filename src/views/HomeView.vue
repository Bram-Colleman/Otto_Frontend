<script setup>
import Navigation from '../components/Navigation.vue';

function clearstorage() {
    localStorage.clear();
}
</script>

<template>
  <Navigation v-bind:active="'home'"></Navigation>
 <RouterLink @click="clearstorage" to="/start">Logout</RouterLink>
</template>
