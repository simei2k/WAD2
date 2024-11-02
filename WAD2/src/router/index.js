import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '../components/pages/Home.vue'
import Shop from '../components/pages/Shop.vue'
import Chat from '../components/pages/Chat.vue'
import Profile from '../components/pages/Profile.vue'
import Services from '../components/pages/Services.vue'
import Emergency from '../components/pages/Emergency.vue'
import Map from '../components/pages/Map.vue'
import login from '../components/pages/LogIn.vue'
import register from '../components/pages/register.vue'
import GettingStartedPetOwnerPg1 from '../components/pages/GettingStartedPetOwnerPg1.vue'
import GettingStartedServiceProviderPg1 from '../components/pages/GettingStartedServiceProviderPg1.vue'
import GettingStartedServiceProviderPg2 from '../components/pages/GettingStartedServiceProviderPg2.vue'
import GettingStartedServiceProviderPg3 from '../components/pages/GettingStartedServiceProviderPg3.vue'


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

      {
        path: '/GettingStartedPetOwnerPg1', 
        name: 'GettingStartedPetOwnerPg1',
        component: GettingStartedPetOwnerPg1
      },
      {
        path: '/GettingStartedServiceProviderPg1', 
        name: 'GettingStartedServiceProviderPg1',
        component: GettingStartedServiceProviderPg1
      },
      {
        path: '/GettingStartedServiceProviderPg2', 
        name: 'GettingStartedServiceProviderPg2',
        component: GettingStartedServiceProviderPg2
      },
      {
        path: '/GettingStartedServiceProviderPg3', 
        name: 'GettingStartedServiceProviderPg3',
        component: GettingStartedServiceProviderPg3
      },
       {
        path: '/GettingStartedServiceProviderPg3', 
        name: 'GettingStartedServiceProviderPg3',
        component: GettingStartedServiceProviderPg3
      },
    ]
  
const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router