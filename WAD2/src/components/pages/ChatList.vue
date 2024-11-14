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
        <h4 class="chat-name">{{ chat.name }}</h4>
        <p class="last-message">{{ chat.lastMessage }}</p>
      </div>
      <span class="chat-time">{{ formatTime(chat.lastMessageTime) }}</span>
    </div>
  </div>
</template>

<script>
import db from "../../../database"
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

export default {
  data() {
    return {
      chats: [],
    };
  },
  created() {
    this.getChatsFromDatabase();
  },
  methods: {
    getChatsFromDatabase() {
      const chatColRef = collection(db, 'chats');
      const chatQuery = query(chatColRef, orderBy('lastMessageTime', 'desc'));

      onSnapshot(chatQuery, (snapshot) => {
        this.chats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    },

    selectChat(chat) {
      this.$emit('chatSelected', chat);
    },
    formatTime(timestamp) {
      return timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
  border-bottom: 1px solid #7c321b;
  cursor: pointer;
  width: 100%; /* Make sure the chat-item takes full available width */
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.chat-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: calc(100% - 60px); /* Ensure space for the avatar */
  overflow: hidden;
}
.chat-name{
  color: #545454;
}

.last-message {
  color: #545454;
  font-size: 0.9rem;
  word-wrap: break-word; /* Ensure the text wraps when needed */
  overflow-wrap: break-word; /* Same as word-wrap */
  white-space: normal; /* Allow text to wrap */
  display: block;
}

.chat-time {
  font-size: 0.8rem;
  color: #888;
  margin-left: 10px;
}

</style>
