<script>
import { ref } from 'vue';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default {
    name: 'NavBar',

    setup() {
        const uid = ref(null);

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

<template>
    <!-- Bootstrap CSS -->
     <head><meta name="viewport" content="width=device-width, initial-scale=1">
     </head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

        
    <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="#">
            <img src="../assets/cat_icon_2.png" width="50" height="50" class="d-inline-block align-top" alt="">        
            <span class="ms-2" style="color:#ecdfcc">
                <RouterLink to="/" class="nav-link">PawPal</RouterLink>
            </span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <RouterLink to="/profile" class="nav-link">Profile</RouterLink>            
                </li>
                <li class="nav-item">
                    <RouterLink to="/services" class="nav-link">Services</RouterLink>            
                </li>
                <li class="nav-item">
                    <RouterLink to="/map" class="nav-link">Map</RouterLink>            
                </li>
                <li class="nav-item">
                    <RouterLink to="/chat" class="nav-link">Chat</RouterLink>            
                </li>
                <li class="nav-item">
                    <RouterLink to="/shop" class="nav-link">Shop</RouterLink>            
                </li>
                <li class="nav-item">
                    <RouterLink to="/messaging" class="nav-link">Messaging</RouterLink>            
                </li>
                <li class="nav-item">
                    <RouterLink to="/emergency" class="nav-link">Emergency</RouterLink>            
                </li>
                <li class="nav-item">
                    <div class="button"><RouterLink to="/login" class="nav-link">Log In</RouterLink></div>          
                </li>
                <li class="nav-item">
                    <div class="button"><RouterLink to="/register" class="nav-link">Register</RouterLink></div>          
                </li>
                </ul>
            </div>
        </div>
        <hr>
    </nav>


<!-- testing for responsive navbar  -->
    <!-- <div class="navbar-burger"> -->
        <!-- Burger Menu Icon - visible only on small screens -->
        <!-- <button v-if="isMobileView" @click="toggleMenu" class="burger-menu">
            <span :class="{ 'active': isMenuOpen }"></span>
            <span :class="{ 'active': isMenuOpen }"></span>
            <span :class="{ 'active': isMenuOpen }"></span>
        </button>
    </div> -->

    <!-- Navigation Links for burger -->
    <!-- <div :class="['nav-links', { 'open': isMenuOpen && isMobileView }]">
        <router-link to="/" @click="closeMenu">Home</router-link>
        <router-link to="/profile" @click="closeMenu">Profile</router-link>
        <router-link to="/services" @click="closeMenu">Services</router-link>
        <router-link to="/map" @click="closeMenu">Map</router-link>
        <router-link to="/chat" @click="closeMenu">Chat</router-link>
        <router-link to="/shop" @click="closeMenu">Shop</router-link>
        <router-link to="/emergency" @click="closeMenu">Emergency</router-link>
    </div> -->


</template>

   


<style>
nav{
    margin: 5px;
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

/* @media (max-width: 768px) {
  .burger-menu { */
    /* display: flex; Show the burger menu icon on small screens */
  /* } */
  /* .nav-links { */
    /* display: none; Hide the normal navbar links */
    /* color: #ecdfcc !important; */
  /* } */
  /* .nav-links.open {
    display: flex; Display links as a dropdown when the menu is open
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 10px;
    background-color: #333;
    padding: 1rem;
    border-radius: 8px;
  } */
/* } */

</style>