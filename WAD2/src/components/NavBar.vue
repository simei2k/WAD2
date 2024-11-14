<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container-fluid d-flex align-items-center">
        <!-- Logo link to the home page -->
        <router-link class="navbar-brand" to="/">
            <img src="../assets/cat_icon_2.png" width="50" height="50" class="d-inline-block align-top" alt="">
        </router-link>
        <span class="ms-2" style="color:#ecdfcc">
            <RouterLink to="/" class="nav-link">PawPal</RouterLink>
        </span>
   
   
        <!-- Navbar toggler for mobile view -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
   
   
        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="navbarNav">
   
          <ul class="navbar-nav ms-auto align-items-center">
            <!-- Profile link -->
            <li v-if="uid"  class="nav-item my-2 my-lg-0 mx-2">
              <router-link class="nav-link d-flex align-items-center" to="/profile">
                Profile
              </router-link>
            </li>
            <!-- Services link -->
            <li class="nav-item my-2 my-lg-0 mx-2">
              <router-link class="nav-link d-flex align-items-center" to="/services">
                Services
              </router-link>
            </li>
            <!-- Map link -->
            <li class="nav-item my-2 my-lg-0 mx-2">
              <router-link class="nav-link d-flex align-items-center" to="/map">
                Map
              </router-link>
            </li>
            <!-- Chatbot link -->
            <li class="nav-item my-2 my-lg-0 mx-2">
              <router-link class="nav-link d-flex align-items-center" to="/chat">
                Chatbot
              </router-link>
            </li>
            <!-- Shop link -->
            <li class="nav-item my-2 my-lg-0 mx-2">
              <router-link class="nav-link d-flex align-items-center" to="/shop">
                Shop
              </router-link>
            </li>
            <!-- Messaging link -->
            <li v-if="uid" class="nav-item my-2 my-lg-0 mx-2">
              <router-link class="nav-link d-flex align-items-center" to="/messaging">
                Messaging
              </router-link>
            </li>
            <!-- Emeergency link -->
            <li  class="nav-item my-2 my-lg-0 mx-2">
              <router-link class="nav-link d-flex align-items-center" to="/emergency">
                Emergency
              </router-link>
            </li>
            <li v-if="!uid" class="nav-item my-2 my-lg-0 mx-2">
                <div class="button">
                    <router-link class="nav-link d-flex align-items-center" to="/login">
                    Log In
                    </router-link>
                </div>
            </li>
            <li v-if="!uid" class="nav-item my-2 my-lg-0 mx-2">
                <div class="button">
                    <router-link class="nav-link d-flex align-items-center" to="/register">
                    Register
                    </router-link>
                </div>
            </li>
            <li v-if="uid" class="nav-item my-2 my-lg-0 mx-2">
            <div class="button">
              <a class="nav-link d-flex align-items-center" @click.prevent="logout">Log Out</a>
            </div>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
   
<script>
 import { ref } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
   import { onAuthStateChanged } from 'firebase/auth';
   
   export default {
     name: 'NavBar',
   
     setup() {
       const uid = ref(null);
       const auth = getAuth()
   
       // Watch for auth state changes
       onAuthStateChanged(auth, (user) => {
         if (user) {
           uid.value = user.uid;
           console.log("I am logged in");
         } else {
           uid.value = null;
           console.log("No user logged in");
         }
       });
   
       // Return uid so it's available in the template
       return {
         uid
       };
     },
   
     data() {
       return {
         isMenuOpen: false,
         isMobileView: false,
       };
     },
   
     computed: {
       isLoggedIn() {
         return this.uid != null;
       }
     },
   
     methods: {
       navigateToHome() {
         this.$router.push({ name: 'home' });
       },
   
       toggleMenu() {
         this.isMenuOpen = !this.isMenuOpen;
       },
   
       closeMenu() {
         this.isMenuOpen = false;
       },
   
       handleResize() {
         // Toggle between mobile and desktop view based on window width
         this.isMobileView = window.innerWidth <= 768;
         if (!this.isMobileView) {
           this.isMenuOpen = false; // Close menu if switching to desktop view
         }
       },
   
       async logout() {
      try {
        const auth = getAuth();  // Initialize Firebase Auth
        await signOut(auth);
        this.$router.push({ name: 'home' }); // Redirect to login after logout
        console.log("I am logged out")
        localStorage.removeItem('name')
        localStorage.set
      } catch (error) {
        console.log("Logout failed:", error);
      }
    },
  },
     
   
     created() {
       this.handleResize(); // Check initial screen size
       window.addEventListener('resize', this.handleResize);
     },
   
     beforeUnmount() {
       window.removeEventListener('resize', this.handleResize);
     },
   };
</script>   
   
<style>
nav{
    border-width: calc(2px + .1vw);
    background-color: black;
}
.navbar-brand {
  font-weight: bold;
  color: #545454; /* Pale text color for the brand name */
}
.nav-item{
    border-radius: 15%;
}
.navbar {
  border-width: calc(2px + .1vw);
  background-color: #f2ebdd;
  padding-bottom: 10px;
}
.nav-item:hover{
    box-shadow: 0 0 11px rgba(33,33,33,.2); 
}
li{
    margin: 10px;
}
nav .navbar-nav li a{
  color: #545454 !important;
}

.nav-link{
    color: #545454 !important;
}  

.button {
    background-color: #e59551;
    padding-left: 5px;
    padding-right: 5px;
}

</style>