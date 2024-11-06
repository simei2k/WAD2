<template>
    <div class="clinic-card">
      <div class="card">
        <!-- Clinic Name -->
        <h1>{{ clinic.name }}</h1>
  
        <!-- Clinic Location and Distance -->
        <p><strong>Location:</strong> {{ clinic.location }}</p>
        <p><strong>Distance:</strong> {{ clinic.distance }} km</p>
  
        <!-- Clinic Opening Hours -->
        <p><strong>Opening Hours:</strong> {{ clinic.openingHours }}</p>
  
        <!-- Clinic Contact Number -->
        <p><strong>Contact:</strong> {{ clinic.contactNumber }}</p>
  
        <!-- Top Reviews -->
        <div class="reviews">
          <h3>Top Reviews:</h3>
          <ul>
            <li v-for="(review, index) in clinic.reviews" :key="index">
              <strong>{{ review.author }}:</strong> {{ review.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ClinicMap',
    props: {
      clinic: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .clinic-card {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .card {
    width: 80%;
    max-width: 600px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  h1 {
    font-size: 24px;
    color: #333;
  }
  
  p {
    font-size: 16px;
    color: #555;
  }
  
  .reviews ul {
    list-style-type: none;
    padding: 0;
  }
  
  .reviews li {
    font-size: 14px;
    color: #333;
    margin-bottom: 8px;
  }
  
  strong {
    font-weight: bold;
  }
  </style>
  