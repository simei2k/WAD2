<script>
import NavBar from '../NavBar.vue'
import axios from 'axios';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import  db  from '../../../database';
import { collection, query, where, addDoc, getDocs, deleteDoc, Timestamp, writeBatch, DocumentSnapshot, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

export default {
    data () {
        return {
            isPetOwner: true,
            alerttext: '',
            currentPage: 'Find Services',
            iscurrentPage: [true,false,false,true,false,false],
            showButton: false,
            reqServiceType: false,
            currServicePage: 'mainServicesPage',
            currJobPage: 'MainJobsPage',
            confirmPopup: false,
            jobevents: [],
            serviceevents: [],
            allservices: [],
            alljobs: [],
            myjobs: [],
            myservices: [],
            myongoingjobs: [],
            myongoingservices: [],
            mypastjobs: [],
            mypastservices: [],
            showModal: false,
            newEvent: {
                name: '',
                title: '',
                image: '../../../public/img/dCRkonw-cute-dog-wallpaper.jpg',
                serviceTypeReq: [],
                specialReq:'',
                address: '',
                contactNum: '',
                startDateTime: '',
                endDateTime: '',
                payment: '',
                status: '',
            },
            newEventService: {
                name: '',
                title: '',
                image: '../../../public/img/petwalker.jpg',
                serviceTypeReq: [],
                skillsExp:'',
                address: '',
                contactNum: '',
                startDateTime: '',
                endDateTime: '',
                payment: '',
                status: '',
            },
            PetOwnerName: "PetOwnerF", //need to connect to login so every calendar and my listings page are to the person
            ServiceProviderName: "ServiceProviderF", //need to connect to login so every calendar and my listings page are to the person
            }
    },
    props: {
    
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
        showconfirmPopup() {
            this.confirmPopup = true;
        },
        async addJob() {
            try {
                const eventRef = await addDoc(collection(db,'jobs'), {
                    name: this.newEvent.name,
                    title: this.newEvent.title,
                    image: '../../../public/img/dCRkonw-cute-dog-wallpaper.jpg',
                    serviceTypeReq: this.newEvent.serviceTypeReq,
                    specialReq: this.newEvent.specialReq,
                    address: this.newEvent.address,
                    contactNum: this.newEvent.contactNum,
                    start: this.newEvent.startDateTime,
                    end: this.newEvent.endDateTime,
                    payment: this.newEvent.payment,
                    status: '',
                    documentId: '',
                });
                await updateDoc(eventRef, {
                    documentId: eventRef.id,
                });
                console.log("Document written with ID: ", eventRef.id)
                this.newEvent = {
                    name: '',
                title: '',
                image: '../../../public/img/dCRkonw-cute-dog-wallpaper.jpg',
                serviceTypeReq: [],
                specialReq:'',
                address: '',
                contactNum: '',
                startDateTime: '',
                endDateTime: '',
                payment: '',
                status: '',
                documentId: '',
                };
            } catch (e) {
                console.error("Error adding document: ",e);
            }
        },
        async addService() {
            try {
                const eventRef = await addDoc(collection(db,'services'), {
                    name: this.newEventService.name,
                    title: this.newEventService.title,
                    image: '../../../public/img/petsitter.jpg',
                    serviceTypeReq: this.newEventService.serviceTypeReq,
                    skillsExp: this.newEventService.skillsExp,
                    address: this.newEventService.address,
                    contactNum: this.newEventService.contactNum,
                    start: this.newEventService.startDateTime,
                    end: this.newEventService.endDateTime,
                    payment: this.newEventService.payment,
                    status: '',
                    documentId: '',
                });
                await updateDoc(eventRef, {
                    documentId: eventRef.id,
                });
                console.log("Document written with ID: ", eventRef.id)
                this.newEventService = {
                    name: '',
                    title: '',
                    image: '../../../public/img/petsitter.jpg',
                    serviceTypeReq: [],
                    skillsExp:'',
                    address: '',
                    contactNum: '',
                    startDateTime: '',
                    endDateTime: '',
                    payment: '',
                    status: '',
                    documentId: '',
                };
            } catch (e) {
                console.error("Error adding document: ",e);
            }
        },
        async getIndivEvents() {
            try{
            const q = query(collection(db,'jobs'), where ('name', '==', this.PetOwnerName))
            const querySnapshot = await getDocs(q);
            this.jobevents = querySnapshot.docs.map(doc => {
                const data = doc.data() ;
                const start = data.start.replace('T', ' ');
                const end = data.end.replace('T', ' ');
                return {
                title: data.title,
                start: start,
                end: end,
                };
            });
            console.log("Filtered job events:", this.jobevents);
        } catch (error) {
            console.error("Error fetching events: ", error);
            }
        },
        async getIndivEventsService() {
            try{
            const q = query(collection(db,'services'), where ('name', '==', this.ServiceProviderName))
            const querySnapshot = await getDocs(q);
            this.serviceevents = querySnapshot.docs.map(doc => {
                const data = doc.data() ;
                const start = data.start.replace('T', ' ');
                const end = data.end.replace('T', ' ');
                return {
                title: data.title,
                start: start,
                end: end,
                };
            });
            console.log("Filtered job events:", this.serviceevents);
        } catch (error) {
            console.error("Error fetching events: ", error);
            }
        },
        async getmyjobs() {
            try {
                const getdatabyname = query(collection(db,'jobs'), where ('name','==', this.PetOwnerName))
                const querySnapshot = await getDocs(getdatabyname);
                this.myjobs = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const start = data.start.replace('T', ' ');
                    const end = data.end.replace('T', ' ');
                    return {
                    title: data.title,
                    start: start,
                    end: end,
                    name: data.name,
                    image: data.image,
                    serviceTypeReq: data.serviceTypeReq,
                    specialReq:data.specialReq,
                    address: data.address,
                    contactNum: data.contactNum,
                    payment: data.payment,
                    status: data.status,
                    documentId: data.documentId,
                    };
                });
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        },
        async getmyservices() {
            try {
                const getdatabyname = query(collection(db,'services'), where ('name','==', this.ServiceProviderName))
                const querySnapshot = await getDocs(getdatabyname);
                this.myservices = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const start = data.start.replace('T', ' ');
                    const end = data.end.replace('T', ' ');
                    return {
                    title: data.title,
                    start: start,
                    end: end,
                    name: data.name,
                    image: data.image,
                    serviceTypeReq: data.serviceTypeReq,
                    skillsExp:data.skillsExp,
                    address: data.address,
                    contactNum: data.contactNum,
                    payment: data.payment,
                    status: data.status,
                    documentId: data.documentId,
                    };
                });
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        },
        async getmypastjobs() {
            try {
                const getdatabyname = query(collection(db,'pastjobs'), where ('name','==', this.PetOwnerName))
                const querySnapshot = await getDocs(getdatabyname);
                this.mypastjobs = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const start = data.start.replace('T', ' ');
                    const end = data.end.replace('T', ' ');
                    return {
                    title: data.title,
                    start: start,
                    end: end,
                    name: data.name,
                    image: data.image,
                    serviceTypeReq: data.serviceTypeReq,
                    specialReq:data.specialReq,
                    address: data.address,
                    contactNum: data.contactNum,
                    payment: data.payment,
                    status: data.status,
                    documentId: data.documentId,
                    };
                });
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        },
        async getmypastservices() {
            try {
                const getdatabyname = query(collection(db,'pastservices'), where ('name','==', this.ServiceProviderName))
                const querySnapshot = await getDocs(getdatabyname);
                this.mypastservices = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const start = data.start.replace('T', ' ');
                    const end = data.end.replace('T', ' ');
                    return {
                    title: data.title,
                    start: start,
                    end: end,
                    name: data.name,
                    image: data.image,
                    serviceTypeReq: data.serviceTypeReq,
                    skillsExp:data.skillsExp,
                    address: data.address,
                    contactNum: data.contactNum,
                    payment: data.payment,
                    status: data.status,
                    documentId: data.documentId,
                    };
                });
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        },
        async transferExpiredJob() {
            const fromCollectionRef=collection(db,'jobs');
            const toCollectionRef=collection(db,'pastjobs');
            const today = new Date();
            try {
                const snapshot = await getDocs(fromCollectionRef);

                if (snapshot.empty) {
                    console.log('No matching documents found.');
                    return;
                }

                const batch = writeBatch(db);
                snapshot.forEach(DocumentSnapshot => {
                    const data = DocumentSnapshot.data();

                    const docDate = new Date(data.end);

                    if (docDate < today) {
                        const destinationDocRef = doc(toCollectionRef, DocumentSnapshot.id);
                        batch.set(destinationDocRef,data, {merge: true});
                        batch.update(destinationDocRef, {status: 'expired'});
                        batch.delete(DocumentSnapshot.ref)
                    }
                });
                await batch.commit();
                console.log(`Transferred ${snapshot.size} documents.`);
            } catch (error) {
                console.log("Error transferring documents:", error);
            }
        },
        async transferExpiredService() {
            const fromCollectionRef=collection(db,'services');
            const toCollectionRef=collection(db,'pastservices');
            const today = new Date();
            try {
                const snapshot = await getDocs(fromCollectionRef);

                if (snapshot.empty) {
                    console.log('No matching documents found.');
                    return;
                }

                const batch = writeBatch(db);
                snapshot.forEach(DocumentSnapshot => {
                    const data = DocumentSnapshot.data();

                    const docDate = new Date(data.end);

                    if (docDate < today) {
                        const destinationDocRef = doc(toCollectionRef, DocumentSnapshot.id);
                        batch.set(destinationDocRef,data, {merge: true});
                        batch.update(destinationDocRef, {status: 'expired'});
                        batch.delete(DocumentSnapshot.ref)
                    }
                });
                await batch.commit();
                console.log(`Transferred ${snapshot.size} documents.`);
            } catch (error) {
                console.log("Error transferring documents:", error);
            }
        },
        async cancelService(id) {
        try {
                
                const fromCollectionRef = doc(db, 'services', id);
                const docSnap = await getDoc(fromCollectionRef);

                if (docSnap.exists()) {
                    await updateDoc(fromCollectionRef, {
                        status: 'cancelled'
                    });
                    console.log('Status updated to "cancelled".');

                    const updatedDocSnap = await getDoc(fromCollectionRef);
                    console.log('Updated document:', updatedDocSnap.data());

                    const toCollectionRef = doc(db, 'pastservices', id);
                    await setDoc(toCollectionRef, updatedDocSnap.data());
                    await deleteDoc(fromCollectionRef);
                    
                } else {
                    console.log("No such document");
                }
            } catch (error) {
                console.error('Error transferring service:', error);
            }
        },
        async cancelJob(id) {
            try {
                
                const fromCollectionRef = doc(db, 'jobs', id);
                const docSnap = await getDoc(fromCollectionRef);

                if (docSnap.exists()) {
                    await updateDoc(fromCollectionRef, {
                        status: 'cancelled'
                    });
                    console.log('Status updated to "cancelled".');

                    const updatedDocSnap = await getDoc(fromCollectionRef);
                    console.log('Updated document:', updatedDocSnap.data());

                    const toCollectionRef = doc(db, 'pastjobs', id);
                    await setDoc(toCollectionRef, updatedDocSnap.data());
                    await deleteDoc(fromCollectionRef);
                    
                } else {
                    console.log("No such document");
                }
            } catch (error) {
                console.error('Error transferring service:', error);
            }
        },

    },

       
    computed: {
    },
    components: {
    VueCal,
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
    }
    .addIcon {
        border-color: #697565;
        background-color:#242424;
        color: #242424;
        border-radius: 50%;
        margin-right: 10px;
    }
    .jobButton {
        border: 3px solid #697565;
        border-radius: 15px;  
        justify-content: center;
        display:flex;
    }  
    .createJobForm {
        border: 3px solid #697565;
        border-radius: 15px; 
        padding: 20px;
        width:35%;
        align-content:center;
        box-shadow:10px 10px 5px  rgb(71, 71, 71);
        
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
    .FindServicesSearchBar{
        border-bottom: 3px solid #464545;
    }
    .FindJobsSearchBar{
        border-bottom: 3px solid #464545;
    }
    .cfmPopup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgb(0,0,0,0.5);
    }
    .popupContent {
        background-color: #242424;
        padding: 20px;
        border-radius: 8px;
        text-align:center;
        border: 3px solid #697565;
        margin:auto;
        width:20%;
        
    }
    .card-text {
        color: #ECDFCC;
        width: 100%;
    }
    .card {
        overflow-y:auto;
        padding:16px;
        border-radius:8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .reloadButton {
        border-radius: 8px;
        border:solid 3px #697565;
        position: absolute;
        top:150px;
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
                <button @click="currentPage = 'Current Services';checkpage(2)" :class="{curPage:iscurrentPage[2]}" style="display:inline-block">My listings</button>
            </span>
        </div>
        <div v-else-if="!isPetOwner" style="display:inline">
            <span>
                <button @click="currentPage = 'Find Jobs';checkpage(3)" :class="{curPage:iscurrentPage[3]}" style="display:inline-block">Find Jobs</button>
                <button @click="currentPage = 'Post Services';checkpage(4)" :class="{curPage:iscurrentPage[4]}" style="display:inline-block">Post Services</button>
                <button @click="currentPage = 'Current Jobs';checkpage(5)" :class="{curPage:iscurrentPage[5]}" style="display:inline-block">My listings</button>
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
            <div v-if="currServicePage==='mainServicesPage'"> <!--Find Services (Service listings using cards)-->
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
                <div class="row">
                <vue-cal class="calendar col-6" style="height:750px"  
                hide-title-bar
                :events="jobevents"
                :disable-views="['years']"
                >
                    
                </vue-cal>
                <div v-if="!showButton" class="col-6" style="justify-content: center; display:flex; align-items:flex-start"><button v-if="!showButton" @click="showbutton()" class="jobButton"><span class="addIcon">## </span><span style="position:relative; right:27px; bottom:2px;">+</span>Create a new Job</button></div>
                <div class="col-6" style="justify-content: center; display:flex; align-items:flex-start"> 
                <div v-if="showButton" class="createJobForm" style="width:80%" > <!--Create a new job listing-->
                <form @submit.prevent="showconfirmPopup">
                    <h1 style="text-align:center;">New Job Listing</h1>
                    <div style="border: 1.5px solid #697565; margin-bottom:5px;"></div>
                    <label for="Name" class="col-6">Name:</label> <!--going to make this fixed-->
                    <label for="Title" class="col-6">Title:</label>
                    <input type="text" id="Name" name="Name" style="width:45%" v-model="newEvent.name">
                    <input type="text" id="Title" name="Title" style="width:50%; margin-left: 30px;" v-model="newEvent.title">
                    <div style="padding-top: 5px;">Type of service needed:<br></div>
                    <label class="col-3"><input type="checkbox"  name="ServiceCheckBox" v-model="newEvent.serviceTypeReq" value="Pet Sitter"> Pet Sitter</label>
                    <label class="col-3"><input type="checkbox"  name="ServiceCheckBox" v-model="newEvent.serviceTypeReq" value="Pet Walker"> Pet Walker</label>
                    <label class="col-3"><input type="checkbox"  name="ServiceCheckBox" v-model="newEvent.serviceTypeReq" value="Pet Groomer"> Pet Groomer</label>
                    <label class="col-3"><input type="checkbox"  name="ServiceCheckBox" v-model="newEvent.serviceTypeReq" value="Pet Trainer"> Pet Trainer</label>
                    <div style="padding-top: 5px;">Special requirements:<br></div>
                    <textarea id="SpecialRequirements" name="SpecialRequirements" class="col-12" rows="5" v-model="newEvent.specialReq"></textarea>
                    <label for="Address" class="col-6">Address:</label>
                    <label for="Contact" class="col-6">Contact number:</label>
                    <input type="text" id="Address" name="Address" style="width:45%" v-model="newEvent.address">
                    <input type="text" id="Contact" name="Contact" style="width:50%; margin-left: 30px;" v-model="newEvent.contactNum">
                    <label for="StartDate" class="col-6" style="padding-top:5px;">Start Date & Time:</label>
                    <label for="EndDate" class="col-6" style="padding-top:5px;">End Date & Time:</label>
                    <input type="datetime-local" id="StartDate" name="StartDate" style="width:45%" v-model="newEvent.startDateTime">
                    <input type="datetime-local" id="EndDate" name="EndDate" style="width:50%; margin-left: 30px;" v-model="newEvent.endDateTime">
                    <div style="margin-top: 5px; width: 45%">Payment(/hr):<input type="text" id="Payment" name="Payment" style="width:100%" v-model="newEvent.payment"></div>
                    
                    <button type="submit" style="margin-top:8px; border: 3px solid #697565; border-radius: 8px;">Create</button>
                </form>
                </div>
                </div>
            </div>
            </div>
            <div><button @click="getIndivEvents(),getmyjobs(),transferExpiredJob(),getmypastjobs()"class="reloadButton">Reload</button></div>
            <div v-if="confirmPopup" class="cfmPopup" style="display:flex;">
                <div class="popupContent"> 
                    <p style="color:#ECDFCC"> Would you like to submit?</p>
                    <div style="display:flex;">
                    <button type="submit" class="col-3" @click="showButton = false;confirmPopup=false;addJob();getIndivEvents();" style="border-radius:8px; border: 3px solid #697565;">Yes</button>
                    <div class="col-6"></div>
                    <button class="col-3"@click="confirmPopup=false" style="border-radius:8px; border: 3px solid #697565;">No</button></div>
                </div>
            </div>
        </div>

        <div v-else-if="currentPage === 'Current Services'"> <!--Pet Owner: Current Services-->
            <div style="border-bottom: 3px solid #464545; padding-bottom: 10px;"> <!--All ongoing services-->
                <h1 style="margin-top: 10px;margin-left:5px;">Ongoing services</h1>
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
            <div style="border-bottom: 3px solid #464545; padding-bottom: 10px;"> <!--All created, non expired job listings-->
                <h1 style="margin-top: 10px;margin-left:5px;">My listings</h1>
                <div v-for="(event,index) in myjobs" :key="index" class="card col-3" style="display:inline-flex; margin-left:5px; border: solid 3px #000000">
                    <img :src="event.image" class="card-image" />
                    <div class="card-body">
                        <h3>{{ event.title }}</h3>
                        <p class="card-text">Period of service: <br>{{ event.start }} - {{ event.end }}</p>
                        <p class="card-text">Services Required: <br>{{ event.serviceTypeReq.join(',') }}</p>
                        <p class="card-text">Address: {{ event.address }}</p>
                        <p class="card-text">Contact Number: {{ event.contactNum }}</p>
                        <p class="card-text">Payment: ${{ event.payment }} / hour</p>
                        <p class="card-text"> Special Requirements: <br>{{ event.specialReq }}</p>
                        <button @click="cancelJob(event.documentId)">Cancel Listing</button>
                    </div>
                </div>
            </div>

            <div> <!--Completed / Cancelled / Expired listings-->
                <h1 style="margin-top: 10px;margin-left:5px;">Past listings</h1>
                <div v-for="(event,index) in mypastjobs" :key="index" class="card col-3" style="display:inline-flex; margin-left:5px; border: solid 3px #000000">
                    <img :src="event.image" class="card-image" />
                    <div class="card-body">
                        <h3>{{ event.title }}</h3>
                        <p class="card-text">Period of service: <br>{{ event.start }} - {{ event.end }}</p>
                        <p class="card-text">Services Required: <br>{{ event.serviceTypeReq.join(',') }}</p>
                        <p class="card-text">Address: {{ event.address }}</p>
                        <p class="card-text">Contact Number: {{ event.contactNum }}</p>
                        <p class="card-text">Payment: ${{ event.payment }} / hour</p>
                        <p class="card-text"> Special Requirements: <br>{{ event.specialReq }}</p>
                        <p class="card-text"> Status: <br>{{ event.status }}</p>
                    </div>
                </div>
                
            </div>
            
        </div>

        <div v-else-if="currentPage === 'Find Jobs'"> <!--Service Provider: Find Jobs-->
            <div class="MainJobsPage" v-if="currJobPage==='MainJobsPage'">
            <div class="FindJobsSearchBar"> <!--Search button, filter button , get recommendation button-->
                <div class="searchbar">
                    <input type="text" placeholder="Search" id="search" style="border-radius:8px;">
                    <label for="search"><img src="../../../public/img/searchicon.png" style="width:30px; padding-bottom:1px; margin-left:5px;"></label>
                </div>
                <div class="filterbar">
                    Filter by:
                    <label><input type="checkbox" name="filterBys" class="filteroption"> Most Recent</label>
                    <label><input type="checkbox" name="filterBys" class="filteroption" @click="showServiceTypes()"> Job Types</label>
                    <div v-if="reqServiceType" class="extrafilteroptions">
                        <label><input type="checkbox" name="filterBys" class="filteroption"> Pet Sitter</label>
                        <label><input type="checkbox" name="filterBys" class="filteroption"> Pet Walker</label>
                        <label><input type="checkbox" name="filterBys" class="filteroption"> Pet Groomer</label>
                        <label><input type="checkbox" name="filterBys" class="filteroption"> Pet Trainer</label>
                    </div>
                </div>
                <div class="getRecommendations">
                    <button style="font-size:medium;border-radius:8px; border: 2px solid #697565" @click="currJobPage = 'Recommendations Page'">Get Recommendations</button>
                </div>
            </div>   
            </div>
            <div class="RecommendationsPage" v-else-if="currJobPage==='Recommendations Page'" > <!--when button 'Get Recommendations' is clicked-->
                <div>
                    <button @click="currJobPage = 'MainJobsPage'" style="background-color: #242424;"><img src="../../../public/img/arrow-121-16.png"> Go back</button>
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
            <div v-if="currJobPage==='MainJobsPage'"> <!--Find Services (Service listings using cards)-->
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

        <div v-else-if="currentPage === 'Post Services'"> <!--Service Provider: Post Services-->
            <div class="calendar-container">
                <div class="row">
                <vue-cal class="calendar col-6" style="height:750px"  
                hide-title-bar
                :events="serviceevents"
                :disable-views="['years']"
                >
                    
                </vue-cal>
                <div v-if="!showButton" class="col-6" style="justify-content: center; display:flex; align-items:flex-start"><button v-if="!showButton" @click="showbutton()" class="jobButton"><span class="addIcon">## </span><span style="position:relative; right:27px; bottom:2px;">+</span>Create a new Service</button></div>
                <div class="col-6" style="justify-content: center; display:flex; align-items:flex-start"> 
                <div v-if="showButton" class="createJobForm" style="width:80%" > <!--Create a new job listing-->
                <form @submit.prevent="showconfirmPopup">
                    <h1 style="text-align:center;">New Service Listing</h1>
                    <div style="border: 1.5px solid #697565; margin-bottom:5px;"></div>
                    <label for="Name" class="col-6">Name:</label> <!--going to make this fixed-->
                    <label for="Title" class="col-6">Title:</label>
                    <input type="text" id="Name" name="Name" style="width:45%" v-model="newEventService.name">
                    <input type="text" id="Title" name="Title" style="width:50%; margin-left: 30px;" v-model="newEventService.title">
                    <div style="padding-top: 5px;">Type of service you provide:<br></div>
                    <label class="col-3"><input type="checkbox"  name="ServiceCheckBox" v-model="newEventService.serviceTypeReq" value="Pet Sitter"> Pet Sitter</label>
                    <label class="col-3"><input type="checkbox"  name="ServiceCheckBox" v-model="newEventService.serviceTypeReq" value="Pet Walker"> Pet Walker</label>
                    <label class="col-3"><input type="checkbox"  name="ServiceCheckBox" v-model="newEventService.serviceTypeReq" value="Pet Groomer"> Pet Groomer</label>
                    <label class="col-3"><input type="checkbox"  name="ServiceCheckBox" v-model="newEventService.serviceTypeReq" value="Pet Trainer"> Pet Trainer</label>
                    <div style="padding-top: 5px;">Skills & past experiences:<br></div>
                    <textarea id="SkillsExp" name="SkillsExp" class="col-12" rows="5" v-model="newEventService.skillsExp"></textarea>
                    <label for="Address" class="col-6">Address:</label>
                    <label for="Contact" class="col-6">Contact number:</label>
                    <input type="text" id="Address" name="Address" style="width:45%" v-model="newEventService.address">
                    <input type="text" id="Contact" name="Contact" style="width:50%; margin-left: 30px;" v-model="newEventService.contactNum">
                    <label for="StartDate" class="col-6" style="padding-top:5px;">Availability (start):</label>
                    <label for="EndDate" class="col-6" style="padding-top:5px;">Availability (end):</label>
                    <input type="datetime-local" id="StartDate" name="StartDate" style="width:45%" v-model="newEventService.startDateTime">
                    <input type="datetime-local" id="EndDate" name="EndDate" style="width:50%; margin-left: 30px;" v-model="newEventService.endDateTime">
                    <div style="margin-top: 5px; width: 45%">Rate (/hr):<input type="text" id="Payment" name="Payment" style="width:100%" v-model="newEventService.payment"></div>
                    
                    <button type="submit" style="margin-top:8px; border: 3px solid #697565; border-radius: 8px;">Create</button>
                </form>
                </div>
                </div>
            </div>
            </div>
            <div><button @click="getIndivEventsService(),getmyservices(),transferExpiredService(),getmypastservices()"class="reloadButton">Reload</button></div>
            <div v-if="confirmPopup" class="cfmPopup" style="display:flex;">
                <div class="popupContent"> 
                    <p style="color:#ECDFCC"> Would you like to submit?</p>
                    <div style="display:flex;">
                    <button type="submit" class="col-3" @click="showButton = false;confirmPopup=false;addService();getIndivEventsService();" style="border-radius:8px; border: 3px solid #697565;">Yes</button>
                    <div class="col-6"></div>
                    <button class="col-3"@click="confirmPopup=false" style="border-radius:8px; border: 3px solid #697565;">No</button></div>
                </div>
            </div>

        </div>

        <div v-else-if="currentPage === 'Current Jobs'"> <!--Service Provider: Current Jobs-->
            <div style="border-bottom: 3px solid #464545; padding-bottom: 10px;"> <!--All ongoing services-->
                <h1 style="margin-top: 10px;margin-left:5px;">Ongoing services</h1>
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
            <div style="border-bottom: 3px solid #464545; padding-bottom: 10px;"> <!--All created, non expired job listings-->
                <h1 style="margin-top: 10px;margin-left:5px;">My listings</h1>
                <div v-for="(event,index) in myservices" :key="index" class="card col-3" style="display:inline-flex; margin-left:5px; border: solid 3px #000000">
                    <img :src="event.image" class="card-image" />
                    <div class="card-body">
                        <h3>{{ event.title }}</h3>
                        <p class="card-text">Period of service: <br>{{ event.start }} - {{ event.end }}</p>
                        <p class="card-text">Services Provided: <br>{{ event.serviceTypeReq.join(',') }}</p>
                        <p class="card-text">Address: {{ event.address }}</p>
                        <p class="card-text">Contact Number: {{ event.contactNum }}</p>
                        <p class="card-text">Rate: ${{ event.payment }} / hour</p>
                        <p class="card-text">Skills & Experiences: <br>{{ event.skillsExp }}</p>
                        <button @click="cancelService(event.documentId)">Cancel Listing</button>
                    </div>
                </div>
            </div>

            <div> <!--Completed / Cancelled / Expired listings-->
                <h1 style="margin-top: 10px;margin-left:5px;">Past listings</h1>
                <div v-for="(event,index) in mypastservices" :key="index" class="card col-3" style="display:inline-flex; margin-left:5px; border: solid 3px #000000">
                    <img :src="event.image" class="card-image" />
                    <div class="card-body">
                        <h3>{{ event.title }}</h3>
                        <p class="card-text">Period of service: <br>{{ event.start }} - {{ event.end }}</p>
                        <p class="card-text">Services Provided: <br>{{ event.serviceTypeReq.join(',') }}</p>
                        <p class="card-text">Address: {{ event.address }}</p>
                        <p class="card-text">Contact Number: {{ event.contactNum }}</p>
                        <p class="card-text">Rate: ${{ event.payment }} / hour</p>
                        <p class="card-text">Skills & Experiences <br>{{ event.skillsExp }}</p>
                        <p class="card-text">Status: <br>{{ event.status }}</p>
                    </div>
                </div>
                
            </div>
        </div>
    
    </div>
    </div>
    </template>
