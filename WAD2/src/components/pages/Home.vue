<template>
    <div class="main-container">
      <h1>Welcome to PawPal!</h1>
      <p>Your one-stop solution for all things related to your furry pals!</p>

      <div class="card-container">
      <div class="card col-lg-3">
        <!-- Card Image -->
        <!-- <img src="https://via.placeholder.com/300x180" alt="Sample Image" class="card-image"> -->

        <!-- Card Content -->
        <div class="card-content">
            <h3 class="card-title">Services</h3>
            <p class="card-description">
                Looking for pet sitter/walker jobs? Check out our <span>services</span> page to post your jobs!
            </p>

        <!-- Card Button -->
        <button @click="navServices" class="card-button">Go to Services</button>
        </div>
      </div>

      <div class="card col-lg-3">
        <!-- Card Image -->
        <!-- <img src="https://via.placeholder.com/300x180" alt="Sample Image" class="card-image"> -->

        <!-- Card Content -->
        <div class="card-content">
            <h3 class="card-title">Map</h3>
            <p class="card-description">
                Looking for pet resources or nearby veterinarian clinics? Use the <span>map</span> to find pet stores nearest to you!
            </p>

        <!-- Card Button -->
        <button @click="navMap" class="card-button">Go to Map</button>
        </div>
      </div>

      <div class="card col-lg-3">
        <!-- Card Image -->
        <!-- <img src="https://via.placeholder.com/300x180" alt="Sample Image" class="card-image"> -->

        <!-- Card Content -->
        <div class="card-content">
            <h3 class="card-title">Shop</h3>
            <p class="card-description">
                Need something for your furry pals urgently? Find everything your furry pals need on the <span>shop</span> page!
            </p>

        <!-- Card Button -->
        <button @click="navShop" class="card-button">Go to Shop</button>
        </div>
      </div>
    </div>

    </div>
  </template>

<script>
    export default {
    methods: {
        navServices() {
        this.$router.push('/services'); // Navigate by route name
        },
        navMap() {
        this.$router.push('/map'); // Navigate by path
        },
        navShop() {
        this.$router.push('/shop'); // Navigate by path
        },
    },
    };
</script>
  
  <style scoped>
  .main-container {
    text-align: center;
    color: #3c3d37;
    padding: 50px;
    background-color: #ECDFCC;
  }
  
  h1 {
    margin-bottom: 0.5rem;
    font-size: 60px;
    text-align: center;
  }

  p {
    margin-bottom: 2rem;
    font-size: 1.1rem;
    text-align: center;
  }

  .card-title {
    font-size: xx-large;
  }

  .card-description {
    color:#ECDFCC;
    font-size: medium;
  }

  .card-container {
    display: flex;
    height: auto
  }

  .card-button {
    border-radius: 5px;
  } 

  .card {
    margin: auto;
    justify-content: center;
    height: auto;
  }

  </style>
  