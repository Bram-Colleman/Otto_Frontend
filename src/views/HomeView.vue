<script setup>
import Navigation from '../components/Navigation.vue';

function clearstorage() {
    localStorage.clear();
}
</script>

<template>
  <Navigation></Navigation>
 <RouterLink @click="clearstorage" to="/start">Logout</RouterLink>
</template>
