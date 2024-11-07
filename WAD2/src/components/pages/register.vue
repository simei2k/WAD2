<template>
    <div class="registration">
    <img class="cat-icon" src="../../assets/cat_icon.png">
    <div id="firebaseui-auth-container"></div>
    <h1>Getting Started</h1>
    <div class="form-group">
        <label for="name">Name:</label>
        <input type="text"  v-model="name"  id="name" class="form-control name">
        <label for="email">Email:</label>
        <input type="email"  v-model="email"  id="email" class="form-control email">
        <label for="password">Password:</label>
        <input type="password"  v-model="password"  id="password" class="form-control password">
        <label for="cpassword"> Confirm Password:</label>
        <input type="password"  v-model="cpassword"  id="cpassword" class="form-control password">
        <label for="account_type">Account Type:</label>
        <br>
        <input type="checkbox" class="form-check-input account_type" v-model="accountType"  id="account_type " style="margin-right: 8px" value="pet-owner">Pet Owner
        <input type="checkbox" class="form-check-input account_type"  v-model="accountType"  style="margin-right: 8px; margin-left: 8px;" id="account_type" value="service-provider">Service Provider
        <br>
        <label for="address">Address:</label>
        <input type="text" id="address"  v-model="address"  class="form-control address">
        <label for="email">Contact Number:</label>
        <input type="number" id="contact-number"  v-model="contactNumber"  class="form-control contact-number">
        <label for="pet-number"> Number of Pets</label>
        <input type="number" id="pet-number"  v-model="petNumber"  class="form-control pet-number">
        <br>
        <div class="next-button-container" @click="createUser(); createUserdb()">
        <RouterLink to="/GettingStartedServiceProvider" class="nav-link"><svg xmlns="http://www.w3.org/2000/svg" width="5%" height="5%" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16" onclick="">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
        </svg></RouterLink>
        </div>
    </div>
    </div>
</template>

<style>
label{
    color:  #ecdfcc;
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

</style>
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import  { setDoc, getDocs, doc } from "firebase/firestore";
import db from "../../../database.js"

//checking which checkbox is checked

export default {
    name: 'Register',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            accountType: [],
            address: '',
            contactNumber: '',
            petNumber: ''
        };
    },
    methods: {
        
        //create user for authentication
        createUser() {
            const { email, password } = this;
            const auth = getAuth();

            if (!email || !password) {
                console.error("Email and password are required");
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up successfully
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Error:", errorCode, errorMessage);
                    alert(errorMessage)
                });
        },
    //create a new document (user) with the properties
    async createUserdb(){
        await setDoc(doc(db,'users',this.name),{
            name: this.name,
            email: this.email,
            password: this.password,
            accountType: this.accountType,
            address: this.address,
            contactNumber: this.contactNumber,
            petNumber: this.petNumber,
        });
      
        localStorage.setItem('name', this.name);
        localStorage.setItem('accountType', this.accountType);
          // Determine routing based on accountType selection
        if (this.accountType.includes('service-provider')) {
            // Navigate to service provider page first
            await setDoc(doc(db,'serviceproviders',this.name),{
                name: this.name
        }); 
            this.$router.push('/GettingStartedServiceProvider');
        } 
        else if (this.accountType.includes('pet-owner')) {
            await setDoc(doc(db,'petowners',this.name),{
                name:this.name
        });
            this.$router.push('/GettingStartedPetOwner');
            
        }
    }
    }
    

};

  </script>

<script></script>