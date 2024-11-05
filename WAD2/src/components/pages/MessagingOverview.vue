<template>
    <div class="chat-list-container">
      <h2>Your Chats</h2>
      <ul class="chat-list">
        <li
          v-for="chat in chats"
          :key="chat.id"
          class="chat-item"
          @click="openChat(chat.id)"
        >
          <h3>{{ chat.userName }}</h3>
          <p>Last message: {{ chat.lastMessage }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        chats: [
          { id: 1, userName: 'Alice', lastMessage: 'See you later!' },
          { id: 2, userName: 'Bob', lastMessage: 'Got it, thanks!' },
          { id: 3, userName: 'Charlie', lastMessage: 'Let’s meet tomorrow.' }
        ]
      };
    },
    setup() {
      const router = useRouter();
      const openChat = (userId) => {
        router.push({ name: 'Chat', params: { userId } });
      };
      return { openChat };
    }
  };
  </script>
  
  <style scoped>
  .chat-list-container {
    padding: 20px;
  }
  .chat-list {
    list-style-type: none;
    padding: 0;
  }
  .chat-item {
    padding: 15px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }
  .chat-item h3 {
    margin: 0;
    font-size: 1.2em;
  }
  .chat-item p {
    color: #666;
  }
  </style>
  