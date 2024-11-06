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
            name: 'Alice',
            lastMessage: 'How are you?',
            time: '17:46',
            avatar: 'https://avatar.iran.liara.run/public/73',
          },
          {
            name: 'Bob',
            lastMessage: 'How is your dog?',
            time: '17:44',
            avatar: 'https://avatar.iran.liara.run/public/46',
          },
          {
            name: 'Mallory',
            lastMessage: 'Have you gone to the vet yet?',
            time: '17:40',
            avatar: 'https://avatar.iran.liara.run/public/89',
          },
          {
            name: 'John',
            lastMessage: 'How do I find good pet food?',
            time: '17:35',
            avatar: 'https://avatar.iran.liara.run/public/46',
          },
          {
            name: 'Emily',
            lastMessage: 'My dog is barking at me',
            time: '17:30',
            avatar: 'https://avatar.iran.liara.run/public/73',
          },
          {
            name: 'David',
            lastMessage: 'How many dogs do you have?',
            time: '17:20',
            avatar: 'https://avatar.iran.liara.run/public/73',
          },
          {
            name: 'Greg',
            lastMessage: 'Do you plan to adopt a cat?',
            time: '17:17',
            avatar: 'https://avatar.iran.liara.run/public/73',
          }
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
    border-bottom: 1px solid #ECDFCC;
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
  