<template>
  <div class="chatbot">
    <div class="chat-window">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="message.user ? 'user' : 'bot'"
      >
        {{ message.text }}
      </div>
      <div v-if="isLoading" class="bot loading-indicator">
        typing...
      </div>
    </div>
    <div class="input-box">
      <input
        type="text"
        v-model="userMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
        :disabled="isLoading"
      />
      <button @click="sendMessage" :disabled="isLoading">
        Send
      </button>
    </div>
  </div>
</template>

<script>
import OpenAI from 'openai';
const OpenAI_KEY = import.meta.env.VITE_OPENAI_KEY;

const openai = new OpenAI({
  apiKey: OpenAI_KEY, // Replace with your actual API key in .env.local
  dangerouslyAllowBrowser: true,
});

export default {
  data() {
    return {
      userMessage: "",
      messages: [],
      conversation: [],
      isLoading: false,
    };
  },
  methods: {
    async sendMessage() {
      if (this.userMessage.trim() === "" || this.isLoading) return;

      const userMessageText = this.userMessage.trim();
      this.userMessage = "";

      this.messages.push({
        text: userMessageText,
        user: true
      });

      this.conversation.push({
        role: "user",
        content: userMessageText
      });

      this.isLoading = true;

      try {
        this.messages.push({
          text: "",
          user: false
        });

        const stream = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: this.conversation,
          stream: true,
        });

        let accumulatedResponse = "";

        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          accumulatedResponse += content;
          
          this.messages[this.messages.length - 1] = {
            text: accumulatedResponse,
            user: false
          };
        }

        this.conversation.push({
          role: "assistant",
          content: accumulatedResponse
        });

      } catch (error) {
        console.error("Error calling OpenAI:", error);
        this.messages.push({
          text: "Sorry, an error occurred. Please try again.",
          user: false
        });
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.chatbot {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  background-color: inherit;
  border-radius: 10px;
}

.chat-window {
  flex-grow: 1;
  background-color: inherit;
  color: white;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.user {
  align-self: flex-end;
  background-color: #fae1ae;
  color: #7c321b;
  border-radius: 10px 10px 0px 10px;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 70%;
  word-wrap: break-word;
  word-break: break-word;
}

.bot {
  align-self: flex-start;
  background-color: #ffcf72;
  color: #7c321b;
  border-radius: 10px 10px 10px 0px;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 70%;
  word-wrap: break-word;
  word-break: break-word;
}

.input-box {
  display: flex;
  padding: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ffcf72;
  border-radius: 5px;
  background-color: transparent;
  color: #545454;
}

input[type="text"]::placeholder {
  color: #545454;
  opacity: 0.7;
}

button {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #ecdfcc;
  color: #3c3d37;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.2s;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-indicator {
  font-style: italic;
  opacity: 0.8;
}
</style>
  
