<script setup>
function clearstorage() {
    localStorage.clear();
}
</script>

<template>
 <RouterLink @click="clearstorage" to="/start">Logout</RouterLink>
</template>
