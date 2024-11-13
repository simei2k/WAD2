
<template>
    <div class="firebaseui-auth-container login">
    <img class="cat-icon" src="../../assets/cat_icon_2.png">
    <h1>Log In</h1>
    <form @submit.prevent="login">
    <div class="form-group ">
        <label for="email">Email:</label>
        <input type="text" id="email" class="form-control address" v-model='email' value="">
        <label for="password">Password</label>
        <input type="password" id="password" class="form-control contact-number" v-model='password' value="">
        <div class="log-in">
      <button class="submit-button login" type="submit" value="login">Log in!</button>
        </div>
    </div>
    </form>
    <p v-if="errorMessage" class='errorMessage' >{{ errorMessage }}</p>
    </div>
</template>

<style>
label{
    color:  #545454;
}
.errorMessage{
    color:red
}
.login{
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

</style>
    
<script>
import { signIn } from "../../../firebase"
import { useRouter } from "vue-router";
import {ref} from "vue"
//using firebase authentication
export default {
    name: "LogIn",
    //set up method from firebase to set up user account
    setup(){
        const router = useRouter();
        const email = ref('')
        const password = ref('')
        const errorMessage = ref('')
        const login = async () =>{
            //email validation
            if (!email.value) {
            errorMessage.value = "Email is required.";
            return;
            }
            //form validation
            if (!password.value) {
                errorMessage.value = "Password is required.";
                return;
            }
            try{
                await signIn(email.value,password.value);
                await router.push('/home')
            }
            catch (error){
                errorMessage.value = "Login failed: " + error.message;
                console.log("Login failed:", error)
            }
        }
        return {email, password,errorMessage,login
    };
        
    }
    
}
</script>
