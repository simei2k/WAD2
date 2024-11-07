<template>
    <div class="registration">
      <h1>Getting Started</h1>
      <div v-for="(pet, index) in pets" :key="index">
        <pet-form :index="index"></pet-form>
      </div>
      
      <div class="add-pet-button">
        <button @click="addPet">Add Another Pet</button>
      </div>
  
      <div class="begin">
        <RouterLink to="/profile" class="nav-link">
          <button class="submit-button" @click="submitPets">Begin!</button>
        </RouterLink>
      </div>
    </div>
  </template>
  
  <script>
  import PetForm from './PetForm.vue'; // Import your pet-form component
  
  export default {
    components: {
      PetForm
    },
    data() {
      return {
        pets: [{}]  // Initially one empty object to represent the first pet form
      };
    },
    methods: {
      addPet() {
        this.pets.push({});  // Adds a new pet form
      },
      submitPets() {
        // Handle submission logic for all pets
        console.log(this.pets);
      }
    }
  };
  </script>
  

  

<style>
label{
    color:  #ecdfcc;
}
option{
    margin-left: 10%;
}
.registration{
    text-align: center;
    align-items: center;
    width: 60%;
    margin: 0 auto;
    color:#ecdfcc;
}
.form-group{
    margin-top: 5%;
    text-align: left;
    background-color: #697565;
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
    color: #ecdfcc;
    background-color: #3C3D37 !important;
    width: 20%;
    height: 20%;
}
.begin{
    text-align: center;
    
}
</style>

