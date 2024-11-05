<template>
    <div class="chat-list">
      <div 
        v-for="(chat, index) in chats" 
        :key="index" 
        class="chat-item"
        @click="selectChat(chat)"
      >
        <img :src="chat.avatar" alt="Profile" class="avatar" />
        <div class="chat-info">
          <h4>{{ chat.name }}</h4>
          <p class="last-message">{{ chat.lastMessage }}</p>
        </div>
        <span class="chat-time">{{ chat.time }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        chats: [
          {
            name: 'User',
            lastMessage: 'https://www.linkedin.com/pulse/...',
            time: '1:31 AM',
            avatar: 'https://via.placeholder.com/40',
          },
          // Add more chat items based on your need
        ],
      };
    },
    methods: {
      selectChat(chat) {
        this.$emit('chatSelected', chat);
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-list {
    display: flex;
    flex-direction: column;
  }
  
  .chat-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .chat-info {
    flex-grow: 1;
  }
  
  .last-message {
    color: #aaa;
    font-size: 0.9rem;
  }
  
  .chat-time {
    font-size: 0.8rem;
    color: #888;
  }
  </style>
  