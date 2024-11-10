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
        <span class="chat-time">{{ formatTime(chat.lastMessageTime) }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import db from "../../../database"
  import { collection, query, onSnapshot,orderBy } from 'firebase/firestore';

  export default {
    data() {
      return {
        
        chats: [
        ],
      };
    },
    created() {
      this.getChatsFromDatabase();
    },
   
    methods: {
      //getting messagings from the database
      getChatsFromDatabase() {
      const chatColRef = collection(db, 'chats');
      const chatQuery = query(chatColRef, orderBy('lastMessageTime', 'desc')); // Order by lastMessageTime

      // Real-time Firestore listener
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
  