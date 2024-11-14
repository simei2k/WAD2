<template>
  <div class="home">
      <!-- Video Background and Hero Content -->
      <div class="hero-section">
          <div class="video-background">
              <video autoplay muted loop class="background-video">
                  <source src="/img/dog_video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
          </div>

          <div class="hero-content">
              <h1 class="hero-title">Welcome to PawPal!</h1>
              <p id="desc" class="hero-subtitle">
                  Your one-stop solution for all things related to your furry
                  pals!
              </p>
          </div>
      </div>

      <!-- Cards Section -->
      <div class="cards-section z-3">
          <div class="card-deck">
              <div class="card col-lg-3 col-md-2">
                  <div class="card-content">
                      <h3 class="card-title">Services</h3>
                      <p class="card-description">
                          Looking for pet sitter/walker jobs? Check out our
                          <span>services</span> page to post your jobs!
                      </p>
                      <button @click="navServices" class="card-button">
                          Go to Services
                      </button>
                  </div>
              </div>

              <div class="card col-lg-3 col-md-2">
                  <div class="card-content">
                      <h3 class="card-title">Map</h3>
                      <p class="card-description">
                          Looking for nearby dog runs to bring your dog to?
                          Use the <span>map</span> to find parks
                          near you!
                      </p>
                      <button @click="navMap" class="card-button">
                          Go to Map
                      </button>
                  </div>
              </div>

              <div class="card col-lg-3 col-md-2">
                  <div class="card-content">
                      <h3 class="card-title">Shop</h3>
                      <p class="card-description">
                          Need something for your furry pals urgently? Find
                          everything your furry pals need on the
                          <span>shop</span> page!
                      </p>
                      <button @click="navShop" class="card-button">
                          Go to Shop
                      </button>
                  </div>
              </div>
          </div>
      </div>

      <!-- About Us Section -->
      <div class="about-section">
          <h2 class="about-title">About Us</h2>
          <p class="about-description">
              PawPal is dedicated to helping pet owners and pet lovers alike.
              Our mission is to provide a one-stop solution for everything
              related to your furry friends. From finding reliable pet sitters
              and walkers to discovering nearby pet stores and veterinary
              clinics, we’re here to support the well-being of your pets.
          </p>
          <div class="about-content">
              <div class="about-box">
                  <h3>Our Mission</h3>
                  <p>
                      To create a safe and reliable platform for pet owners to
                      find trusted services, resources, and products for their
                      beloved pets.
                  </p>
              </div>
              <div class="about-box">
                  <h3>Our Vision</h3>
                  <p>
                      To become the go-to platform for all pet-related needs,
                      fostering a caring and connected pet community
                      worldwide.
                  </p>
              </div>
              <div class="about-box">
                  <h3>Our Values</h3>
                  <p>
                      We value trust, compassion, and community. Our goal is
                      to provide pet owners with the resources they need to
                      ensure their pets lead happy, healthy lives.
                  </p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
      navServices() {
          this.$router.push('/services');
      },
      navMap() {
          this.$router.push('/map');
      },
      navShop() {
          this.$router.push('/shop');
      },
  },
};
</script>

<style scoped>
.home {
  background-color: #f9f9f9;
}
/* Video Background */
.video-background {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
  z-index: -1;
}

/* Hero Section Content */
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f9f9f9;
  z-index: 1;
}

.hero-content {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1;
}

.hero-title {
  font-size: 60px;
  font-weight: bold;
  text-shadow: rgba(0, 0, 0, 0.4) 0px 1px 5px, rgba(0, 0, 0, 0.5) 0px 4px 60px;
  animation: zoom-in 1s ease-in-out;
  margin: 0;
}

.hero-subtitle {
  color: #ff9f48;
  font-size: 18px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  animation: fade-in 2s ease-in-out;
  margin-top: 10px;
}

/* Cards Section */
.cards-section {
  padding: 50px;
  background-color: #f9f9f9;
  text-align: center;
}

.card-deck {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
}

.card {
  margin: 10px;
  flex: 1 0 auto;
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px; /* Fixed width to make cards more uniform */
}

.card-title {
  font-size: xx-large;
  animation: bounce 2s ease-in-out;
}

.card-description {
  color: #7c321b;
  font-size: medium;
}

.card-button {
  border-radius: 5px;
  background: linear-gradient(90deg,  #ffce6d, #f29040);
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  animation: pulse 2s infinite;
  font-size: 1rem;
}

.about-section {
  background-color: #fff1e0;
  padding: 50px;
  text-align: center;
  color: #333;
  animation: slide-in-left 1s ease-in-out;
}

.about-title {
  font-size: 2.5rem;
  color: #3c3d37;
  margin-bottom: 1rem;
}

.about-description {
  font-size: 1.2rem;
  color: #7c321b;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.about-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.about-box {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  text-align: center;
}

.about-box h3 {
  font-size: 1.5rem;
  color: #ff9f48;
  margin-bottom: 0.5rem;
}

.about-box p {
  font-size: 1rem;
  color: #333;
}

/* Slide-in Animation */
@keyframes slide-in-left {
  0% {
      transform: translateX(-100%);
      opacity: 0;
  }
  100% {
      transform: translateX(0);
      opacity: 1;
  }
}

/* Animations */
@keyframes slide-right {
  0% {
      transform: translateX(-100%);
  }
  100% {
      transform: translateX(0);
  }
}

@keyframes fade-in {
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
}

@keyframes zoom-in {
  0% {
      transform: scale(0.5);
      opacity: 0;
  }
  100% {
      transform: scale(1);
      opacity: 1;
  }
}

@keyframes pulse {
  0% {
      transform: scale(1);
  }
  50% {
      transform: scale(1.1);
  }
  100% {
      transform: scale(1);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
      transform: translateY(0);
  }
  40% {
      transform: translateY(-30px);
  }
  60% {
      transform: translateY(-15px);
  }
}
</style>
