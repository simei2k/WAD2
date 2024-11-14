<template>
  <div>
    <div class="main-layout row gx-0">
      <!-- Left Column (Map) -->
      <div class="col-sm-12 col-md-7 map-container">
        <section id="map" ref="map"></section>
      </div>

      <!-- Right Column (Search + Results) -->
      <div class="col-sm-12 col-md-5 input-container">
        <form class="ui segment large form">
          <div class="ui message red" v-show="error">{{ error }}</div>
          <div class="ui segment search-section">
            <h2 class="header-text">Enter Your Location</h2>
            <div class="field">
              <div class="ui right icon input large search-input" :class="{ loading: spinner }">
                <input
                  type="text"
                  placeholder="Enter your address"
                  v-model="address"
                  ref="autocomplete"
                />
                <i class="dot circle link icon" @click="locatorButtonPressed"></i>
              </div>
            </div>
            <button class="ui button primary-button" @click.prevent="findBestDogRuns">Find Dog Runs</button>
          </div>
        </form>

        <!-- Recommended Dog Runs List (Horizontal Scroll) -->
        <section class="ui segment results-section">
          <h2 class="ui header">Top 5 Recommended Dog Runs</h2>
          <h5 class="sub-header">
            Based on your location and weather forecast, here are the top 5 recommended Dog Runs
          </h5>
          <div class="recommended-list-container">
            <div
              class="recommended-item"
              v-for="(dogRun, index) in topDogRuns"
              :key="index"
            >
              <div class="recommended-details">
                <h5 class="dogrun-title">{{ dogRun.name }}</h5>
                <p class="dogrun-info">Weather: {{ dogRun.weather }}</p>
                <p class="dogrun-info">Distance: {{ dogRun.distance.toFixed(2) }} km</p>
                <button class="ui button directions-button" @click="getDirections(dogRun.lat, dogRun.lng)">
                  Get Directions
                </button>
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
      userMarker: null,
      directionsRenderer: null,
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
        zoom: 11,
        center: { lat: 1.3521, lng: 103.8198 },
        mapTypeId: "roadmap",
      });
    },
    initAutocomplete() {
      const autocomplete = new google.maps.places.Autocomplete(this.$refs.autocomplete, {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(1.130475, 103.692035),
          new google.maps.LatLng(1.450475, 104.092035)
        ),
        componentRestrictions: { country: "SG" },
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          this.userLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          this.map.setCenter(this.userLocation);
        }
      });
    },
    async findBestDogRuns() {
      if (!this.userLocation) {
        this.error = "Please provide your location using the search bar.";
        return;
      }

      if (this.userMarker) {
        this.userMarker.setPosition(this.userLocation);
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
          const distance = this.calculateDistance(
            this.userLocation.lat,
            this.userLocation.lng,
            dogRun.lat,
            dogRun.lng
          );

          return {
            ...dogRun,
            weather: `${temperature}°C, ${this.getWeatherDescription(weatherCode)}`,
            distance,
          };
        })
      );

      this.topDogRuns = dogRunData.sort((a, b) => a.distance - b.distance).slice(0, 5);
    },
    calculateDistance(lat1, lng1, lat2, lng2) {
      const toRad = (value) => (value * Math.PI) / 180;
      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLng = toRad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Slight snow fall",
        73: "Moderate snow fall",
        75: "Heavy snow fall",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        95: "Thunderstorm",
      };
      return descriptions[code] || "Unknown weather condition";
    },
    getDirections(destinationLat, destinationLng) {
      if (!this.userLocation) {
        this.error = "Please provide your location.";
        return;
      }

      // Initialize directions service
      const directionsService = new google.maps.DirectionsService();

      // Initialize directions renderer if it hasn't been created yet
      if (!this.directionsRenderer) {
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.directionsRenderer.setMap(this.map); // Attach renderer to the map
      } else {
        // Clear existing route if renderer already exists
        this.directionsRenderer.setDirections({ routes: [] });
      }

      // Define the route request
      const request = {
        origin: this.userLocation,
        destination: { lat: destinationLat, lng: destinationLng },
        travelMode: google.maps.TravelMode.DRIVING, // Change to WALKING or BICYCLING if necessary
      };

      // Fetch and display the route
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsRenderer.setDirections(result);
        } else {
          this.error = "Unable to fetch directions. Please try again.";
        }
      });
    },
  },
};
</script>

<style scoped>
.main-layout {
  height: 85vh;
  margin: 0;
  padding: 0;
}

/* Left Column: Map */
.map-container {
  height: 100%;
  background: #f0f0f0;
}

#map {
  width: 100%;
  height: 100%;
  margin-top: 21px;
  margin-left: 5px;
}

/* Right Column: Input and Results */
.input-container {
  padding: 20px;
  overflow-y: auto;
  box-sizing: border-box;
}

/* Aesthetic Enhancements for Form */
.search-section {
  padding: 20px;
  background: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header-text {
  color: #697565;
  font-weight: 600;
}

.search-input {
  border-radius: 8px;
  padding: 10px;
}

.primary-button {
  width: 100%;
  background-color: #fae1ae;
  color: #3c3d37;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.primary-button:hover {
  background-color: #f29040;
  color: #ffffff;
}

/* Recommended List Section */
.results-section {
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sub-header {
  color: #697565;
}

/* Scrollable Recommended List */
.recommended-list-container {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  gap: 15px;
  scroll-snap-type: x mandatory;
}

.recommended-item {
  background: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  flex: 0 0 auto;
  scroll-snap-align: center;
}

.dogrun-title {
  font-size: 16px;
  font-weight: bold;
  color: #3c3d37;
}

.dogrun-info {
  font-size: 14px;
  color: #697565;
}

.directions-button {
  background-color: #4caf50;
  color: #fff;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.directions-button:hover {
  background-color: #388e3c;
}
</style>