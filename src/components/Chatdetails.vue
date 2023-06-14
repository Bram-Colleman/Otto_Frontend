<script setup>
import { defineEmits, defineProps, ref } from "vue";
const emit = defineEmits(["back", "reload"]);
const props = defineProps(["chat", "uid"]);

const text = ref("");
async function sendMessage(m) {
  let apiUrl = "https://otto-backend.onrender.com/api/message/create";
  await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      text: m,
    }),
  })
    .then((response) => response.json())
    .then(async (data) => {
      await fetch(`https://otto-backend.onrender.com/api/chat/addmessage/${props.chat._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          message: data.data.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            //TODO: Live update
            text.value = "";
            emit("reload");
        });
    });
}
</script>

<template>
  <div class="all">
    <div class="flex topcontrol">
      <img
        src="../assets/icons/arrow.svg"
        @click="this.$emit('back')"
        class="back"
      />
      <img
        src="https://avatars.githubusercontent.com/u/72066149?v=4"
        alt=""
        class="pp"
      />
      <h2>{{ props.chat.eldercare.name }}</h2>
    </div>

    <div class="messages">
      <div v-for="m in props.chat.messages.slice().reverse()">
        <div v-if="m.sender == chat.driver._id" class="flex col">
            <span class="sent">{{ m.text }}</span>
        </div>
        <div v-if="m.sender == chat.eldercare._id" class="flex col">
            <span class="received">{{ m.text }}</span>
        </div>
        <!-- <span class="sent">sent message1</span> -->
      </div>
    </div>
    <div class="flex bottomcontrol">
      <input type="text" placeholder="Schrijf een bericht" v-model="text" />
      <img src="../assets/icons/send.svg" alt="" @click="sendMessage(text)"  />
    </div>
  </div>
</template>

<style scoped>
.sent {
  background: #3289f3;
  color: #ffffff;
  border-radius: 1.5rem;
  padding: 0.75rem 1rem;
  margin: .25rem;
  max-width: 50%;
  align-self: flex-end;
}
.received {
  background: #f3f3f3;
  border-radius: 1.5rem;
  padding: 0.75rem 1rem;
  max-width: 55%;
  align-self: flex-start;
}
.messages {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding: 1rem 0;
  display: flex;
  flex-direction: column-reverse;
}
input {
  border-radius: 3rem;
  padding: 0.75rem 1rem;
  flex-grow: 2;
}
.bottomcontrol {
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.bottomcontrol img {
  width: 2rem;
  height: 2rem;
  margin: 0 0 0 0.75rem;
}
.topcontrol {
  justify-content: space-around;
  align-items: center;
}
h2 {
  font-family: "urbancat_rgbold";
  flex-grow: 2;
}
.pp {
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
}
.back {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
  rotate: 180deg;
}

.all {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 3rem);
  position: absolute;
  left: 100%;
  top: 0;
  width: calc(100vw - 3rem);
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 15px 15px 0;
}
</style>
