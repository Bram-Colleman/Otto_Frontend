<template>
    <div>
        <img src = "../assets/backgroundcar.svg" alt="" class="background"/>
    </div>

</template>

<style scoped>
div {
    background-color: #3289F3;
    position: fixed;
    z-index: -999;
    top: 0;
}
img {

    width: 100%;
}

@media (min-width: 480px) {
  img {
    display: none;
  }
  div {
    background-color: #3289F3;
    height: 20vh;
    width: 100vw;
  }
}
</style>