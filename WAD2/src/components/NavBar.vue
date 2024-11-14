<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div class="container-fluid d-flex align-items-center">
          <!-- Logo link to the home page -->
          <router-link class="navbar-brand" to="/">
              <img src="../assets/cat_icon_2.png" width="50" height="50" class="d-inline-block align-top" alt="">
          </router-link>
          <span class="ms-2 site-title">
              <router-link to="/" class="nav-link">PawPal</router-link>
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
                  <li v-if="uid" class="nav-item mx-2">
                      <router-link class="nav-link" to="/profile">Profile</router-link>
                  </li>
                  <!-- Services link -->
                  <li class="nav-item mx-2">
                      <router-link class="nav-link" to="/services">Services</router-link>
                  </li>
                  <!-- Map link -->
                  <li class="nav-item mx-2">
                      <router-link class="nav-link" to="/map">Map</router-link>
                  </li>
                  <!-- Chatbot link -->
                  <li class="nav-item mx-2">
                      <router-link class="nav-link" to="/chat">Chatbot</router-link>
                  </li>
                  <!-- Shop link -->
                  <li class="nav-item mx-2">
                      <router-link class="nav-link" to="/shop">Shop</router-link>
                  </li>
                  <!-- Messaging link -->
                  <li v-if="uid" class="nav-item mx-2">
                      <router-link class="nav-link" to="/messaging">Messaging</router-link>
                  </li>
                  <!-- Emergency link -->
                  <li class="nav-item mx-2">
                      <router-link class="nav-link" to="/emergency">Emergency</router-link>
                  </li>
                  <!-- Auth links -->
                  <li v-if="!uid" class="nav-item mx-2">
                      <router-link class="btn btn-auth" to="/login">Log In</router-link>
                  </li>
                  <li v-if="!uid" class="nav-item mx-2">
                      <router-link class="btn btn-auth" to="/register">Register</router-link>
                  </li>
                  <li v-if="uid" class="nav-item mx-2">
                      <a class="btn btn-auth" @click.prevent="logout">Log Out</a>
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
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
          if (user) {
              uid.value = user.uid;
              console.log("I am logged in");
          } else {
              uid.value = null;
              console.log("No user logged in");
          }
      });

      return {
          uid
      };
  },
  methods: {
      async logout() {
          try {
              const auth = getAuth();
              await signOut(auth);
              this.$router.push({ name: 'home' });
              console.log("I am logged out");
          } catch (error) {
              console.log("Logout failed:", error);
          }
      },
  }
};
</script>

<style>
/* Navbar fixed to the top */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #f2ebdd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1030; /* Ensure navbar is above other elements */
}

.site-title {
  color: #ecdfcc;
  font-weight: bold;
  font-size: 1.2em;
}

.nav-item {
  border-radius: 10px;
  transition: all 0.3s ease;
}

.nav-item:hover {
  box-shadow: 0 4px 8px rgba(33, 33, 33, 0.2);
}

/* Link colors */
.nav-link {
  color: #545454 !important;
}

.navbar-brand {
  font-weight: bold;
  color: #545454;
}

/* Auth buttons for login/register */
.btn-auth {
  background-color: #e59551 !important;
  color: white !important;
  border-radius: 20px;
  padding: 6px 16px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  text-align: center;
}

.btn-auth:hover {
  background-color: #d48441;
}

/* Additional spacing for items */
li {
  margin: 0 10px;
}

/* Adjust navbar padding */
.navbar {
  padding: 10px 20px;
}
</style>
