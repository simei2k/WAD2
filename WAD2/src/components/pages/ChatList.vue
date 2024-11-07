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
  import db from "../../../database"
  import { collection, getDocs } from 'firebase/firestore';

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
       getChatsFromDatabase() {
        const chatColRef = collection(db, 'chats')
        getDocs(chatColRef)
        .then((snapshot)=>{
          let chats = []
          snapshot.docs.forEach((doc)=>{
            chats.push({...doc.data(),id:doc.id})
          })
          this.chats = chats;
          console.log(chats)
          
        })    
      
    },
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
  