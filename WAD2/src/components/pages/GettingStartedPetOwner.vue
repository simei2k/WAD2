<template>
    <div class="registration">
    <img class="cat-icon" src="../../assets/cat_icon.png">
    <h1>Getting Started</h1>
    <div class="form-group">
        <label for="profile_pic">Pet Pic:</label>
        <div class="profile_pic-container"> <img src="../../assets/profile.png" class="profile-pic"></div>
        <input type="file" id="profile_pic" class="form-control profile_pic">
        <label for="pet_name">Pet Name:</label>
        <input type="text" id="pet_name" class="form-control name">
        <label for="pet_type">Type</label><br>
        <select>
        <option>Dog</option>
        <option>Cat</option>
        <option>Bird</option>
        <option>Fish</option>
        <option>Lizard</option>
        <option>Snake</option>
        </select><br>
        <label for="size">Size</label><br>
        <select>
        <option>small</option>
        <option>medium</option>
        <option>big</option>
        </select><br>
        <label for="breed">Breed</label><br>
        <select>
        <option>Golden</option>
        <option>Shiba</option>
        <option>Berner</option>
        <option>Chihuahua</option>
        <option>GSD</option>
        </select><br>

        <label for="medical_conditions">Medical Conditions:</label>
        <textarea id="medical_conditions" class="form-control medical_conditions" value="" placeholder="Allergic to water"></textarea>
        <label for="dietary_restrictions">Dietary Restrictions:</label>
        <textarea id="dietary_restrictions" placeholder="Allergic to humans" class="form-control dietary_restrictions" ></textarea>
        <br>
        <div class="begin">
            <RouterLink to="/profile" class="nav-link"><button class="submit-button" type="button" value="begin">Begin!</button></RouterLink>
        </div>
    </div>
    </div>
</template>

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

<script>
import  { setDoc, doc } from "firebase/firestore";
import db from "../../../database"
export default{
    name: 'pet_owner',
    data(){
        return {
        profile_pic: '', 
        pet_name: '', 
        pet_type: '',
        size: '',
        breed: '',
        medical_conditions: '',
        };
    },
    methods:{
        //EACH PET WILL BE A COLLECTION WITH THE PETNAME, AND SUBCOLLECTION WILL BE PET OWNER'S NAME
        async createPetOwnerdb(){
            await setDoc(doc(db,'petowners',this.name, this.pet_name),{
            profile_pic: '', 
            pet_name: '', 
            pet_type: '',
            size: '',
            breed: '',
            medical_conditions: '',
        });
        }
    }
}
</script>