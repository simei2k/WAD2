<template>
  <div class="form-group">
    <label for="profile_pic">Pet Pic:</label>
    <div class="profile_pic-container">
      <img :src="profile_pic || '../../assets/profile.png'" class="profile-pic">
    </div>
    <input type="file" @change="onFileChange" class="form-control profile_pic">
    
    <label for="pet_name">Pet Name:</label>
    <input type="text" v-model="pet_name" class="form-control pet_name">
    
    <label for="pet_type">Type</label>
    <select v-model="pet_type" class="form-control pet_type">
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
      <option>Golden</option>
      <option>Shiba</option>
      <option>Berner</option>
      <option>Chihuahua</option>
      <option>GSD</option>
    </select><br>

    <label for="medical_conditions">Medical Conditions:</label>
    <textarea class="form-control name" v-model="medical_conditions" placeholder="Allergic to water"></textarea>
  
    <label for="dietary_restrictions">Dietary Restrictions:</label>
    <textarea class="form-control name" v-model="dietary_restrictions" placeholder="Allergic to humans"></textarea><br>
  
  <div class="addPet">
    <button class="submit-button" @click ="addPetdb()">Add me!</button>
  </div>
</div>
</template>
<script>
import { doc, setDoc, collection } from "firebase/firestore"; // Make sure to import these functions
import db  from "../../../database.js"

export default {
  props: ['index'],
  data() {
    return {
      profile_pic: '',
      pet_name: '',
      pet_type: '',
      size: '',
      breed: '',
      medical_conditions: '',
      dietary_restrictions: '',
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.profile_pic = URL.createObjectURL(file);
      }
    },
    async addPetdb() {
      try {
        // Reference to the 'petowners' collection and the document for the specific owner
        const owner = localStorage.getItem('name');
    
    // Log to check the owner value
        console.log(owner);

        //this document already exists

        //await setDoc(doc(db,ownerDocRef,thi))
        // Reference to the pet's document within the owner's subcollection
        //const petDocRef = doc(collection(ownerDocRef, this.pet_name)); // Collection for each pet
        
        // Add pet details to Firestore under 'petname' collection
        await setDoc(doc(db,'petowners',owner, this.pet_name, this.pet_name), {
          profile_pic: this.profile_pic,
          pet_name: this.pet_name,
          pet_type: this.pet_type,
          size: this.size,
          breed: this.breed,
          medical_conditions: this.medical_conditions,
          dietary_restrictions: this.dietary_restrictions
        });

        console.log('Pet details added successfully');
      } catch (error) {
        console.error('Error adding pet details:', error);
        console.log(localStorage.getItem('name'))
      }
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