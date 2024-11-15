<template>
  <div class="registration">
    <h1>Getting Started</h1>
    <div v-for="(pet, index) in pets" :key="index">
      <pet-form :index="index" v-model="pets[index]" />
    </div>

    <div class="add-pet-button">
      <button @click="addPet" :disabled="pets.length >= 5">Add Another Pet</button>
      <!-- Disabling the button if there are already 5 pets, can be adjusted -->
    </div>

    <div class="begin">
      <RouterLink to="/profile" class="nav-link">
        <button class="submit-button" @click="submitPets">Begin!</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import PetForm from './petForm.vue'; // Import your pet-form component

export default {
  components: {
    PetForm
  },
  data() {
    return {
      pets: [{ petName: '', animalType: '', breed: '' }]  // Initial structure for pet form data
    };
  },
  methods: {
    addPet() {
      // Add a new empty object for a new pet form
      this.pets.push({ petName: '', animalType: '', breed: '' });
    },
    submitPets() {
      // Log all the pets data when the form is submitted
      console.log(this.pets);
      
      // You could process the data further here, e.g., save to a database or Firestore

      // Optionally, clear the data after submission or navigate elsewhere
      this.pets = [];  // Clear the pets data
      this.$router.push('/profile'); // Navigate to profile page or another route
    }
  }
};
</script>

  

  

<style>
label{
    color:  #545454;
}
option{
    margin-left: 10%;
}
.registration{
    text-align: center;
    align-items: center;
    width: 60%;
    margin: 0 auto;
    color:#545454;
}
.form-group{
    margin-top: 5%;
    text-align: left;
    background-color: #fae1ae;
    padding: 2%;
    border-radius: 10px;
    margin-bottom: 10%;
}
.cat-icon{
    width: 30%;
}
.form-group{
    display:block;
}
.form-control{
    margin-bottom: 2%;
    margin-top:1%;
}
.next-button-container{
    text-align: right;
}
.profile-pic{
    border-radius: 50%;
    width: 20%;
    margin: auto 0;
}
.profile-pic-container{
    margin: auto 0;
    text-align: center;
}
.submit-button{
    color: #545454;
    background-color: #fae1ae !important;
    width: 20%;
    height: 20%;
}
.begin{
    text-align: center;
    
}
</style>

