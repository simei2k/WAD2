<script>
import { RouterLink } from 'vue-router';
import NavBar from '../NavBar.vue'

</script>
<template>
    <NavBar></NavBar>
    <div class="registration">
    <img class="cat-icon" src="../../assets/cat_icon.png">
    <h1>Getting Started</h1>
    <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" id="address" class="form-control address">
        <label for="email">Contact Number:</label>
        <input type="number" id="contact-number" class="form-control contact-number">
        <label for="emergency-contact-name">Years of Experience:</label>
        <input type="text" id="number" class="form-control years-of-experience">
        <label for="pet-number"> Services Provided:</label><br>
        <input type="checkbox" class="form-check-input account_type" id="account_type " style="margin-right: 8px" value="pet-owner">Pet Walking<br>
        <input type="checkbox" class="form-check-input account_type" id="account_type " style="margin-right: 8px" value="pet-owner">Pet Sitting<br>
        <input type="checkbox" class="form-check-input account_type" id="account_type " style="margin-right: 8px" value="pet-owner">Pet Transport<br>

        <div class="next-button-container">
        <RouterLink to="/GettingStartedServiceProviderPg2" class="nav-link"><svg xmlns="http://www.w3.org/2000/svg" width="5%" height="5%" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16" onclick="">
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
