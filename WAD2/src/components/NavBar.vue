<template>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet"> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">    
    <nav class="navbar navbar-expand-sm sticky-top">
        <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="#">
        <img src="../assets/cat_icon.png" width="50" height="50" class="d-inline-block align-top" alt="">        
        <span class="ms-2" style="color:#ecdfcc">PawPal</span>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Home </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Profile</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Services</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Map</a>
            </li><li class="nav-item">
                <a class="nav-link" href="#">Chat</a>
            </li><li class="nav-item">
                <a class="nav-link" href="#">Shop</a>
            </li><li class="nav-item">
                <a class="nav-link" href="#">Emergency</a>
            </li>
            </ul>
        </div>
    </div>
    <hr>
    </nav>
   




</template>
<style>
nav{
    margin: 5px;
    border-bottom: solid #697565;
    border-width: calc(2px + .1vw);
    background-color: black;
    }

.navbar-brand {
  font-weight: bold;
  color: #ecdfcc; /* Pale text color for the brand name */
}

li{
    margin: 10px;
}
nav .navbar-nav li a{
  color: #ecdfcc !important;
  }


</style>
<script></script>