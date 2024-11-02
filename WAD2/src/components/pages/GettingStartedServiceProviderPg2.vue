<script>
import { RouterLink } from 'vue-router';
import NavBar from '../NavBar.vue'
</script>
<template>
    <div class="registration">
    <img class="cat-icon" src="../../assets/cat_icon.png">
    <h1>Getting Started</h1>
    <div class="form-group">
        <label for="profile-desc">Tell us more about yourself: </label><br>
        <textarea id="profile-desc" class="form-control profile-desc" value="" placeholder="I want to eat dogs"></textarea>
        <label for="experience">Experience with Animals:</label><br>
        <input type="checkbox" id="experience" class="form-check-input experience" value="volunteer">Volunteer with animals<br>
        <input type="checkbox" id="experience" class="form-check-input experience" value="pet-owner">Pet owner<br>
        
        <div class="next-button-container">
        <RouterLink to="/GettingStartedServiceProviderPg3" class="nav-link"><svg xmlns="http://www.w3.org/2000/svg" width="5%" height="5%" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16" onclick="">
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
#experience{
    margin-right: 1%;
}
.next-button-container{
    text-align: right;
}
</style>