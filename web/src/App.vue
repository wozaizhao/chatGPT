<template>
  <div class="--dark-theme" id="chat">
    <div class="loading-container" v-show="loading">
      <spinner />
    </div>
    <div class="chat__conversation-board">
      <message v-bind="item" v-for="item in messages" :key="message.id" />
    </div>
    <div class="chat__conversation-panel">
      <div class="chat__conversation-panel__container">
        <!-- <button
          class="chat__conversation-panel__button panel-item btn-icon add-file-button"
        >
          <svg
            class="feather feather-plus sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button
          class="chat__conversation-panel__button panel-item btn-icon emoji-button"
        >
          <svg
            class="feather feather-smile sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        </button> -->
        <input v-model="question"
          class="chat__conversation-panel__input panel-item"
          placeholder="请输入"
        />
        <button @click="submit" @keyup.enter="submit"
          class="chat__conversation-panel__button panel-item btn-icon send-message-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            data-reactid="1036"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import message from './components/message.vue';
import spinner from './components/spinner.vue';
const botAvatar = 'https://cos.wozaizhao.com/chatgpt.png';
const meAvatar = 'https://cos.wozaizhao.com/logo.png';

const messages = ref([]);

const addMessage = (message, name, avatar, reversed) => {
  messages.value.push({
    message,
    name,
    avatar,
    reversed
  })
}
const question = ref('');
const submit = () => {
  if (loading.value) return;
  console.log('question', question.value);
  addMessage(question.value, 'me', meAvatar, true);
  askChatGPT(question.value)
}
const loading = ref(false);
const askChatGPT = (q) => {
  loading.value = true;
  axios.get('https://hd8yhgen2i.hk.aircode.run/hello?q=' + q)
  .then(function (response) {
    // handle success
    console.log(response);
    addMessage(response.data.answer, 'chatGPT', botAvatar);
    question.value = '';
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    addMessage('网络可能出了问题，我暂时不能回答问题', 'chatGPT', botAvatar);
  })
  .then(function () {
    // always executed
    loading.value = false;
  });
}

onMounted(() => {
  addMessage('我是AI，欢迎提问，可能有点慢，请耐心等待我的回复', 'chatGPT', botAvatar);
})

</script>


<style scoped>
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  text-align: center;
  padding-top: 40%;
}
</style>
