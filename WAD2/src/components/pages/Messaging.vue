<template>
    <div class="chat-container">
      <div class="messages">
        <div v-for="message in messages" :key="message.id" class="message">
          <p>{{ message.user }}: {{ message.text }}</p>
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input v-model="newMessage" placeholder="Type your message" />
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newMessage: '',
        messages: []
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim() !== '') {
          // Push the message to your backend or database
          this.messages.push({
            id: Date.now(),
            user: 'You', // Replace with actual user
            text: this.newMessage
          });
  
          // After sending the message, clear the input
          this.newMessage = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 400px;
    padding: 10px;
    background-color: #181c14;
    color: white;
    height: 10vh;
  }
  .messages {
    flex-grow: 1;
    overflow-y: auto;
  }
  .message {
    padding: 5px;
    margin-bottom: 5px;
  }
  form {
    display: flex;
  }
  input {
    flex-grow: 1;
    padding: 5px;
  }
  button {
    margin-left: 10px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #ecdfcc;
    color: #3c3d37;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  
  