<template>
  <div id="app">
    <ChatList v-if="!chatSelected" @chatSelected="openChat" />
    <ChatView v-else :selectedChat="selectedChat" @back="closeChat"/>
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
    closeChat () {
      this.chatSelected = false;
      this.selectedChat = null;
    }
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
