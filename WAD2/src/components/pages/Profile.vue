<script>
import NavBar from '../NavBar.vue'
</script>
<template>
    <NavBar></NavBar>
    <div class="container-fluid box">
        <div class="row">
            <div class="col-3 profile-bar">
                <img class="profile-pic" src="../../assets/service_provider_avatar.png">
                <h1 class="profile-name">CatWoman</h1>
                <h2 class="profile-tagline">I love cats</h2>
                <div class="profile-location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10%" height="10%" fill="#ecdfcc" class="bi bi-geo-alt" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                    <p>City Hall</p>
                </div>
                <div class="container-fluid profile-buttons">
                    <div class="row">
                        <div class="button col-6" onclick='alert("hello")'>Availability</div>
                        <div class="button col-6">Contact Me!</div>
                    </div>
                    <div class="row">
                        <div class="button col-6">More About Me</div>
                        <div class="button col-6">Listings</div>
                    </div>
                    <div class="more-description">
                        <!--the 3 information below should be populated dynamically-->
                        <h6>Years of Experience: 8 Years</h6>
                        <h6>Volunteer & Pet Owner</h6>
                        <h6>Completed Orders: 8</h6>
                    </div>
                </div>
            </div>
            <div class="col-9 profile-contents">
                <!--the 3 information below should be populated dynamically-->
                <h1>More About CatWoman</h1>
                <p>I am a big fan of cats. I have experience of up to 10 years with cats. Currently I have 4 cats at home, and this is my retirement job. yada yada yada yada </p>
                <h2>Preferences</h2>
                <p>&#128054; <b>Animals:</b> 10-20kg dogs, cats</p>
                <p>&#128168; <b>Willing to travel:</b> 10km radius</p>
                <p><b>&#128176;Rates:</b></p>
                <p>&#127968;Pet Sitting</p>
                <p>&#128694;Pet walking</p>
                <p>&#128663;Pet transport:</p>
                <div class="reviews">
                    <h1>What Customers Say</h1>
                    <h3>Average: 5/5 &#127775; ratings</h3>
                    <div class="card-container">
                        <ul class="cards">
                            <li class="card">
                                 <!-- BS card: Start --> 
                                 <div class="card-div" > 
                                     <div class="card-body"> 
                                        <img src="../../assets/reviewer1_pic.png" class="reviewer-pic">
                                        <h1 class="reviewer-name">DogLover</h1> 
                                        <div class="stars">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" class="bi bi-star" viewBox="0 0 16 16">
                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                            </svg>
                                        </div>
                                     </div> 
                                     <ul class="list-group list-group-flush"> 
                                         <li class="list-group-item">An item</li> 
                                         <li class="list-group-item">A second item</li> 
                                         <li class="list-group-item">A third item</li> 
                                     </ul> 
                                     <div class="card-body"> 
                                         <a href="#" class="card-link">Card link</a> 
                                         <a href="#" class="card-link">Another link</a> 
                                     </div> 
                                 </div> 
                                 <!-- BS card: End --> 
                            </li>
                            <li class="card">
                                 <!-- BS card: Start --> 
                                 <div class="card-div" > 
                                     <div class="card-body"> 
                                         <h5 class="card-title">Card title</h5> 
                                         <p class="card-text">Some quick example text to make up the bulk of the card's content.</p>  
                                     </div> 
                                     <ul class="list-group list-group-flush"> 
                                         <li class="list-group-item">An item</li> 
                                         <li class="list-group-item">A second item</li> 
                                         <li class="list-group-item">A third item</li> 
                                     </ul> 
                                     <div class="card-body"> 
                                         <a href="#" class="card-link">Card link</a> 
                                         <a href="#" class="card-link">Another link</a> 
                                     </div> 
                                 </div> 
                                 <!-- BS card: End --> 
                            </li>
                            <li class="card">
                                 <!-- BS card: Start --> 
                                 <div class="card-div" > 
                                     <div class="card-body"> 
                                         <h5 class="card-title">Card title</h5> 
                                         <p class="card-text">Some quick example text to make up the bulk of the card's content.</p>  
                                     </div> 
                                     <ul class="list-group list-group-flush"> 
                                         <li class="list-group-item">An item</li> 
                                         <li class="list-group-item">A second item</li> 
                                         <li class="list-group-item">A third item</li> 
                                     </ul> 
                                     <div class="card-body"> 
                                         <a href="#" class="card-link">Card link</a> 
                                         <a href="#" class="card-link">Another link</a> 
                                     </div> 
                                 </div> 
                                 <!-- BS card: End --> 
                            </li>
                            <li class="card">
                                 <!-- BS card: Start --> 
                                 <div class="card-div" > 
                                     <div class="card-body"> 
                                         <h5 class="card-title">Card title</h5> 
                                         <p class="card-text">Some quick example text to make up the bulk of the card's content.</p>  
                                     </div> 
                                     <ul class="list-group list-group-flush"> 
                                         <li class="list-group-item">An item</li> 
                                         <li class="list-group-item">A second item</li> 
                                         <li class="list-group-item">A third item</li> 
                                     </ul> 
                                     <div class="card-body"> 
                                         <a href="#" class="card-link">Card link</a> 
                                         <a href="#" class="card-link">Another link</a> 
                                     </div> 
                                 </div> 
                                 <!-- BS card: End --> 
                            </li>
                            <li class="card">
                                 <!-- BS card: Start --> 
                                 <div class="card-div"> 
                                     <div class="card-body"> 
                                         <h5 class="card-title">Card title</h5> 
                                         <p class="card-text">Some quick example text to make up the bulk of the card's content.</p>  
                                     </div> 
                                     <ul class="list-group list-group-flush"> 
                                         <li class="list-group-item">An item</li> 
                                         <li class="list-group-item">A second item</li> 
                                         <li class="list-group-item">A third item</li> 
                                     </ul> 
                                     <div class="card-body"> 
                                         <a href="#" class="card-link">Card link</a> 
                                         <a href="#" class="card-link">Another link</a> 
                                     </div> 
                                 </div> 
                                 <!-- BS card: End --> 
                            </li>
                            <li class="card">
                                 <!-- BS card: Start --> 
                                 <div class="card-div" > 
                                     <div class="card-body"> 
                                         <h5 class="card-title">Card title</h5> 
                                         <p class="card-text">Some quick example text to make up the bulk of the card's content.</p>  
                                     </div> 
                                     <ul class="list-group list-group-flush"> 
                                         <li class="list-group-item">An item</li> 
                                         <li class="list-group-item">A second item</li> 
                                         <li class="list-group-item">A third item</li> 
                                     </ul> 
                                     <div class="card-body"> 
                                         <a href="#" class="card-link">Card link</a> 
                                         <a href="#" class="card-link">Another link</a> 
                                     </div> 
                                 </div> 
                                 <!-- BS card: End --> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
.box{
    margin-top:10px;
}
.container-fluid{
    color: #ECDFCC;
}
.profile-bar{
    display: block;
    align-items: center;
    text-align: center;
}

.profile-pic{
    width: 60%;
    height: auto;
}
.profile-name{
    color: #ecdfcc;
    padding-top: 10%;
}
.profile-tagline,svg{
    color: #ecdfcc;
}
.profile-location p, .profile-location svg{
    display:inline;
    color: #ecdfcc;
}
svg{
   height: 10%;
}
.bi-star{
    fill: yellow;
}
.more-description{
    margin-top:5%;
}
.profile-buttons{
    margin-top: 5%;
}
.button{
    color: #ecdfcc;
    border: solid white 1px;
    border-radius: 5px;
    font-size: 70%;
}

.cards {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  width: 100%;
}

.card {
  display: flex;
  flex-direction: row;
  flex: 0 0 40%;
  scroll-snap-align: start;
  width: 100%;
  background-color: #697565 !important;
}
.card-container{
    width: 100%;
    height: 20%;
    display: flex;
    overflow-x: scroll;
}
.reviewer-pic{
    display:inline;
}
.reviewer-name{
    display:inline;
    margin-right: 20px;
}
</style>