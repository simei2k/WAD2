<template>
    <div class="pet-form">
      <h3>Pet {{ index + 1 }}</h3>
      <label for="pet-name">Pet Name:</label>
      <input type="text" v-model="pet.name" id="pet-name" placeholder="Enter pet's name">
  
      <label for="pet-type">Pet Type:</label>
      <select v-model="pet.type" id="pet-type">
        <option>Dog</option>
        <option>Cat</option>
        <option>Bird</option>
        <option>Fish</option>
        <option>Reptile</option>
        <option>Other</option>
      </select>
  
      <label for="pet-age">Pet Age:</label>
      <input type="number" v-model="pet.age" id="pet-age" placeholder="Enter pet's age">
    </div>
  </template>
  
  <script>
  export default {
    props: ['index', 'pet'],
  };
  </script>
  
  <style>
  .pet-form {
    margin-bottom: 20px;
  }
  </style>
  