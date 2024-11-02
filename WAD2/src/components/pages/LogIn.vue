
<template>
    <div class="firebaseui-auth-container login">
    <img class="cat-icon" src="../../assets/cat_icon.png">
    <h1>Log In</h1>
    <div class="form-group ">
        <label for="email">Email:</label>
        <input type="text" id="email" class="form-control address">
        <label for="password">Password</label>
        <input type="password" id="password" class="form-control contact-number">
        <div class="log-in">
            <RouterLink to="/home" class="nav-link"><button class="submit-button login" type="button" value="login">Log in!</button></RouterLink>
        </div>
    </div>
    
    </div>
</template>

<style>
label{
    color:  #ecdfcc;
}
.login{
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

</script>
