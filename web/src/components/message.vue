<template>
  <div class="chat__conversation-board__message-container" :class="{'reversed': reversed}">
    <div class="chat__conversation-board__message__person">
      <div class="chat__conversation-board__message__person__avatar">
        <img :src="avatar" :alt="name" />
      </div>
      <span class="chat__conversation-board__message__person__nickname">{{
        name
      }}</span>
    </div>
    <div class="chat__conversation-board__message__context">
      <div class="chat__conversation-board__message__bubble">
        <span>{{ message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  reversed: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String
  },
  name: {
    type: String
  },
  message: {
    type: String
  }

})
</script>
