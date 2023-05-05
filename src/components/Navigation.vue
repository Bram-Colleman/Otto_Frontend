<script setup>
import { onMounted } from 'vue';

const props = defineProps(['active']);


onMounted(() => {
    switch (props.active) {
    case "home": {document.querySelector("#home").classList.add("active");} 
    }
});


</script>

<template>
    <div class="flex nav">
        <RouterLink to="/"><img src="../assets/icons/home.svg" id="home"></RouterLink>
        <RouterLink to="/calender"><img src="../assets/icons/calender.svg" id="calender"></RouterLink>
        <RouterLink to="/route"><img src="../assets/icons/route.svg" id="route"></RouterLink>
        <RouterLink to="/chat"><img src="../assets/icons/chat.svg" id="chat"></RouterLink>
        <RouterLink to="/settings"><img src="../assets/icons/settings.svg" id="settings"></RouterLink>
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
    filter: saturate(.0) brightness(0.5);
}
.active {
    filter: none;
}

</style>