<script>
import NavBar from '../NavBar.vue'
</script>
<template>
    <NavBar></NavBar>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 profile-bar">
                <img class="profile-pic" src="../../assets/service_provider_avatar.png">
            </div>
            <div class="col-9 profile-contents">
                This should be other stuff
            </div>
        </div>
    </div>
</template>

<style>
.profile-bar{
    display: block;
    align-items: center;
    text-align: center;
}
.profile-contents{
    border: 2px white solid;
}
.profile-pic{
    width: 60%;
    height: auto;
}
   
</style>
