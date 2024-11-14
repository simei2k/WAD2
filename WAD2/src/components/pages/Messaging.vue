<template>
  <div id="app">
    <ChatList v-if="!chatSelected" @chatSelected="openChat" />
    <ChatView v-else :selectedChat="selectedChat" />
  </div>
</template>

<script>
import ChatList from './ChatList.vue';
import ChatView from './ChatView.vue';

export default {
  components: {
    ChatList,
    ChatView,
  },
  data() {
    return {
      chatSelected: false,
      selectedChat: null,
    };
  },
  methods: {
    openChat(chat) {
      this.chatSelected = true;
      this.selectedChat = chat;
    },
  },
};
</script>

<style>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
