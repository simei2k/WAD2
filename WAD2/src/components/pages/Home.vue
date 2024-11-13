<template>
  <div class="video-background">
    <video autoplay muted loop class="background-video">
      <source src="/img/dog_video.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <div class="main-container">
    <h1>Welcome to PawPal!</h1>
    <p id="desc">Your one-stop solution for all things related to your furry pals!</p>

    <div class="card-deck">
      <div class="card col-lg-3 col-md-2">
        <div class="card-content">
          <h3 class="card-title">Services</h3>
          <p class="card-description">
            Looking for pet sitter/walker jobs? Check out our <span>services</span> page to post your jobs!
          </p>
          <button @click="navServices" class="card-button">Go to Services</button>
        </div>
      </div>

      <div class="card col-lg-3 col-md-2">
        <div class="card-content">
          <h3 class="card-title">Map</h3>
          <p class="card-description">
            Looking for pet resources or nearby veterinarian clinics? Use the <span>map</span> to find pet stores near you!
          </p>
          <button @click="navMap" class="card-button">Go to Map</button>
        </div>
      </div>

      <div class="card col-lg-3 col-md-2">
        <div class="card-content">
          <h3 class="card-title">Shop</h3>
          <p class="card-description">
            Need something for your furry pals urgently? Find everything your furry pals need on the <span>shop</span> page!
          </p>
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
/* Video Background */
.video-background {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* z-index: -1; */
}

.background-video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  z-index: 1;
}

/* Main Container */
.main-container {
  text-align: center;
  color: #3c3d37;
  padding: 50px;
  position: relative; 
  z-index: 1;
  /* background-color: rgba(236, 223, 204, 0.9); I commented this line out for the vid*/
}

#desc{
  color: #ff9f48;
  font-size: 24px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

h1 {
  margin-bottom: 0.5rem;
  font-size: 60px;
  text-align: center;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
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
  color: #7c321b;
  font-size: medium;
}

.card-deck {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}

.card-button {
  border-radius: 5px;
  align-self: start;
}

.card {
  margin: 10px;
  flex: 1 0 auto;
}
</style>
