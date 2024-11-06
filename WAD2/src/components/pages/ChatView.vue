<template>
    <div class="chat-view">
      <div class="chat-header">
        <!-- <button class="back-button" @click="goBack">← Back</button> -->
        <h3>{{ selectedChat.name }}</h3>
      </div>
      <div class="chat-messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.type === 'outgoing' ? 'outgoing' : 'incoming']"
        >
          <p class="message-content">{{ message.text }}</p>
          <span class="message-time">{{ message.time }}</span>
        </div>
      </div>
      <div class="chat-input">
        <input v-model="newMessage" placeholder="Type a message" @keyup.enter="sendMessage" />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['selectedChat'],
    data() {
      return {
        messages: [
          { text: 'Hello!', type: 'incoming', time: '17:45' },
          { text: 'How are you?', type: 'outgoing', time: '17:46' },
          // Add more sample messages for demonstration
        ],
        newMessage: '',
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim()) {
          this.messages.push({ text: this.newMessage, type: 'outgoing', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
          this.newMessage = '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-view {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .chat-header {
    background-color: #697565;
    color: #ECDFCC;
    padding: 10px;
    text-align: center;
  }

/* 
  .back-button {
    background: none;
    border: 1px solid #ECDFCC;
    color: #ECDFCC;
    font-size: 1rem;
    cursor: pointer;
  } */
  
  .chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
  }
  
  .message {
    max-width: 70%;
    padding: 10px;
    margin: 5px 0;
    border-radius: 10px;
    position: relative;
  }
  
  .incoming {
    background-color: #3C3D37;
    color: #ECDFCC;
    margin-right: auto;
    border-top-left-radius: 0;
    width: 100%;
  }
  .outgoing {
    background-color: #ECDFCC;
    color: #3C3D37;
    margin-left: auto;
    border-top-right-radius: 0;
  }
  
  .message-content {
    margin: 0;
  }
  
  .message-time {
    display: block;
    font-size: 0.75rem;
    color: #aaa;
    text-align: right;
    margin-top: 5px;
  }
  
  .chat-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ccc;
  }
  
  .chat-input input {
    flex-grow: 1;
    padding: 5px;
    margin-right: 5px;
  }
  
  .chat-input button {
    padding: 5px 10px;
  }
  </style>
  