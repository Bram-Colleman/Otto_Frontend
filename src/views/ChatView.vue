<script setup>
import Navigation from '../components/Navigation.vue';
import Chatdetails from '../components/Chatdetails.vue';


import { onMounted, ref } from 'vue';
import { createSharedComposable } from '@vueuse/core';

let card = document.querySelector('.card');
let details = document.querySelector('.details');
let comp = document.querySelectorAll('.comp');
let c = ref("");
const chats = ref([]);


let primus = Primus.connect("https://otto-backend.onrender.com", {
  reconnect: {
    max: Infinity, // Number: The max delay before we try to reconnect.
    min: 500, // Number: The minimum delay before we try reconnect.
    retries: 10, // Number: How many times we should try to reconnect.
  },
});

primus.on("data", (data) => {
  if (data.action == "message") {
    getChats();
  }
});

onMounted(() => {
getChats();
});


function getChats() {
  fetch(
    `https://otto-backend.onrender.com/api/chat/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("token"),
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        chats.value = data.chats;
        if (c.value == ""){
          c.value = chats.value[0];
        } else {
          chats.value.forEach((chat) => {
            if (chat._id == c.value._id) {
              c.value = chat;
            }
          });
        }
        card = document.querySelector('.card');
        details = document.querySelector('.details');
        comp = document.querySelectorAll('.comp');
      } else {
        console.error("Something went wrong!");
      }
    });
}

function open(chat) {
  card = document.querySelector('.card');
  details = document.querySelector('.details');
  comp = document.querySelectorAll('.comp');
  c.value = chat;
  details.classList.remove('slide-right');
  details.classList.add('slide-left');
  comp.forEach((element) => {
    element.classList.remove('slide-right');
    element.classList.add('slide-left');
  });
  card.classList.remove('slide-down');
  card.classList.add('slide-up');
  document.querySelector('.navcontainer').style.opacity = "0";
}

function close() {
  details.classList.remove('slide-left');
  details.classList.add('slide-right');
  comp.forEach((element) => {
    element.classList.remove('slide-left');
    element.classList.add('slide-right');
  });
  card.classList.remove('slide-up');
  card.classList.add('slide-down');
  document.querySelector('.navcontainer').style.opacity = "1";
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
function atSent() {
  delay(1000)
  .then(() => {
    primus.write({
    "action": "message",
    "data": c.value
  });
  })

  getChats();
}
</script>

<template>
  <div class="navcontainer">
    <Navigation v-bind:active="'chat'"></Navigation>
  </div>
  <h1>Chat</h1>
  <div class="card">
    <!-- chat component -->
    <div class="flex comp" @click="open(c)" v-for="c in chats">
      <img class="profilepic" :src="c.eldercare.profilepicture" alt="">
      <div class="flex col">
        <span class="name">{{ c.eldercare.name }}</span>
        <div v-if="c.messages[0]">
          <span class="msg">{{ c.messages[c.messages.length-1].text }} &middot; </span> 
          <span class="msg" v-if="Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000) < 60">
             {{ Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000) + 's' }}
          </span>
          <span class="msg" v-if="Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) <  3600 && Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) >=  60 ">
             {{ Math.floor((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 /60) + 'm' }}
          </span>
          <span class="msg" v-if="Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) <  216000 && Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) >=  3600 ">
             {{ Math.floor((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 /60 /60) + 'u' }}
          </span>
          <span class="msg" v-if="Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) <  5184000 && Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) >=  216000 ">
             {{ Math.floor((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 /60 /60 /24) + 'd' }}
          </span>
          <span class="msg" v-if="Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) <  36288000 && Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) >=  5184000 ">
             {{ Math.floor((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 /60 /60 /24) + 'w' }}
          </span>
          <span class="msg" v-if="Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) <  1886976000 && Math.ceil((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 ) >=  36288000 ">
             {{ Math.floor((Date.now() - new Date(c.messages[c.messages.length-1].timestamp)) /1000 /60 /60 /24) + 'j' }}
          </span>
        </div>
        <div v-else>
          <span class="msg">Nieuwe chat</span> 
        </div>
      </div>
    </div>
    <Chatdetails class="details" @back="close" @reload="atSent" :chat="c" v-if="c"/>

  </div>
</template>

<style scoped>
.comp {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: .5rem;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.profilepic {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
}
.name {
  font-weight: bold;
}
.msg {
  color: rgba(0, 0, 0, 0.5);
}

h1 {
  color: white;
  position: fixed;
  top: 3.5rem;
  width: 100vw;
}
.card {
  padding-bottom: 8rem;
  position: relative;

}

.slide-left {
	        animation: slide-left 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.slide-right {
	        animation: slide-right 0.25s 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.slide-up {
	        animation: slide-up 0.25s 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.slide-down {
	        animation: slide-down 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@keyframes slide-left {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(-100vw);
            transform: translateX(-100vw);
  }
}
@keyframes slide-right {
  0% {
    -webkit-transform: translateX(-100vw);
            transform: translateX(-100vw);
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
}
@keyframes slide-up {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-150px);
            transform: translateY(-150px);
  }
}
@keyframes slide-down {
  0% {
    -webkit-transform: translateY(-150px);
            transform: translateY(-150px);
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
}

@keyframes scale-in-center {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
