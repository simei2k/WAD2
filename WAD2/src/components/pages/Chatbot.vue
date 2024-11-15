<template>
  <div id="app">
    <div class="chatbot">
      <h1>Chatbot</h1>
      <div class="chat-area">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <span :class="message.role">{{ message.text }}</span>
        </div>
      </div>
    </div>
    <div class="question-input">
        <input
          v-model="newQuestion"
          @keyup.enter="askQuestion"
          placeholder="Ask a pet-related question..."
        />
      </div>
  </div>
</template>

<script>
import axios from "axios";
import OpenAI from "openai";
import { useToast } from "vue-toastification";
const OpenAI_KEY = import.meta.env.VITE_OPENAI_KEY;

export default {
  data() {
    return {
      messages: [],
      newQuestion: "", // Holds the user's new question
      toast: useToast()
    };
  },
  methods: {
    // Ask the question directly if it is pet-related
    async askQuestion() {
      // Check if the question contains pet-related keywords
      const petKeywords = ["pet", "dog", "cat", "animal", "fish", "bird", "reptile", "lizard", "snake"];
      const isPetRelated = petKeywords.some(keyword =>
        this.newQuestion.toLowerCase().includes(keyword)
      );

      if (isPetRelated) {
        // Add the user's question to the messages
        this.messages.push({ role: "user", text: this.newQuestion });

        // Store and clear the input field
        const question = this.newQuestion;
        this.newQuestion = "";

        // Call the OpenAI API
        try {
          const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: question }],
            },
            {
              headers: {
                Authorization: `Bearer ${OpenAI_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );

          // Add the chatbot's response to the messages
          const reply = response.data?.choices?.[0]?.message?.content || "Sorry, an error occurred.";
          this.messages.push({ role: "bot", text: reply });
        } catch (error) {
          console.error("API error:", error);
          this.messages.push({ role: "bot", text: "Sorry, an error occurred." });
        }
      } else {
          this.toast.warning("Please enter a pet-related question.", {
          position: "top-right",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
});
      }
    },
  },
};
</script>

<style>
.chatbot {
  flex-grow: 1;
  background-color: inherit;
  color: white;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.questions {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin-bottom: 1em;
}

.questions button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5em;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.questions button:hover {
  background: #0056b3;
}

.question-input {
  display: flex;
  flex: 1;
  padding: 10px;
  border: 1px solid #ffcf72;
  border-radius: 5px;
  background-color: transparent;
  color: #545454;
  margin-bottom: 0;
}

.question-input input {
  flex: 1;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.chat-area {
  border: 1px solid #ddd;
  padding: 1em;
  border-radius: 8px;
  min-height: 500px;
  background: #f9f9f9;
  box-sizing: border-box;
}

.message {
  margin: 0.5em 0;
}

.message .user {
  color: blue;
  font-weight: bold;
}

.message .bot {
  color: green;
  font-style: italic;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  #app {
    max-width: 90%;
  }

  .chatbot {
    padding: 1em;
  }
}

@media (max-width: 768px) {
  #app {
    max-width: 100%;
    padding: 0.5em;
  }

  .chatbot {
    padding: 0.8em;
  }

  .question-input input {
    padding: 0.4em;
  }

  .questions button {
    padding: 0.4em;
  }

  .chat-area {
    min-height: 150px;
    padding: 0.8em;
  }
}

@media (max-width: 480px) {
  .chatbot {
    padding: 0.5em;
  }

  h1 {
    font-size: 1.2em;
  }

  .question-input input {
    padding: 0.3em;
    font-size: 0.9em;
  }

  .questions button {
    padding: 0.3em;
    font-size: 0.9em;
  }

  .chat-area {
    min-height: 120px;
    padding: 0.6em;
  }

  .message .user, .message .bot {
    font-size: 0.9em;
  }
}
</style>
