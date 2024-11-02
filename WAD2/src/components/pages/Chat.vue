<template>
    <div class="chatbot">
      <div class="chat-window">
        <div v-for="(message, index) in messages" :key="index" :class="{'user': message.user, 'bot': !message.user}">
          {{ message.text }}
        </div>
      </div>
      <div class="input-box">
        <input type="text" v-model="userMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '../NavBar.vue'
  import axios from 'axios';

  export default {
    data() {
      return {
        userMessage: "",
        messages: []
      };
    },
    methods: {
    async sendMessage() {
      if (this.userMessage.trim() !== "") {
        this.messages.push({ text: this.userMessage, user: true });
        let response = await this.getBotResponse(this.userMessage);
        this.messages.push({ text: response, user: false });
        this.userMessage = "";
      }
    },
    async getBotResponse(userMessage) {
      try {
        let response = await axios.post("https://api.openai.com/v1/chat/completions", {
          model: "gpt-4",
          messages: [{ role: "user", content: userMessage }]
        }, {
          headers: {
            "Authorization": `Bearer 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`
          }
        });
        return response.data.choices[0].message.content;
      } catch (error) {
          console.error("Error getting response:", error);
        return "Sorry, I am having trouble responding.";
      }
    },
    autoResize(event) {
        const textarea = event.target;
        textarea.style.height = 'auto'; // Reset height to calculate the new height
        textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on content
    }
    }
  };
  </script>
  
  <style scoped>
  .chatbot {
    display: flex;
    flex-direction: column;
    height: 90vh;
    justify-content: space-between;
    background-color: #181c14;
  }
  .chat-window {
    flex-grow: 1;
    background-color: #181c14;
    color: white;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    }
    .user {
    align-self: flex-end;
    background-color: #ecdfcc;
    color: #3c3d37;
    border-radius: 10px 10px 0px 10px;
    padding: 10px;
    margin-bottom: 10px;
    max-width: 70%; /* Max width of 70% of the screen */
    word-wrap: break-word; /* Wrap text to the next line if it's too long */
    word-break: break-word; /* Break long words */
    }
/* Bot messages aligned to the left */
    .bot {
    align-self: flex-start;
    background-color: #ecdfcc;
    color: #3c3d37;
    border-radius: 10px 10px 10px 0px;
    padding: 10px;
    margin-bottom: 10px;
    max-width: 70%; /* Max width of 70% of the screen */
    word-wrap: break-word; /* Wrap text */
    word-break: break-word; /* Break long words */
    }
  .input-box {
    display: flex;
    padding: 20px;
    background-color: #181c14;
  }
  input[type="text"] {
    flex: 1;
    padding: 10px;
    border: 1px solid #ecdfcc;
    border-radius: 5px;
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
  
 
  
