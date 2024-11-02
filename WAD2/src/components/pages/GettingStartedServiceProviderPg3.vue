<script>
import { RouterLink } from 'vue-router';
import NavBar from '../NavBar.vue'
</script>
<template>
    <div class="registration">
    <img class="cat-icon" src="../../assets/cat_icon.png">
    <h1>Getting Started</h1>
    <div class="form-group">
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
    margin: auto 0;
    align-items: center;
}
#experience{
    margin-right: 1%;
}
</style>