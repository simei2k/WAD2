<script>
import { RouterLink } from 'vue-router';
import NavBar from '../NavBar.vue'

</script>
<template>
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
        <label for="profile-desc">Tell us more about yourself: </label><br>
        <textarea id="profile-desc" class="form-control profile-desc" value="" placeholder="I want to eat dogs"></textarea>
        <label for="experience">Experience with Animals:</label><br>
        <input type="checkbox" id="experience" class="form-check-input experience" value="volunteer">Volunteer with animals<br>
        <input type="checkbox" id="experience" class="form-check-input experience" value="pet-owner">Pet owner<br>
        <label for="rates">Rates: </label><br>
        <textarea id="rates" class="form-control rates" value="" placeholder="Pet Sitting: $10/h"></textarea>
        <label for="preferences">Preferences:</label><br>
        <select>
        <option>Big dogs</option>
        <option>Medium dogs</option>
        <option>Small dogs</option>
        <option>Cats</option>
        </select><br>
        <label for="preferences">Willingness to travel:</label><br>
        <select>
        <option>5-10km radius</option>
        <option>11-20km radius</option>
        <option>Beyond</option>
        </select><br>
        <div class="begin">
            <RouterLink to="/profile" class="nav-link"><button class="submit-button begin" type="button" value="begin">Begin!</button></RouterLink>
        </div>

    </div>
    </div>
</template>

<style>
label{
    color:  #ecdfcc;
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
