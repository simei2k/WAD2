<template>
  <div>
    <!-- Main Layout -->
    <div class="layout">
      <!-- Left Column (Map) -->
      <div class="map-container">
        <section id="map" ref="map"></section>
      </div>

      <!-- Right Column (Search + Results) -->
      <div class="input-container">
        <form class="ui segment large form">
          <div class="ui message red" v-show="error">{{ error }}</div>
          <div class="ui segment">
            <h2 style="color: #697565">Key In Your Location</h2>
            <div class="field">
              <div class="ui right icon input large" :class="{ loading: spinner }">
                <input
                  type="text"
                  placeholder="Enter your address"
                  v-model="address"
                  ref="autocomplete"
                />
                <i class="dot circle link icon" @click="locatorButtonPressed"></i>
              </div>
            </div>
            <button class="ui button" @click.prevent="findBestDogRuns">Go</button>
          </div>
        </form>

        <!-- Aesthetic List for Recommended Dog Runs -->
        <section class="ui segment">
          <h2 class="ui header">Top 5 Recommended Dog Runs</h2>
          <h5 style="color: #697565;">Based on your location and weather forecast, here are the top 5 recommended Dog Runs</h5>
          <div class="recommended-list">
            <div
              class="recommended-item"
              v-for="(dogRun, index) in topDogRuns"
              :key="index"
            >
              <!-- <div class="recommended-image">
                <img
                  :src="`../../assets/dogrun_${index + 1}.png`"
                  alt="Dog Run"
                  class="ui small image"
                />
              </div> -->
              <div class="recommended-details">
                <h5>{{ dogRun.name }}</h5>
                <p>{{ dogRun.weather }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      address: "",
      error: "",
      spinner: false,
      userLocation: null,
      map: null,
      userMarker: null, // Holds the user's marker
      topDogRuns: [],
      dogRuns: [
        { name: "West Coast Park Dog Run", lat: 1.302750, lng: 103.763250 },
        { name: "Bishan-Ang Mo Kio Park Dog Run", lat: 1.365000, lng: 103.846000 },
        { name: "East Coast Park Dog Run", lat: 1.303000, lng: 103.922800 },
        { name: "Sembawang Park Dog Run", lat: 1.458000, lng: 103.824000 },
        { name: "Jurong Lake Gardens Dog Run", lat: 1.340500, lng: 103.724000 },
        { name: "Tampines Eco Green Dog Run", lat: 1.358000, lng: 103.940000 },
        { name: "HortPark Dog Run", lat: 1.281000, lng: 103.803000 },
        { name: "Pasir Ris Park Dog Run", lat: 1.383000, lng: 103.947000 },
        { name: "Yishun Park Dog Run", lat: 1.431000, lng: 103.840000 },
        { name: "Punggol Waterway Park Dog Run", lat: 1.403000, lng: 103.902000 },
      ],
    };
  },
  mounted() {
    this.initMap();
    this.initAutocomplete();
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(this.$refs.map, {
        zoom: 12,
        center: { lat: 1.3521, lng: 103.8198 }, // Default Singapore center
        mapTypeId: "roadmap",
      });
    },
    initAutocomplete() {
      const autocomplete = new google.maps.places.Autocomplete(
        this.$refs.autocomplete
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          this.userLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          this.map.setCenter(this.userLocation); // Center the map
        }
      });
    },
    async findBestDogRuns() {
      if (!this.userLocation) {
        this.error = "Please provide your location using the search bar.";
        return;
      }

      // Add or update marker at the searched location
      if (this.userMarker) {
        this.userMarker.setPosition(this.userLocation); // Update marker
      } else {
        this.userMarker = new google.maps.Marker({
          position: this.userLocation,
          map: this.map,
          title: "Your Location",
        });
      }

      const weatherUrl = "https://api.open-meteo.com/v1/forecast";
      const dogRunData = await Promise.all(
        this.dogRuns.map(async (dogRun) => {
          const weatherResponse = await axios.get(weatherUrl, {
            params: {
              latitude: dogRun.lat,
              longitude: dogRun.lng,
              current_weather: true,
            },
          });
          const weather = weatherResponse.data.current_weather;

          const temperature = weather.temperature;
          const weatherCode = weather.weathercode;

          let weatherFactor = 0;
          if (temperature >= 20 && temperature <= 30 && weatherCode === 0) {
            weatherFactor = 1.5;
          } else if (temperature >= 15 && temperature <= 35 && weatherCode <= 2) {
            weatherFactor = 1.0;
          } else {
            weatherFactor = -1.0;
          }

          const distance = this.calculateDistance(
            this.userLocation.lat,
            this.userLocation.lng,
            dogRun.lat,
            dogRun.lng
          );

          const score = (1 / distance) + weatherFactor;

          return {
            ...dogRun,
            weather: `${temperature}°C, ${this.getWeatherDescription(
              weatherCode
            )}`,
            distance,
            score,
          };
        })
      );

      this.topDogRuns = dogRunData.sort((a, b) => b.score - a.score).slice(0, 5);
    },
    calculateDistance(lat1, lng1, lat2, lng2) {
      const toRad = (value) => (value * Math.PI) / 180;
      const R = 6371; // Earth's radius in km
      const dLat = toRad(lat2 - lat1);
      const dLng = toRad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
    },
    getWeatherDescription(code) {
    const descriptions = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Freezing light drizzle",
      57: "Freezing dense drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Freezing light rain",
      67: "Freezing heavy rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };
    return descriptions[code] || "Unknown weather condition";
  }
  },
};

</script>

<style scoped>
/* Ensure the main layout spans the full width */
.layout {
  display: flex;
  flex-direction: row;
  width: 95%;
  height: 85vh; /* Full viewport height */
  margin: 0;
  padding: 0;
}

/* Left Column: Map */
.map-container {
  width: 60%;
  height: 100%;
  position: relative;
}

#map {
  width: 100%;
  height: 100%;
}

/* Right Column: Input and Results */
.input-container {
  width: 40%;
  padding: 20px;
  overflow-y: auto;
  box-sizing: border-box;
}

/* List Section for Recommended Dog Runs */
.recommended-list {
  margin-top: 20px;
}

.recommended-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.recommended-image img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 15px;
}

.recommended-details h5 {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.recommended-details p {
  font-size: 14px;
  color: #666;
}

/* Prevent navbar overlap */
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
