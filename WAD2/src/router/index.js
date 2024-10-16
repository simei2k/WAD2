import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '../components/pages/Home.vue'
import Shop from '../components/pages/Shop.vue'
import Chat from '../components/pages/Chat.vue'
import Profile from '../components/pages/Profile.vue'
import Services from '../components/pages/Services.vue'
import Emergency from '../components/pages/Emergency.vue'
import Map from '../components/pages/map.vue'
import login from '../components/pages/LogIn.vue'
import register from '../components/pages/GettingStartedPg1.vue'


const routes =[
    {
        path: '/home',
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
    ]
  
const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router