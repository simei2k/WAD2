<script>
import { createMemoryHistory, createRouter, RouterLink } from 'vue-router'

export default {
    name: 'NavBar',
    methods: {
        navigateToHome() {
            this.$router.push({ name: 'home' });
        }
    }
}
</script>

<template>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet"> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">    
    <nav class="navbar navbar-expand-sm sticky-top">
        <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="#">
        <img src="../assets/cat_icon.png" width="50" height="50" class="d-inline-block align-top" alt="">        
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
                <div class="button"><RouterLink to="/login" class="nav-link">Log In</RouterLink> </div>          
            </li>
            <li class="nav-item">
                <div class="button"><RouterLink to="/register" class="nav-link">Register</RouterLink> </div>          
            </li>
            </ul>
        </div>
    </div>
    <hr>
    </nav>
   




</template>
<style>
nav{
    margin: 5px;
    border-bottom: solid #697565;
    border-width: calc(2px + .1vw);
    background-color: black;
    }

.navbar-brand {
  font-weight: bold;
  color: #ecdfcc; /* Pale text color for the brand name */
}
.navbar {
  border-bottom: solid #697565;
  border-width: calc(2px + .1vw);
  background-color: black;
}
li{
    margin: 10px;
}
nav .navbar-nav li a{
  color: #ecdfcc !important;
  }

.nav-link{
    color: #ecdfcc !important;
}  



</style>
