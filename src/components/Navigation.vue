<script setup>

</script>

<template>
    <div class="flex nav">
        <RouterLink to="/"><img src="../assets/icons/home.svg" alt=""></RouterLink>
        <RouterLink to="/calender"><img src="../assets/icons/calender.svg" alt=""></RouterLink>
        <RouterLink to="/route"><img src="../assets/icons/route.svg" alt=""></RouterLink>
        <RouterLink to="/chat"><img src="../assets/icons/chat.svg" alt=""></RouterLink>
        <RouterLink to="/settings"><img src="../assets/icons/settings.svg" alt=""></RouterLink>
    </div>

</template>

<style scoped>
.nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    justify-content: space-around;

    background: white;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
}
img {
    margin-top: 16px;
    margin-bottom: 42px;
}

</style>