<script>
import NavBar from '../NavBar.vue'
</script>
<template>
    <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></head>
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
                                        <div class="card-top">                                     
                                        <img src="../../assets/reviewer1_pic.png" class="reviewer-pic">
                                        <div class="reviewer-info">
                                        <h1 class="reviewer-name">DogLover</h1> 
                                        <div class="stars">
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <span class="fa fa-star"></span>
                                        </div>
                                    </div>
                                    </div> 
                                     </div> 
                                     <div class="card-body"> 
                                         <p>I got Cat Woman to dogsit my puppy for 2 weeks and my pup was very well taken care of. 10/10 service provided and updates provided regularly. </p>
                                         <div class="review-photos">
                                            <img class="review-photo" src="../../assets/dog_sitting.jpg">
                                         </div>
                                     </div> 
                                 </div> 
                                 <!-- BS card: End --> 
                            </li>
                            <li class="card">
                                 <!-- BS card: Start --> 
                                 <div class="card-div" > 
                                     <div class="card-body"> 
                                        <div class="card-top">                                     
                                        <img src="../../assets/reviewer1_pic.png" class="reviewer-pic">
                                        <div class="reviewer-info">
                                        <h1 class="reviewer-name">DogLover</h1> 
                                        <div class="stars">
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <span class="fa fa-star"></span>
                                        </div>
                                    </div>
                                    </div> 
                                     </div> 
                                     <div class="card-body"> 
                                         <p>I got Cat Woman to dogsit my puppy for 2 weeks and my pup was very well taken care of. 10/10 service provided and updates provided regularly. </p>
                                         <div class="review-photos">
                                            <img class="review-photo" src="../../assets/dog_sitting.jpg">
                                         </div>
                                     </div> 
                                 </div> 
                                 <!-- BS card: End --> 
                            </li>
                            
                            <li class="card">
                                 <!-- BS card: Start --> 
                                 <div class="card-div" > 
                                     <div class="card-body"> 
                                        <div class="card-top">                                     
                                        <img src="../../assets/reviewer1_pic.png" class="reviewer-pic">
                                        <div class="reviewer-info">
                                        <h1 class="reviewer-name">DogLover</h1> 
                                        <div class="stars">
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <span class="fa fa-star"></span>
                                        </div>
                                    </div>
                                    </div> 
                                     </div> 
                                     <div class="card-body"> 
                                         <p>I got Cat Woman to dogsit my puppy for 2 weeks and my pup was very well taken care of. 10/10 service provided and updates provided regularly. </p>
                                         <div class="review-photos">
                                            <img class="review-photo" src="../../assets/dog_sitting.jpg">
                                         </div>
                                     </div> 
                                 </div> 
                                 <!-- BS card: End --> 
                            </li>
                            <li class="card">
                                 <!-- BS card: Start --> 
                                 <div class="card-div" > 
                                     <div class="card-body"> 
                                        <div class="card-top">                                     
                                        <img src="../../assets/reviewer1_pic.png" class="reviewer-pic">
                                        <div class="reviewer-info">
                                        <h1 class="reviewer-name">DogLover</h1> 
                                        <div class="stars">
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <span class="fa fa-star"></span>
                                        </div>
                                    </div>
                                    </div> 
                                     </div> 
                                     <div class="card-body"> 
                                         <p>I got Cat Woman to dogsit my puppy for 2 weeks and my pup was very well taken care of. 10/10 service provided and updates provided regularly. </p>
                                         <div class="review-photos">
                                            <img class="review-photo" src="../../assets/dog_sitting.jpg">
                                         </div>
                                     </div> 
                                 </div> 
                                 <!-- BS card: End --> 
                            </li>  <li class="card">
                                 <!-- BS card: Start --> 
                                 <div class="card-div" > 
                                     <div class="card-body"> 
                                        <div class="card-top">                                     
                                        <img src="../../assets/reviewer1_pic.png" class="reviewer-pic">
                                        <div class="reviewer-info">
                                        <h1 class="reviewer-name">DogLover</h1> 
                                        <div class="stars">
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <span class="fa fa-star"></span>
                                        </div>
                                    </div>
                                    </div> 
                                     </div> 
                                     <div class="card-body"> 
                                         <p>I got Cat Woman to dogsit my puppy for 2 weeks and my pup was very well taken care of. 10/10 service provided and updates provided regularly. </p>
                                         <div class="review-photos">
                                            <img class="review-photo" src="../../assets/dog_sitting.jpg">
                                         </div>
                                     </div> 
                                 </div> 
                                 <!-- BS card: End --> 
                            </li>  <li class="card">
                                 <!-- BS card: Start --> 
                                 <div class="card-div" > 
                                     <div class="card-body"> 
                                        <div class="card-top">                                     
                                        <img src="../../assets/reviewer1_pic.png" class="reviewer-pic">
                                        <div class="reviewer-info">
                                        <h1 class="reviewer-name">DogLover</h1> 
                                        <div class="stars">
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <span class="fa fa-star"></span>
                                        </div>
                                    </div>
                                    </div> 
                                     </div> 
                                     <div class="card-body"> 
                                         <p>I got Cat Woman to dogsit my puppy for 2 weeks and my pup was very well taken care of. 10/10 service provided and updates provided regularly. </p>
                                         <div class="review-photos">
                                            <img class="review-photo" src="../../assets/dog_sitting.jpg">
                                         </div>
                                     </div> 
                                 </div> 
                                 <!-- BS card: End --> 
                            </li>  <li class="card">
                                 <!-- BS card: Start --> 
                                 <div class="card-div" > 
                                     <div class="card-body"> 
                                        <div class="card-top">                                     
                                        <img src="../../assets/reviewer1_pic.png" class="reviewer-pic">
                                        <div class="reviewer-info">
                                        <h1 class="reviewer-name">DogLover</h1> 
                                        <div class="stars">
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <span class="fa fa-star"></span>
                                        </div>
                                    </div>
                                    </div> 
                                     </div> 
                                     <div class="card-body"> 
                                         <p>I got Cat Woman to dogsit my puppy for 2 weeks and my pup was very well taken care of. 10/10 service provided and updates provided regularly. </p>
                                         <div class="review-photos">
                                            <img class="review-photo" src="../../assets/dog_sitting.jpg">
                                         </div>
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

/* For the scrolling elements */

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
.card-top{
    display:flex;
    text-align:left;
}
.reviewer-pic{
    display:inline;
}
.reviewer-name{
    display:inline;
    margin-left: 20px;
    margin: 0;
}
.reviewer-info{
    margin-left: 20px;
}
.review-photo{
    width: 30%;
}
/* for the stars */
.stars{
    margin-top: 5px;
}
.checked{
    color: orange;
}


</style>