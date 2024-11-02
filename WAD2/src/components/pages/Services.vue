<script>
import NavBar from '../NavBar.vue'
import axios from 'axios';

export default {
    data () {
        return {
            isPetOwner: true,
            alerttext: '',
            currentPage: 'Find Services',
            iscurrentPage: [true,false,false,true,false,false],
            calendarId: 'c_0f2f898c6a3672acfdbe678ec1574c61105132ce603d502fd0b4ea49fb1410fa@group.calendar.google.com',
            timeZone: 'Asia/Singapore',
            showButton: false,
            reqServiceType: false,
            currServicePage: 'mainServicesPage',
            confirmPopup: false,
            events: [],
        };
    },
    props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
  },
    methods: {
        toggle() {
            if (this.isPetOwner) {
                this.isPetOwner = false;
                this.currentPage= 'Find Jobs';
            }
            else {
                this.isPetOwner = true;
                this.currentPage= 'Find Services';
            }
        },
        showalert() {
            if (this.isPetOwner) {
                this.alerttext = 'Pet Owner'
            }
            else {
                this.alerttext = 'Service Provider'
            }
            alert('You are changing the service mode to ' + this.alerttext)
        },
        checkpage(index) {
            this.iscurrentPage = [false,false,false,false,false,false];
            if (index === 0 || index === 3) {
                this.iscurrentPage[0] = true;
                this.iscurrentPage[3] = true;
            }
            else {
                this.iscurrentPage[index] = true;
            }
        },
        showbutton() {
            if (!this.showButton) {
                this.showButton=true;
            }
        },
        showServiceTypes() {
            if (!this.reqServiceType) {
                this.reqServiceType=true;
            }
            else {
                this.reqServiceType=false;
            }
        },
        handleAuthClick() {
      // Access the Google Auth instance from the global variable
      const authInstance = window.gapiAuthInstance;

      if (authInstance) {
        authInstance.signIn().then(() => {
          console.log('User signed in');
        }).catch((error) => {
          console.error('Error signing in:', error);
        });
      } else {
        console.error('Google Auth instance not initialized');
      }
    },
        listUpcomingEvents() {
        gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
      }).then((response) => {
        const events = response.result.items;
        this.events = events;
        if (events.length > 0) {
          console.log('Upcoming events:', events);
        } else {
          console.log('No upcoming events found.');
        }
      });
    },
    handleClick() {
      alert(`You clicked on this card`);
    },
  },
    computed: {
        calendarSrc() {
            return 'https://calendar.google.com/calendar/embed?src='+ this.calendarId + '&ctz=' + this.timeZone
        },
    },

}

</script>
<style>
    .ServiceNavBar {
        color: #ECDFCC;
        padding-left: 15px;
        background-color: #1a1a1a;
        
    }
    .PetOwner {
        display:inline-block;
        background-color:white;
        border-radius:50%;
        padding: 8px;
        z-index: 1;
        position:relative;
        right: 58px;
        bottom: 6px;
        border:3px solid darkgreen;
    }
    .ServiceProvider {
        display:inline-block;
        background-color:white;
        border-radius:50%;
        padding: 8px;
        z-index: 1;
        position:relative;
        right:23px;
        bottom:6px;
        border: 3px solid darkgreen;
    }
    .buttonBackground { 
        background-color:#697565;
        display: inline-flex;
        z-index: 0;
        width: 60px;
        color:#697565;
        border-radius:9999px;
        text-align:left;
    }
    p {
        display:inline-block;
        padding-right: 20px;
        color: grey;
        
    }
    .CurrentlyOwner {
        color: #ECDFCC;
    }
    .mainbody {
        border-top: 3px solid #697565;
        color: #ECDFCC;
        width:99.5%;
        margin:auto;
    }
    .ServicePage {
        background-color: #242424;
    }
    .curPage {
        display:inline-block;
        border-top: 3px solid #697565;
        border-left: 3px solid #697565;
        border-right: 3px solid #697565;
        border-bottom: 3px solid #242424;
        background-color: #242424;
        position:relative;
        height:50px;
        top: 5px;
        padding-top:5px;
        transition:  border-color 0.5s ease;
    }
    .calendar-container {
        margin-top: 20px;
        margin-left: 20px; 
    }
    .addIcon {
        border-color: #697565;
        background-color:#242424;
        color: #242424;
        border-radius: 50%;
        margin-right: 10px;
    }
    .jobButton {
        position: absolute;
        margin-left: 20%;
        border: 3px solid #697565;
        border-radius: 15px;  
    }  
    .createJobForm {
        position:relative;
        left:57.5%;
        bottom: 805px;
        border: 3px solid #697565;
        border-radius: 15px; 
        padding: 20px;
        width:35%;
        align-content:center;
        box-shadow:10px 10px 5px  rgb(71, 71, 71);
    }
    .jobsubmit {
        position:relative;
        left: 85%;
    }
    .searchbar {
        padding-left: 10px;
        display:inline-block;
    }
    .filterbar {
        margin-left: 3%;
        display:inline-block;
    }
    .getRecommendations {
        margin-left:3%;
        display:inline-block;
        padding:10px;
    }
    .filteroption {
        margin-left: 20px;
    }
    .extrafilteroptions {
        display:inline-block;
        border: 2px solid #697565;
        margin-left:10px;
        padding-right: 20px;
        border-radius:8px;
    }
    .FindServicesSearchBar {
        border-bottom: 3px solid #464545;

    }
    .cfmPopup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgb(0,0,0,0.5);
        justify-content: center;
        align-items: center;
    }
    .popupContent {
        background-color: #242424;
        padding: 20px;
        border-radius: 8px;
        text-align:center;
        border: 3px solid #697565;
        margin:auto;
        width:20%;
        margin-top:400px;
    }
    .card-text {
        color: #ECDFCC;
        border-bottom: 3px solid #697565;
        width: 100%;
    }
</style>
<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet"> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <NavBar></NavBar>
    <div class="ServicePage">
    <div class="ServiceNavBar"> <!-- Nav Bar for service page-->
    <span>
        <p :class="{CurrentlyOwner:isPetOwner}">Pet Owner </p>
            <div class="buttonBackground">#</div>
            <button @click="toggle(); showalert()" :class="{PetOwner:isPetOwner, ServiceProvider:!isPetOwner}"></button>
        <p :class="{CurrentlyOwner:!isPetOwner}">Service Provider </p>
    </span>
        <div v-if="isPetOwner" style="display:inline">
            <span>
                <button @click="currentPage = 'Find Services';checkpage(0)" :class="{curPage:iscurrentPage[0]}" style="display:inline-block">Find Services</button>
                <button @click="currentPage = 'Post Jobs';checkpage(1)" :class="{curPage:iscurrentPage[1]}" style="display:inline-block">Post Jobs</button>
                <button @click="currentPage = 'Current Services';checkpage(2)" :class="{curPage:iscurrentPage[2]}" style="display:inline-block">Current Services</button>
            </span>
        </div>
        <div v-else-if="!isPetOwner" style="display:inline">
            <span>
                <button @click="currentPage = 'Find Jobs';checkpage(3)" :class="{curPage:iscurrentPage[3]}" style="display:inline-block">Find Jobs</button>
                <button @click="currentPage = 'Post Services';checkpage(4)" :class="{curPage:iscurrentPage[4]}" style="display:inline-block">Post Services</button>
                <button @click="currentPage = 'Current Jobs';checkpage(5)" :class="{curPage:iscurrentPage[5]}" style="display:inline-block">Current Jobs</button>
            </span>
        </div>
    </div>
    <div class="mainbody"> <!-- main page body-->
        <div v-if="currentPage === 'Find Services'"> <!--Pet Owner: Find Services-->
            <div class="MainServicesPage" v-if="currServicePage==='mainServicesPage'">
            <div class="FindServicesSearchBar"> <!--Search button, filter button , get recommendation button-->
                <div class="searchbar">
                    <input type="text" placeholder="Search" id="search" style="border-radius:8px;">
                    <label for="search"><img src="../../../public/img/searchicon.png" style="width:30px; padding-bottom:1px; margin-left:5px;"></label>
                </div>
                <div class="filterbar">
                    Filter by:
                    <label><input type="checkbox" name="filterBys" class="filteroption"> Popularity</label>
                    <label><input type="checkbox" name="filterBys" class="filteroption"> Most Recent</label>
                    <label><input type="checkbox" name="filterBys" class="filteroption" @click="showServiceTypes()"> Service Types</label>
                    <div v-if="reqServiceType" class="extrafilteroptions">
                        <label><input type="checkbox" name="filterBys" class="filteroption"> Pet Sitter</label>
                        <label><input type="checkbox" name="filterBys" class="filteroption"> Pet Walker</label>
                        <label><input type="checkbox" name="filterBys" class="filteroption"> Pet Groomer</label>
                        <label><input type="checkbox" name="filterBys" class="filteroption"> Pet Trainer</label>
                    </div>
                </div>
                <div class="getRecommendations">
                    <button style="font-size:medium;border-radius:8px; border: 2px solid #697565" @click="currServicePage = 'Recommendations Page'">Get Recommendations</button>
                </div>
            </div>   
            </div>
            <div class="RecommendationsPage" v-else-if="currServicePage==='Recommendations Page'" > <!--when button 'Get Recommendations' is clicked-->
                <div>
                    <button @click="currServicePage = 'mainServicesPage'" style="background-color: #242424;"><img src="../../../public/img/arrow-121-16.png"> Go back</button>
                </div>
                <div class="calendar-container" style="display:inline-block;width:50%">
                <iframe
                :src="calendarSrc"
                style="border: 3px solid #697565"
                width="100%"
                height="800px"
                frameborder="0"
                scrolling="no"
                ></iframe>
                </div>
                <div style="display:inline-block; vertical-align: top;width:48%; text-align:center;">This is for user to select dates and time and the database gives back those which matches </div>
            </div> 
            <div> <!--Find Services (Service listings using cards)-->
                <div class="card col-3" style="width: 20rem;height: 33rem; background-color: #464545; border: 3px solid #697565; color: white; border-radius: 15px; margin-top: 10px;"> <!--One card-->
                    <img src="../../../public/img/AYWg3iu-dog-pictures-wallpaper.jpg" class="card-img-top" alt="Card Image" style="border: 3px solid #697565"/>
                    <div class="card-body">
                    <h5 class="card-title">Pet Sitter needed</h5>
                    <p class="card-text">
                        <div>Type of service needed: 
                            <ul>
                                <li>Pet Sitter</li>
                                <li>Pet Walker</li>
                            </ul>
                        </div>
                        <div>Address: 123homeroad </div>
                        <div>Contact details: 12345678</div>
                    </p>
                    <a href="#" class="btn btn-primary" @click.prevent="handleClick" style="border:3px solid #697565; background-color: #242424;">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-else-if="currentPage === 'Post Jobs'" class="postJob"> <!--Pet Owner: Post Job-->
            <div class="calendar-container">
                <iframe
                :src="calendarSrc"
                style="border: 3px solid #697565"
                width="50%"
                height="800px"
                frameborder="0"
                scrolling="no"
                ></iframe>
                <button v-if="!showButton" @click="showbutton()" class="jobButton"><span class="addIcon">## </span><span style="position:relative; right:27px; bottom:2px;">+</span>Create a new Job</button>
            </div>
                
            <div v-if="showButton" class="createJobForm"> <!--Create a new job listing-->
                <!--<form action="/submit-form" method="POST"> -->
                    <h1 style="text-align:center;">New Job Listing</h1>
                    <div style="border: 1.5px solid #697565; margin-bottom:5px;"></div>
                    <label for="Name" class="col-6">Name:</label> <!--going to make this fixed-->
                    <label for="Title" class="col-6">Title:</label>
                    <input type="text" id="Name" name="Name" style="width:45%">
                    <input type="text" id="Title" name="Title" style="width:50%; margin-left: 30px;">
                    <div style="padding-top: 5px;">Type of service needed:<br></div>
                    <label class="col-3"><input type="checkbox"  name="ServiceCheckBox"> Pet Sitter</label>
                    <label class="col-3"><input type="checkbox"  name="ServiceCheckBox"> Pet Walker</label>
                    <label class="col-3"><input type="checkbox"  name="ServiceCheckBox"> Pet Groomer</label>
                    <label class="col-3"><input type="checkbox"  name="ServiceCheckBox"> Pet Trainer</label>
                    <div style="padding-top: 5px;">Special requirements:<br></div>
                    <textarea id="SpecialRequirements" name="SpecialRequirements" class="col-12" rows="5"></textarea>
                    <label for="Address" class="col-6">Address:</label>
                    <label for="Contact" class="col-6">Contact number:</label>
                    <input type="text" id="Address" name="Address" style="width:45%">
                    <input type="text" id="Contact" name="Contact" style="width:50%; margin-left: 30px;" >
                    <label for="StartDate" class="col-6" style="padding-top:5px;">Start Date:</label>
                    <label for="EndDate" class="col-6" style="padding-top:5px;">End Date:</label>
                    <input type="date" id="StartDate" name="StartDate" style="width:45%" >
                    <input type="date" id="EndDate" name="EndDate" style="width:50%; margin-left: 30px;" >
                    <label for="Duration" class="col-6" style="padding-top:5px;">Duration(hrs):</label>
                    <label for="Payment" class="col-6" style="padding-top:5px;">Payment(/hr):</label>
                    <input type="number" id="Duration" name="Duration" style="width:45%" >
                    <input type="number" id="Payment" name="Payment" style="width:50%; margin-left: 30px;" >
                    <span class="jobsubmit col-12"><button type="submit" style="margin-top:8px; border: 3px solid #697565; border-radius: 8px;" @click="confirmPopup = true">Create</button></span>
             <!--   </form> -->
            </div>
            <div v-if="confirmPopup" class="cfmPopup">
                <div class="popupContent">
                    <p style="color:#ECDFCC">Job listing submitted. Would you like to make another listing?</p>
                    <button @click="showButton = false;confirmPopup=false" style="margin-right:200px; border-radius:8px; border: 3px solid #697565">Yes</button>
                    <button @click="confirmPopup=false" style="border-radius:8px; border: 3px solid #697565">No</button>
                </div>
            </div>
        </div>

        <div v-else-if="currentPage === 'Current Services'"> <!--Pet Owner: Current Services-->
            <div style="border-bottom: 3px solid #464545; padding-bottom: 10px;"> <!--All created, non expired job listings-->
                <h1 style="margin-top: 10px;margin-left:5px;">My listings</h1>
                <div class="card col-3" style="width: 20rem;height: 27rem; background-color: #464545; border: 3px solid #697565; color: white; border-radius: 15px; margin-top: 10px;"> <!--One card-->
                    <img src="../../../public/img/AYWg3iu-dog-pictures-wallpaper.jpg" class="card-img-top" alt="Card Image" style="border: 3px solid #697565"/>
                    <div class="card-body">
                        <h5 class="card-title">Pet Sitter needed</h5>
                        <p class="card-text">
                            Start Date: 17/10/2024 <br>
                            End Date: 17/10/2024 <br>
                            Duration: 5hrs
                            <button style="border-radius:8px; border: 3px solid #697565;margin-top:10px;margin-bottom:10px;">Cancel listing</button> <!--deletes this job listing from database-->
                        </p>
                    </div>
                </div>
            </div>

            <div> <!--Completed / Cancelled / Expired listings-->
                <h1 style="margin-top: 10px;margin-left:5px;">Past listings</h1>
                <div class="card" style="width: 20rem;height: 27rem; background-color: #464545; border: 3px solid green; color: white; border-radius: 15px; margin-top: 10px; display:inline-block;"> <!--One card-->
                    <img src="../../../public/img/AYWg3iu-dog-pictures-wallpaper.jpg" class="card-img-top" alt="Card Image" style="border: 3px solid #697565"/>
                    <div class="card-body">
                        <h5 class="card-title">Pet Sitter needed</h5>
                        <p class="card-text">
                            Start Date: 17/10/2024 <br>
                            End Date: 17/10/2024 <br>
                            Duration: 5hrs
                            <button style="border-radius:8px; border: 3px solid #697565;margin-top:10px;margin-bottom:10px;">Cancel listing</button> <!--deletes this job listing from database-->
                        </p>
                    </div>
                </div>
                <div class="card" style="width: 20rem;height: 27rem; background-color: #464545; border: 3px solid red; color: white; border-radius: 15px; margin-top: 10px; display:inline-block; margin-left: 10px;"> <!--One card-->
                    <img src="../../../public/img/AYWg3iu-dog-pictures-wallpaper.jpg" class="card-img-top" alt="Card Image" style="border: 3px solid #697565"/>
                    <div class="card-body">
                        <h5 class="card-title">Pet Sitter needed</h5>
                        <p class="card-text">
                            Start Date: 17/10/2024 <br>
                            End Date: 17/10/2024 <br>
                            Duration: 5hrs
                            <button style="border-radius:8px; border: 3px solid #697565;margin-top:10px;margin-bottom:10px;">Cancel listing</button> <!--deletes this job listing from database-->
                        </p>
                    </div>
                </div>
                <div class="card" style="width: 20rem;height: 27rem; background-color: #464545; border: 3px solid yellow; color: white; border-radius: 15px; margin-top: 10px; display:inline-block; margin-left: 10px;"> <!--One card-->
                    <img src="../../../public/img/AYWg3iu-dog-pictures-wallpaper.jpg" class="card-img-top" alt="Card Image" style="border: 3px solid #697565"/>
                    <div class="card-body">
                        <h5 class="card-title">Pet Sitter needed</h5>
                        <p class="card-text">
                            Start Date: 17/10/2024 <br>
                            End Date: 17/10/2024 <br>
                            Duration: 5hrs
                            <button style="border-radius:8px; border: 3px solid #697565;margin-top:10px;margin-bottom:10px;">Cancel listing</button> <!--deletes this job listing from database-->
                        </p>
                    </div>
                </div>
            </div>
            <div> <!--Currently ongoing listings, this means that service provider is currently completing the job-->

            </div>
        </div>

        <div v-else-if="currentPage === 'Find Jobs'"> <!--Service Provider: Find Jobs-->
            this is find jobs
        </div>

        <div v-else-if="currentPage === 'Post Services'"> <!--Service Provider: Post Services-->
            this is to create services
            <div>
                <h1>Google Calendar Services</h1>
                <button @click="handleAuthClick">Sign in with Google</button>
                <button @click="listUpcomingEvents">Show Upcoming Events</button>

                <div v-if="events.length">
                <h3>Upcoming Events:</h3>
                <ul>
                    <li v-for="event in events" :key="event.id">
                    {{ event.summary }} - {{ event.start.dateTime }}
                    </li>
                </ul>
                </div>
            </div>

        </div>

        <div v-else-if="currentPage === 'Current Jobs'"> <!--Service Provider: Current Jobs-->
            this is to view past and ongoing jobs
        </div>
    
    </div>
    </div>
</template>