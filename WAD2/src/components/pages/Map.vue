<template>
    <div>
    <NavBar></NavBar>
    <h1>This is a map!!!</h1>

    <!-- Input field and button for manual location entry -->
    <input v-model="location" placeholder="Enter your location (e.g., city or address)" />
    <button @click="getManualLocation">Find Location</button>

    <!-- Map container -->
    <div id="map" style="height: 400px; width: 100%;"></div>

    <!-- Display the closest locations -->
    <div v-if="closestLocations.length">
      <h2>Closest Locations:</h2>
      <ul>
        <li v-for="(loc, index) in closestLocations" :key="index">
          {{ loc.name }} (Distance: {{ loc.distance.toFixed(2) }} km)
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

export default {
  name: 'MapComponent',
  data() {
    return {
      map: null,           // Leaflet map instance
      marker: null,        // Marker instance
      location: '',        // User's input location
      predefinedLocations: [  // Array of predefined locations
        { name: 'Location 1', coords: [1.29027, 103.851959] }, // Singapore example
        { name: 'Location 2', coords: [1.3521, 103.8198] },    // Another point in Singapore
        { name: 'Location 3', coords: [1.3000, 103.8000] },    // Another point
        { name: 'Location 4', coords: [1.2820, 103.8423] },    // Another point
        { name: 'Location 5', coords: [1.3600, 103.989] },     // Another point
      ],
      closestLocations: [] // Array to hold the closest locations
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // Initialize the map and set its default view
      this.map = L.map('map').setView([1.3521, 103.8198], 13);

      // Load the tile layer from OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // Add a default marker at the initial location
      this.marker = L.marker([1.3521, 103.8198])
        .addTo(this.map)
        .bindPopup('Singapore')
        .openPopup();
    },

    // Method to fetch the location based on user input and find closest points
    getManualLocation() {
      const locationQuery = this.location;

      // Use Nominatim API to geocode the input location
      axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${locationQuery}`)
        .then(response => {
          if (response.data && response.data.length > 0) {
            const result = response.data[0];
            const userLat = parseFloat(result.lat);
            const userLon = parseFloat(result.lon);

            // Center the map to the user's new location
            this.map.setView([userLat, userLon], 13);

            // Move the marker to the new location
            this.marker.setLatLng([userLat, userLon])
              .bindPopup(`You searched for: ${locationQuery}`)
              .openPopup();

            // Calculate distances to predefined locations and sort by closest
            this.closestLocations = this.getClosestLocations(userLat, userLon);
          } else {
            alert('Location not found. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error fetching location:', error);
          alert('There was an error finding the location.');
        });
    },

    // Haversine formula to calculate distance between two coordinates
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in kilometers
    },

    // Helper to convert degrees to radians
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },

    // Get the closest locations based on the user's input
    getClosestLocations(userLat, userLon) {
      const distances = this.predefinedLocations.map(location => {
        const distance = this.calculateDistance(userLat, userLon, location.coords[0], location.coords[1]);
        return { name: location.name, distance };
      });

      // Sort by distance and return the top 3 closest locations
      return distances.sort((a, b) => a.distance - b.distance).slice(0, 3);
    }
  }
};
</script>

<style scoped>
    #map {
    height: 70vh;
    width: 100%;
    }
</style>