<script>
import NavBar from '../NavBar.vue'
</script>
<template>
    <NavBar></NavBar>
   <h1>Emergency Clinics Nearby </h1>
    <!--backend pull nearest clinics available and put them in card-->
    <!--hard coded, need to make it dynamic-->
    <div class="clinics">
                 
                    <div class="card-container">
                        <ul class="cards">
                            <li class="card">
                                   <!-- BS card: Start --> 
                                       <img src="../../assets/pet_clinic_1.jpeg" class="card-img-top" alt="pet-clinic-1"> 
                                       <div class="card-body"> 
                                           <h3 class="card-title"><b>Pets Avenue Veterinary Clinic</b></h3> 
                                           <p class="card-text">&#128205; 3 minutes away</p>  
                                           <p class="card-text">&#10003; Animal Emergency Services</p>  
                                           <p class="card-text">&#10003; Animal Dentistry Services</p>  
                                       </div> 
                                      
                                       <div class="card-body"> 
                                        <div class="buttons">
                                           <button class=" call">Call</button>
                                           <button class=" directions">Directions</button>
                                           <button class=" send">Send pet details</button>
                                        </div>
                                       </div> 
                                   
                                 <!-- BS card: End --> 
                            </li>
                            <li class="card">
                                   <!-- BS card: Start --> 
                                       <img src="../../assets/pet_clinic_1.jpeg" class="card-img-top" alt="pet-clinic-1"> 
                                       <div class="card-body"> 
                                           <h3 class="card-title"><b>Pets Avenue Veterinary Clinic</b></h3> 
                                           <p class="card-text">&#128205; 3 minutes away</p>  
                                           <p class="card-text">&#10003; Animal Emergency Services</p>  
                                           <p class="card-text">&#10003; Animal Dentistry Services</p>  
                                       </div> 
                                      
                                       <div class="card-body"> 
                                        <div class="buttons">
                                           <button class=" call">Call</button>
                                           <button class=" directions">Directions</button>
                                           <button class=" send">Send pet details</button>
                                        </div>
                                       </div> 
                                   
                                 <!-- BS card: End --> 
                            </li>
                            <li class="card">
                                   <!-- BS card: Start --> 
                                       <img src="../../assets/pet_clinic_1.jpeg" class="card-img-top" alt="pet-clinic-1"> 
                                       <div class="card-body"> 
                                           <h3 class="card-title"><b>Pets Avenue Veterinary Clinic</b></h3> 
                                           <p class="card-text">&#128205; 3 minutes away</p>  
                                           <p class="card-text">&#10003; Animal Emergency Services</p>  
                                           <p class="card-text">&#10003; Animal Dentistry Services</p>  
                                       </div> 
                                      
                                       <div class="card-body"> 
                                        <div class="buttons">
                                           <button class=" call">Call</button>
                                           <button class=" directions">Directions</button>
                                           <button class=" send">Send pet details</button>
                                        </div>
                                       </div> 
                                   
                                 <!-- BS card: End --> 
                            </li>
                            <li class="card">
                                   <!-- BS card: Start --> 
                                       <img src="../../assets/pet_clinic_1.jpeg" class="card-img-top" alt="pet-clinic-1"> 
                                       <div class="card-body"> 
                                           <h3 class="card-title"><b>Pets Avenue Veterinary Clinic</b></h3> 
                                           <p class="card-text">&#128205; 3 minutes away</p>  
                                           <p class="card-text">&#10003; Animal Emergency Services</p>  
                                           <p class="card-text">&#10003; Animal Dentistry Services</p>  
                                       </div> 
                                      
                                       <div class="card-body"> 
                                        <div class="buttons">
                                           <button class=" call">Call</button>
                                           <button class=" directions">Directions</button>
                                           <button class=" send">Send pet details</button>
                                        </div>
                                       </div> 
                                   
                                 <!-- BS card: End --> 
                            </li>
                            <li class="card">
                                   <!-- BS card: Start --> 
                                       <img src="../../assets/pet_clinic_1.jpeg" class="card-img-top" alt="pet-clinic-1"> 
                                       <div class="card-body"> 
                                           <h3 class="card-title"><b>Pets Avenue Veterinary Clinic</b></h3> 
                                           <p class="card-text">&#128205; 3 minutes away</p>  
                                           <p class="card-text">&#10003; Animal Emergency Services</p>  
                                           <p class="card-text">&#10003; Animal Dentistry Services</p>  
                                       </div> 
                                      
                                       <div class="card-body"> 
                                        <div class="buttons">
                                           <button class=" call">Call</button>
                                           <button class=" directions">Directions</button>
                                           <button class=" send">Send pet details</button>
                                        </div>
                                       </div> 
                                   
                                 <!-- BS card: End --> 
                            </li>
                          
                          </ul>
                    </div>
                </div>
</template>

<style>
h1{
    margin-left: 1vw;
}
.clinics{
    margin: auto 0;
    text-align: center;
}
 
.card-container{
    margin: 1%;
    max-width: 98vw;
    overflow-x:hidden;
    text-align: center;
    align-items: center;
}
.cards{
    align-items: center;
    text-align: center;
    margin: auto 0;
}
button{
    display:block;
}
.call, .directions , .send{
    background-color: #3C3D37;
    margin: 5px;
    border-radius: 15px;
    color: #ecdfcc;
    align-items: center;
}
.buttons{
    display:grid;
    align-items: center;
    text-align: center;
}
</style>
