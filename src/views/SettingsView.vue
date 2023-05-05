<script setup>
import Navigation from '../components/Navigation.vue';


function clearstorage() {
    localStorage.clear();
}

</script>

<template>
  <Navigation v-bind:active="'settings'"></Navigation>
  <div class="card">
    <h1>Instellingen</h1>
    <button>
        <RouterLink @click="clearstorage" to="/start">Logout</RouterLink>
    </button>
  </div>
</template>

<style scoped>

</style>
