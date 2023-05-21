<script setup>
import Navigation from '../components/Navigation.vue';

</script>

<template>
  <Navigation v-bind:active="'chat'"></Navigation>
  <h1>Chat</h1>
  <div class="card">
  </div>
</template>

<style scoped>
h1 {
  color: white;
  position: fixed;
  top: 3.5rem;
  width: 100vw;
}
.card {
  padding-bottom: 8rem;
}
</style>
