<template>
  <div class="chat-view">
    <div class="chat-header">
      <h3>{{ selectedChat.name }}</h3>
    </div>
    <div class="chat-messages">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.uid === currentUser ? 'outgoing' : 'incoming']"
      >
        <p class="message-content">{{ message.text }}</p>
        <span class="message-time">{{ message.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
      </div>
    </div>
    <div class="chat-input">
      <input v-model="newMessage" placeholder="Type a message" @keyup.enter="sendMessage" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import db from '../../../database'; // Your Firebase Firestore instance
import { auth } from '../../../firebase'; // Firebase Authentication instance

export default {
  props: ['selectedChat'],
  setup(props) {
    const messages = ref([]);
    const newMessage = ref('');
    const currentUser = auth.currentUser?.uid; // Current logged-in user's UID

    // Watch for changes in selectedChat to update the messages
    watch(
      () => props.selectedChat,
      (newChat) => {
        if (newChat) {
          const messagesCollection = collection(db, `chats/${newChat.id}/messages`);
          const messagesQuery = query(messagesCollection, orderBy('createdAt'));

          // Real-time Firestore listener for the selected chat
          onSnapshot(messagesQuery, (snapshot) => {
            messages.value = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
          });
        }
      },
      { immediate: true } // Execute the watcher immediately on mount
    );

    // Function to send message to Firestore
    const sendMessage = async () => {
      if (newMessage.value.trim() && props.selectedChat) {
        try {
          // Add the message to the messages subcollection
          const messageData = {
            text: newMessage.value,
            uid: auth.currentUser.uid, // Sender's UID
            createdAt: serverTimestamp(), // Firestore timestamp
          };

          await addDoc(collection(db, `chats/${props.selectedChat.id}/messages`), messageData);

          // Update the chat document with the last message and its timestamp
          await updateDoc(doc(db, 'chats', props.selectedChat.id), {
            lastMessage: newMessage.value,
            lastMessageTime: serverTimestamp(),
          });

          newMessage.value = ''; // Clear the input field after sending the message
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }
    };

    return { messages, newMessage, currentUser, sendMessage };
  },
};
</script>
  
  
  <style scoped>
body, html {
  overflow-x: hidden; /* Prevent horizontal scroll */
  margin: 0; /* Ensure no margin causes overflow */
  padding: 0; /* Remove any padding causing overflow */
}

/* Optionally add this for specific containers */
.chat-view {
  width: 100%; /* Ensure the container does not exceed the width */
  box-sizing: border-box; /* Include padding and border in width calculations */
}
.chat-header {
  background-color: #697565;
  color: #ECDFCC;
  padding: 10px;
  text-align: center;
}

.chat-messages {
  overflow-y: auto;
  padding: 10px;
  width: 100%;
}

.message {
  width: 100%; /* Allow the message box to take full available width */
  max-width: 70%; /* Limit the width for readability */
  padding: 10px;
  margin: 5px 0;
  border-radius: 10px;
  flex-grow: 1;
  position: relative;
  word-wrap: break-word; /* Allow words to break */
  overflow-wrap: break-word; /* Ensure long words break */
  white-space: normal; /* Ensure wrapping within the container */
}

.incoming {
  background-color: #3C3D37;
  color: #ECDFCC;
  margin-right: auto;
  border-top-left-radius: 0;
}

.outgoing {
  background-color: #ECDFCC;
  color: #3C3D37;
  margin-left: auto;
  border-top-right-radius: 0;
}

.message-content {
  margin: 0;
  width: 90%;
  word-wrap: break-word; /* Allow message content to break */
  overflow-wrap: break-word; /* Ensure the content wraps correctly */
  white-space: normal; /* Ensure the text wraps within the content */
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
  