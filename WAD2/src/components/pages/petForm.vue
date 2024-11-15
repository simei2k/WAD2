<template>
  <div class="form-group">
    <label for="pet_name">Pet Name:</label>
    <input type="text" v-model="pet_name" class="form-control pet_name" />

    <label for="pet_type">Type</label>
    <select v-model="pet_type" class="form-control pet_type" @change="updateBreeds">
      <option>Dog</option>
      <option>Cat</option>
      <option>Bird</option>
      <option>Fish</option>
      <option>Lizard</option>
      <option>Snake</option>
    </select><br>

    <label for="size">Size</label>
    <select v-model="size" class="form-control name">
      <option>small</option>
      <option>medium</option>
      <option>big</option>
    </select><br>

    <label for="breed">Breed</label>
    <select v-model="breed" class="form-control name">
      <option v-for="(option, index) in breedOptions" :key="index" :value="option">{{ option }}</option>
    </select><br>

    <label for="medical_conditions">Medical Conditions:</label>
    <textarea class="form-control name" v-model="medical_conditions" placeholder="Allergic to water"></textarea>

    <label for="dietary_restrictions">Dietary Restrictions:</label>
    <textarea class="form-control name" v-model="dietary_restrictions" placeholder="Allergic to humans"></textarea><br>

    <button 
        class="submit-button" 
        @click="addPetdb" 
        :disabled="isSubmitted"
        :class="{'disabled-button': isSubmitted}">
        Add me!
    </button>
  </div>
</template>

<script>
import { doc, setDoc } from "firebase/firestore";
import db from "../../../database.js";

export default {
  props: ['index'],
  data() {
    return {
      pet_name: '',
      pet_type: '',
      size: '',
      breed: '',
      medical_conditions: '',
      dietary_restrictions: '',
      breedOptions: [],  // Array to store breed options
      isSubmitted: false // Flag to track if the pet is added
    };
  },
  methods: {
    // Dynamically update the breed options based on the selected pet type
    updateBreeds() {
      switch (this.pet_type) {
        case 'Dog':
          this.breedOptions = ['Golden', 'Shiba', 'Berner', 'Chihuahua', 'GSD'];
          break;
        case 'Cat':
          this.breedOptions = ['Persian', 'Siamese', 'Maine Coon', 'Bengal'];
          break;
        case 'Bird':
          this.breedOptions = ['Parrot', 'Canary', 'Finch'];
          break;
        case 'Fish':
          this.breedOptions = ['Goldfish', 'Betta', 'Guppy'];
          break;
        case 'Lizard':
          this.breedOptions = ['Gecko', 'Iguana', 'Chameleon'];
          break;
        case 'Snake':
          this.breedOptions = ['Corn Snake', 'Ball Python', 'Boa Constrictor'];
          break;
        default:
          this.breedOptions = [];
          break;
      }
    },

    // Function to add the pet to Firestore
    async addPetdb() {
      try {
        // Retrieve the owner name from local storage
        const owner = localStorage.getItem('name');

        // Log to check the owner value
        console.log(owner);

        // Add pet details to Firestore under the specific owner and pet name
        await setDoc(doc(db, 'petowners', owner, 'pets', this.pet_name), {
          pet_name: this.pet_name,
          pet_type: this.pet_type,
          size: this.size,
          breed: this.breed,
          medical_conditions: this.medical_conditions,
          dietary_restrictions: this.dietary_restrictions
        });

        console.log('Pet details added successfully');
        
        // Disable the button after successful submission
        this.isSubmitted = true;
      } catch (error) {
        console.error('Error adding pet details:', error);
        console.log(localStorage.getItem('name'));
      }
    }
  }
}
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

.submit-button{
    color: #ecdfcc;
    background-color: #3C3D37 !important;
    width: 20%;
    height: 20%;
}
.begin{
    text-align: center;
    
}
.disabled-button {
  background-color: #ccc; /* Light gray background */
  cursor: not-allowed; /* Change cursor to indicate the button is not clickable */
  pointer-events: none; /* Disable any interaction with the button */
}
</style>