<!-- <script>
import NavBar from '../NavBar.vue'
</script> -->
<template>
    <div>
    <NavBar></NavBar>
        <h1>This is a map!!!</h1>
        <div id="map" style="height: 400px; width: 100%;"></div>
    </div>
</template>

<script>
    import 'leaflet/dist/leaflet.css';
    import L from 'leaflet';

    export default {
    name: 'MapComponent',
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
        // Create the map instance and set its view to a given location
        const map = L.map('map').setView([51.505, -0.09], 13);

        // Load and display tile layer (the map background)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        // Add a marker to the map
        L.marker([51.505, -0.09])
            .addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
        }
    }
    };
</script>

<style scoped>
    #map {
    height: 70vh;
    width: 90vp;
    }
</style>
