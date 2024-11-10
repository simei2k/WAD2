import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import Home from '../components/pages/Home.vue'
import Shop from '../components/pages/Shop.vue'
import Chat from '../components/pages/Chatbot.vue'
import Profile from '../components/pages/Profile.vue'
import Services from '../components/pages/Services.vue'
import Emergency from '../components/pages/Emergency.vue'
import Messaging from '../components/pages/Messaging.vue'
import Map from '../components/pages/Map.vue'
import login from '../components/pages/LogIn.vue'
import register from '../components/pages/register.vue'
import GettingStartedPetOwner from '../components/pages/GettingStartedPetOwner.vue'
import GettingStartedServiceProvider from '../components/pages/GettingStartedServiceProvider.vue'



const routes =[
    {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/chat',
        name: 'chat',
        component: Chat
      },
    {
        path: '/shop',
        name: 'shop',
        component: Shop
      },
      {
        path: '/emergency',
        name: 'emergency',
        component: Emergency
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile
      },
      {
        path: '/services',
        name: 'services',
        component: Services
      },
      {
        path: '/map',
        name: 'map',
        component: Map
      },
      {
        path: '/login',
        name: 'login',
        component: login
      },
      {
        path: '/register',
        name: 'register',
        component: register
      },

      {
        path: '/GettingStartedPetOwner', 
        name: 'GettingStartedPetOwner',
        component: GettingStartedPetOwner
      },
      {
        path: '/GettingStartedServiceProvider', 
        name: 'GettingStartedServiceProvider',
        component: GettingStartedServiceProvider
      },
      {
        path: '/Messaging', 
        name: 'Messaging',
        component: Messaging
      },
    ]
  
const router = createRouter({
  history: createWebHistory(),

  routes,
})

export default router