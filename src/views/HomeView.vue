<script setup>
import Navigation from '../components/Navigation.vue';



let name = localStorage.getItem('name').split(" ")[0];
</script>

<template>
  <Navigation v-bind:active="'home'"></Navigation>
  <div class="card">
    <h1>Hi, {{name}} 👋</h1>
  </div>
</template>

<style scoped>

</style>
