
<template>
    <div class="registration">
    <img class="cat-icon" src="../../assets/cat_icon_2.png">
    <h1>Getting Started</h1>
    <div class="form-group">
        <label for=" years-of-experience" >Years of Experience:</label>
        <input type="number" id="years-of-experience" v-model="yearsOfExperience" class="form-control years-of-experience">
        <label for="pet-services"> Services Provided:</label><br>
        <input type="checkbox" v-model='pet_services' class="form-check-input pet_services " id="pet_services " style="margin-right: 8px" value="pet_walking">Pet Walking<br>
        <input type="checkbox"  v-model='pet_services' class="form-check-input pet_services " id="pet_services " style="margin-right: 8px" value="pet_sitting">Pet Sitting<br>
        <input type="checkbox" v-model='pet_services' class="form-check-input pet_services" id="pet_services  " style="margin-right: 8px" value="pet_transport">Pet Transport<br>
        <label for="profile-desc">Tell us more about yourself: </label><br>
        <textarea id="profile-desc" v-model="profile_desc" class="form-control profile-desc" value="" placeholder="I want to eat dogs"></textarea>
        <label for="experience">Experience with Animals:</label><br>
        <input type="checkbox" v-model='experience' id="experience" class="form-check-input experience" value="volunteer">Volunteer with animals<br>
        <input type="checkbox"  v-model='experience' id="experience" class="form-check-input experience" value="pet-owner">Pet owner<br>
        <label for="rates">Rates: </label><br>
        <textarea id="rates" v-model="rates" class="form-control rates" value="" placeholder="Pet Sitting: $10/h"></textarea>
        <label for="preferences" >Preferences:</label><br>
        <input type="checkbox" v-model='preferences' id="preferences" class="form-check-input preferences" value="big_dogs">Big Dogs<br>
        <input type="checkbox" v-model='preferences' id="preferences" class="form-check-input preferences" value="medium_dogs">Medium Dogs<br>
        <input type="checkbox" v-model='preferences' id="preferences" class="form-check-input preferences" value="small_dogs">Small Dogs<br>
        <input type="checkbox" v-model='preferences' id="preferences" class="form-check-input preferences" value="cats">Cats<br>
        <input type="checkbox" v-model='preferences' id="preferences" class="form-check-input preferences" value="fishes">Fishes<br>
        <input type="checkbox" v-model='preferences' id="preferences" class="form-check-input preferences" value="birds">Birds<br>
        <input type="checkbox" v-model='preferences' id="preferences" class="form-check-input preferences" value="reptile">Reptiles<br>
        <input type="checkbox" v-model='preferences' id="preferences" class="form-check-input preferences" value="others">Others<br>
        <br>
        <label for="willingness_to_travel">Willingness to travel:</label><br>
        <select v-model='willingness_to_travel'>
        <option>5-10km radius</option>
        <option>11-20km radius</option>
        <option>Beyond</option>
        </select><br>
        <div class="begin" @click ='addServiceProviderdb()'>
            <RouterLink to="/profile" class="nav-link"><button class="submit-button begin" type="button" value="begin">Begin!</button></RouterLink>
        </div>

    </div>
    </div>
</template>

<style>
label{
    color:  #545454;
}
.begin{
    text-align: center;
    align-items: center;
}
.submit-button{
    text-align: center; 
    align-items: center;
    width: 60%;
    margin: 0 auto !important;
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

</style>

<script>

import  { setDoc, doc } from "firebase/firestore";
import db from "../../../database"

export default {
    name: 'serviceProviderDetails',
    data(){
       return {
        yearsOfExperience: '',
        pet_services: [],
        profile_desc: '',
        experience: [],
        rates: '',
        preferences: [],
        willingness_to_travel: ''
       }
    },
    created() {
        // Retrieve name and accountType from localStorage
        this.name = localStorage.getItem('name');
        this.accountType = localStorage.getItem('accountType');
    },
    methods:{
        async addServiceProviderdb(){
            await setDoc(doc(db,'serviceproviders',this.name),{
                name:this.name,
                yearsOfExperience : this.yearsOfExperience,
                pet_services : this.pet_services,
                profile_desc: this.profile_desc,
                experience: this.profile_desc,
                rate: this.rates,
                preferences: this.preferences,
                willingness_to_travel : this.willingness_to_travel,
            })
           if (this.accountType.includes('pet-owner')){
            this.$router.push('/GettingStartedPetOwner')
           }
          
        }
    }
}
</script>
