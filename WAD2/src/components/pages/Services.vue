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
            selectedEvent: null,
            showOngoingListing: false,
            searchQuery: '',
            searchQueryS: '',
            mostRecentP: false,
            mostRecentS: false,
            reqServiceTypeP: false,
            reqServiceTypeS: false,
            selectedServiceTypesP: [],
            selectedServiceTypesS: [],
            selectedTimingsP: [],
            newTimeP: {
                start:'',
                end:'',
            },
            selectedTimingsS: [],
            newTimeS: {
                start:'',
                end:'',
            },
            }
    },
    props: {
    
  },
    mounted() {
        this.getalljobs();
        this.getallservices();
        this.getIndivEvents();
        this.getIndivEventsService();

    },
    watch: {
        reqServiceTypeP(newValue) {
            if (!newValue) {
                this.selectedServiceTypesP = [];
            }
        },
        reqServiceTypeS(newValue) {
            if(!newValue) {
                this.selectedServiceTypesS = [];
            }
        }
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
        showconfirmPopup() {
            this.confirmPopup = true;
        },
        viewMore(event) {
            this.selectedEvent = event;
            this.showOngoingListing = true;
        },
        closeListing() {
            this.showOngoingListing = false;
            this.selectedEvent = null;
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
                    linkedPerson:'',
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
                linkedPerson:'',
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
                    linkedPerson: '',
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
                    linkedPerson:'',
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
        async getmyongoingjobs() {
            try {
                const getdatabyname = query(collection(db,'ongoing'), where('name','==',this.PetOwnerName));
                const getdatabylinkedPerson = query(collection(db,'ongoing'),where('linkedPerson','==',this.PetOwnerName));
                const [nameSnapshot, linkedPersonSnapshot] = await Promise.all([
                    getDocs(getdatabyname),
                    getDocs(getdatabylinkedPerson)
                ]);
                let ongoingjobs=[];
                nameSnapshot.docs.forEach(doc => {
                    ongoingjobs.push({
                        ...doc.data(),
                        start: doc.data().start.replace('T', ' '),
                        end: doc.data().end.replace('T', ' '),
                    });
                });
                linkedPersonSnapshot.docs.forEach(doc => {
                    const data =doc.data();
                    if (!ongoingjobs.some(job=>job.documentId === data.documentId)) {
                        ongoingjobs.push({
                            ...data,
                            start: data.start.replace('T', ' '),
                            end: data.end.replace('T', ' ')
                        });
                    }
                });
                this.myongoingjobs = ongoingjobs;
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        },
        async getmyongoingservices() {
            try {
                const getdatabyname = query(collection(db,'ongoing'), where('name','==',this.ServiceProviderName));
                const getdatabylinkedPerson = query(collection(db,'ongoing'),where('linkedPerson','==',this.ServiceProviderName));
                const [nameSnapshot, linkedPersonSnapshot] = await Promise.all([
                    getDocs(getdatabyname),
                    getDocs(getdatabylinkedPerson)
                ]);
                let ongoingservices=[];
                nameSnapshot.docs.forEach(doc => {
                    ongoingservices.push({
                        ...doc.data(),
                        start: doc.data().start.replace('T', ' '),
                        end: doc.data().end.replace('T', ' '),
                    });
                });
                linkedPersonSnapshot.docs.forEach(doc => {
                    const data =doc.data();
                    if (!ongoingservices.some(job=>job.documentId === data.documentId)) {
                        ongoingservices.push({
                            ...data,
                            start: data.start.replace('T', ' '),
                            end: data.end.replace('T', ' ')
                        });
                    }
                });
                this.myongoingservices = ongoingservices;
            } catch (error) {
                console.error("Error fetching events:", error);
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
                    linkedPerson: data.linkedPerson,
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
                    linkedPerson: data.linkedPerson,
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
                    linkedPerson: data.linkedPerson,
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
                    linkedPerson: data.linkedPerson,
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
        async ongoingJob(id) {
            try {
                
                const fromCollectionRef = doc(db, 'jobs', id);
                const docSnap = await getDoc(fromCollectionRef);

                if (docSnap.exists()) {
                    await updateDoc(fromCollectionRef, {
                        status: 'ongoing',
                        linkedPerson: this.ServiceProviderName,
                    });
                    console.log('Status updated to "ongoing".');

                    const updatedDocSnap = await getDoc(fromCollectionRef);
                    console.log('Updated document:', updatedDocSnap.data());

                    const toCollectionRef = doc(db, 'ongoing', id);
                    await setDoc(toCollectionRef, updatedDocSnap.data());
                    await deleteDoc(fromCollectionRef);
                    
                } else {
                    console.log("No such document");
                }
            } catch (error) {
                console.error('Error transferring service:', error);
            }
        },
        async ongoingService(id) {
            try {
                
                const fromCollectionRef = doc(db, 'services', id);
                const docSnap = await getDoc(fromCollectionRef);

                if (docSnap.exists()) {
                    await updateDoc(fromCollectionRef, {
                        status: 'ongoing',
                        linkedPerson: this.PetOwnerName,
                    });
                    console.log('Status updated to "ongoing".');

                    const updatedDocSnap = await getDoc(fromCollectionRef);
                    console.log('Updated document:', updatedDocSnap.data());

                    const toCollectionRef = doc(db, 'ongoing', id);
                    await setDoc(toCollectionRef, updatedDocSnap.data());
                    await deleteDoc(fromCollectionRef);
                    
                } else {
                    console.log("No such document");
                }
            } catch (error) {
                console.error('Error transferring service:', error);
            }
        },
        async getalljobs() {
            try {
                const Snapshot = await getDocs(collection(db,'jobs'));
                this.alljobs = Snapshot.docs.map(doc => {
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
                    linkedPerson: data.linkedPerson,
                    };
                });
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        },
        async getallservices() {
            try {
                const Snapshot = await getDocs(collection(db,'services'));
                this.allservices = Snapshot.docs.map(doc => {
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
                    linkedPerson: data.linkedPerson,
                    };
                });
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        },
        updateTimeP() {
            if (this.newTimeP.start && this.newTimeP.end) {
                const event = {
                    start:this.newTimeP.start.replace('T', ' '),
                    end: this.newTimeP.end.replace('T', ' '),
                };
                this.selectedTimingsP = [event];
            }
        },
        updateTimeS() {
            if (this.newTimeS.start && this.newTimeS.end) {
                const event = {
                    start:this.newTimeS.start.replace('T', ' '),
                    end: this.newTimeS.end.replace('T', ' '),
                };
                this.selectedTimingsS = [event];
            }
        }
    },

       
    computed: {
        searchServices() {
            let filteredServices = [...this.allservices] || [];
            if (this.searchQuery.trim()!=='') {
                filteredServices = filteredServices.filter(service =>
                service.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                service.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            }
            
            if (this.mostRecentP) {
                const today = new Date();
                today.setHours(0,0,0,0);
                filteredServices=filteredServices.sort((a,b) => {
                    const dateA = new Date(a.start);
                    const dateB = new Date(b.start);
                    const diffA = Math.abs(today-dateA);
                    const diffB = Math.abs(today-dateB)
                    return diffA - diffB;
                });
            }

            if (this.selectedServiceTypesP.length > 0) {
                filteredServices = filteredServices.filter(service =>
                    service.serviceTypeReq.some(type=> this.selectedServiceTypesP.includes(type))
                );
            }
            return filteredServices;
        },
        searchJobs() {
            let filteredJobs = [...this.alljobs] || [];
            if (this.searchQueryS.trim()!=='') {
                filteredJobs = filteredJobs.filter(job =>
                job.title.toLowerCase().includes(this.searchQueryS.toLowerCase()) ||
                job.name.toLowerCase().includes(this.searchQueryS.toLowerCase())
            );
            }
            
            if (this.mostRecentS) {
                const today = new Date();
                today.setHours(0,0,0,0);
                filteredJobs=filteredJobs.sort((a,b) => {
                    const dateA = new Date(a.start);
                    const dateB = new Date(b.start);
                    const diffA = Math.abs(today-dateA);
                    const diffB = Math.abs(today-dateB)
                    return diffA - diffB;
                })
            }

            if (this.selectedServiceTypesS.length > 0) {
                filteredJobs = filteredJobs.filter(job =>
                    job.serviceTypeReq.some(type=> this.selectedServiceTypesS.includes(type))
                );
            }
            return filteredJobs;
        },
        recommendServices() {
            const blockStart = new Date(this.newTimeP.start);
            const blockEnd = new Date(this.newTimeP.end);

            return this.allservices.filter(service => {
                const serviceStart = new Date(service.start);
                const serviceEnd = new Date(service.end);

                return (
                    (serviceStart >= blockStart && serviceStart <= blockEnd) || 
                    (serviceEnd >= blockStart && serviceEnd <= blockEnd) ||     
                    (serviceStart <= blockStart && serviceEnd >= blockEnd)      
                );
            });
        },
        recommendJobs() {
            const blockStart = new Date(this.newTimeS.start);
            const blockEnd = new Date(this.newTimeS.end);

            return this.alljobs.filter(job => {
                const jobStart = new Date(job.start);
                const jobEnd = new Date(job.end);

                return (
                    (jobStart >= blockStart && jobStart <= blockEnd) || 
                    (jobEnd >= blockStart && jobEnd <= blockEnd) ||     
                    (jobStart <= blockStart && jobEnd >= blockEnd)      
                );
            });
        }
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
        overflow: visible;
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
    .card-fixed {
        border-radius: 15px !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
        height:600px !important;
        width:400px !important;
        padding:15px;
    }
    .card-body {
        max-height: calc(100% - 50px);
        overflow-y:auto;
    }
    .reloadButton {
        border-radius: 8px;
        border:solid 3px #697565;
        position: absolute;
        top:150px;
    }
    .card-image {
        width:100%;
        height:200px;
        object-fit:cover;
        border-radius:8px;
        border: 2px solid #1a1a1a;
    }
    .listing-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999; 
    }
    .listing-content {
        background-color: #697565;
        padding: 20px;
        width: 80%;
        height: 80%;
        overflow-y: auto;
        border-radius: 10px;
        text-align: center;
        position: relative;
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
                    <button @click="getallservices(),getmyongoingjobs()" style="display:inline; margin-right:5px;border:3px solid #697565;border-radius:8px;">Reload</button>
                    <input type="text" v-model="searchQuery" placeholder="Search" id="search" style="border-radius:8px;">
                    <label for="search"><img src="../../../public/img/searchicon.png" style="width:30px; padding-bottom:1px; margin-left:5px;"></label>
                </div>
                <div class="filterbar">
                    Filter by:
                    <label><input type="checkbox" name="filterBys" class="filteroption" v-model="mostRecentP"> Most Recent</label>
                    <label><input type="checkbox" name="filterBys" class="filteroption" v-model="reqServiceTypeP"> Service Types</label>
                    <div v-if="reqServiceTypeP" class="extrafilteroptions">
                        <label><input type="checkbox" name="filterBys" class="filteroption" value="Pet Sitter" v-model="selectedServiceTypesP"> Pet Sitter</label>
                        <label><input type="checkbox" name="filterBys" class="filteroption" value="Pet Walker" v-model="selectedServiceTypesP"> Pet Walker</label>
                        <label><input type="checkbox" name="filterBys" class="filteroption" value="Pet Groomer" v-model="selectedServiceTypesP"> Pet Groomer</label>
                        <label><input type="checkbox" name="filterBys" class="filteroption" value="Pet Trainer" v-model="selectedServiceTypesP"> Pet Trainer</label>
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
                <div class="row">
                <div class="calendar-container col-6">
                    <vue-cal class="calendar" style="height:750px"  
                    hide-title-bar
                    :events="selectedTimingsP"
                    :disable-views="['years']"
                    >
                    
                </vue-cal>
                </div>
                <div class="col-6" style="text-align:center">
                    Filtered services available based on selection <br>
                    Start date & time:<input type="datetime-local" name="Datetime" v-model="newTimeP.start" @input="updateTimeP()"><br>
                    End date & time:<input type="datetime-local" name="Datetime" v-model="newTimeP.end" @input="updateTimeP()"> <br>
                    Recommended Services:
                    <div class="row">
                    <div v-for="service in recommendServices" :key="service.documentId" class="col-6">
                    <div class="card card-fixed w-100">
                    <img :src="service.image" class="card-image" style="width:100%;height:70%"/>
                    <div class="card-body" style="margin-top:2px;; border-top: 3px solid #464545">
                        <h3> {{ service.title }}</h3>
                        <h5> {{ service.name }}</h5>
                        <p class="card-text">Period of service: <br> {{ service.start }} - {{ service.end }}</p>
                        <p class="card-text">Services Provided: <br> {{ service.serviceTypeReq.join(',') }}</p>
                        <p class="card-text">Address: {{ service.address }}</p>
                        <p class="card-text">Contact Number: {{ service.contactNum }}</p>
                        <p class="card-text">Payment: ${{ service.payment }} / hour</p>
                        <p class="card-text">Skills & Experiences: <br> {{ service.skillsExp }}</p>
                        <button @click="ongoingService(service.documentId)">Accept Service</button>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>
            </div> 
            <div v-if="currServicePage==='mainServicesPage'"> <!--Find Services (Service listings using cards)-->
                <div v-if="searchServices.length > 0">
                <div class="row" style="margin-top:10px;padding-left:5px;padding-right:5px;">
                <div v-for="service in searchServices" :key="service.documentId" class="col-3">
                    <div class="card card-fixed w-100">
                    <img :src="service.image" class="card-image" style="width:100%;height:70%"/>
                    <div class="card-body" style="margin-top:2px;; border-top: 3px solid #464545">
                        <h3> {{ service.title }}</h3>
                        <h5> {{ service.name }}</h5>
                        <p class="card-text">Period of service: <br> {{ service.start }} - {{ service.end }}</p>
                        <p class="card-text">Services Provided: <br> {{ service.serviceTypeReq.join(',') }}</p>
                        <p class="card-text">Address: {{ service.address }}</p>
                        <p class="card-text">Contact Number: {{ service.contactNum }}</p>
                        <p class="card-text">Payment: ${{ service.payment }} / hour</p>
                        <p class="card-text">Skills & Experiences: <br> {{ service.skillsExp }}</p>
                        <button @click="ongoingService(service.documentId)">Accept Service</button>
                    </div>
                    </div>
                </div>
                </div>
                </div>
                <div v-else-if="searchQuery.trim()!==''">
                    No matching search found.
                </div>
                <div v-else-if="selectedServiceTypesP.length > 0 && searchServices.length === 0">
                    No jobs available for the selected job type.
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
                <h1 style="margin-top: 10px;margin-left:5px;">Ongoing listings</h1>
                <div class="row" style="margin-top:10px;padding-left:5px;padding-right:5px;">
                <div v-for="(event,index) in myongoingjobs" :key="index" class="col-3">
                    <div class="card card-fixed w-100">
                    <img :src="event.image" class="card-image" />
                    <div class="card-body">
                        <h3>{{ event.title }}</h3>
                        <p class="card-text">Listing by: {{ event.name }} <br> Listing For: {{ event.linkedPerson }}</p> 
                        <p class="card-text">Period of service: <br>{{ event.start }} - {{ event.end }}</p>
                        <p class="card-text">Services Required: <br>{{ event.serviceTypeReq.join(',') }}</p>
                        <p class="card-text">Address: {{ event.address }}</p>
                        <p class="card-text">Contact Number: {{ event.contactNum }}</p>
                        <p class="card-text">Payment: ${{ event.payment }} / hour</p>
                        <p class="card-text"> Special Requirements: <br>{{ event.specialReq }}</p>
                        <button @click="viewMore(event)">View More</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div style="border-bottom: 3px solid #464545; padding-bottom: 10px;"> <!--All created, non expired job listings-->
                <h1 style="margin-top: 10px;margin-left:5px;">My listings</h1>
                <div v-for="(event,index) in myjobs" :key="index" class="card col-3 card-fixed" style="display:inline-flex; margin-left:5px; border: solid 3px #000000">
                    <img :src="event.image" class="card-image" />
                    <div class="card-body">
                        <h3>{{ event.title }}</h3>
                        <p class="card-text">Period of service: <br>{{ event.start }} - {{ event.end }}</p>
                        <p class="card-text">Services Required: <br>{{ event.serviceTypeReq.join(',') }}</p>
                        <p class="card-text">Address: {{ event.address }}</p>
                        <p class="card-text">Contact Number: {{ event.contactNum }}</p>
                        <p class="card-text">Payment: ${{ event.payment }} / hour</p>
                        <p class="card-text">Special Requirements: <br>{{ event.specialReq }}</p>
                        <button @click="cancelJob(event.documentId)">Cancel Listing</button>
                    </div>
                </div>
            </div>

            <div> <!--Completed / Cancelled / Expired listings-->
                <h1 style="margin-top: 10px;margin-left:5px;">Past listings</h1>
                <div v-for="(event,index) in mypastjobs" :key="index" class="card col-3 card-fixed" style="display:inline-flex; margin-left:5px; border: solid 3px #000000;">
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
            <div v-if="showOngoingListing" class="listing-overlay"> <!--Full screen of selected ongoing listing-->
                <div class="listing-content">
                    <h3>{{ selectedEvent.title }}</h3>
                    <img :src="selectedEvent.image" class="full-image" />
                    <p><strong>Listing by:</strong> {{ selectedEvent.name }}</p>
                    <p><strong>Listing For:</strong> {{ selectedEvent.linkedPerson }}</p>
                    <p><strong>Period of service:</strong> {{ selectedEvent.start }} - {{ selectedEvent.end }}</p>
                    <p><strong>Services Required:</strong> {{ selectedEvent.serviceTypeReq.join(', ') }}</p>
                    <p><strong>Address:</strong> {{ selectedEvent.address }}</p>
                    <p><strong>Contact Number:</strong> {{ selectedEvent.contactNum }}</p>
                    <p><strong>Payment:</strong> ${{ selectedEvent.payment }} / hour</p>
                    <p><strong>Special Requirements:</strong> {{ selectedEvent.specialReq }}</p>
                    <button>This button links to My Profile (Job Provider)</button>
                    <button>This button links to the Service Provider Profile</button>
                    <button>This button links to the chat between us</button>
                    <button @click="closeListing()" class="close-btn">Close</button>
                </div>
            </div>
        </div>

        <div v-else-if="currentPage === 'Find Jobs'"> <!--Service Provider: Find Jobs-->
            <div class="MainJobsPage" v-if="currJobPage==='MainJobsPage'">
            <div class="FindJobsSearchBar"> <!--Search button, filter button , get recommendation button-->
                <div class="searchbar">
                    <button @click="getalljobs(),getmyongoingservices()" style="display:inline; margin-right:5px;border:3px solid #697565;border-radius:8px;">Reload</button>
                    <input type="text" v-model="searchQueryS" placeholder="Search" id="search" style="border-radius:8px;">
                    <label for="search"><img src="../../../public/img/searchicon.png" style="width:30px; padding-bottom:1px; margin-left:5px;"></label>
                </div>
                <div class="filterbar">
                    Filter by:
                    <label><input type="checkbox" name="filterBys" class="filteroption" v-model="mostRecentS"> Most Recent</label>
                    <label><input type="checkbox" name="filterBys" class="filteroption" v-model="reqServiceTypeS"> Job Types</label>
                    <div v-if="reqServiceTypeS" class="extrafilteroptions">
                        <label><input type="checkbox" name="filterBys" class="filteroption" value="Pet Sitter" v-model="selectedServiceTypesS"> Pet Sitter</label>
                        <label><input type="checkbox" name="filterBys" class="filteroption" value="Pet Walker" v-model="selectedServiceTypesS"> Pet Walker</label>
                        <label><input type="checkbox" name="filterBys" class="filteroption" value="Pet Groomer" v-model="selectedServiceTypesS"> Pet Groomer</label>
                        <label><input type="checkbox" name="filterBys" class="filteroption" value="Pet Trainer" v-model="selectedServiceTypesS"> Pet Trainer</label>
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
                <div class="row">
                <div class="calendar-container col-6">
                    <vue-cal class="calendar" style="height:750px"  
                    hide-title-bar
                    :events="selectedTimingsS"
                    :disable-views="['years']"
                    >
                    
                </vue-cal>
                </div>
                <div class="col-6" style="text-align:center">
                    Filtered services available based on selection <br>
                    Start date & time:<input type="datetime-local" name="Datetime" v-model="newTimeS.start" @input="updateTimeS()"><br>
                    End date & time:<input type="datetime-local" name="Datetime" v-model="newTimeS.end" @input="updateTimeS()"> <br>
                    Recommended Services:
                    <div class="row">
                    <div v-for="job in recommendJobs" :key="job.documentId" class="col-6">
                    <div class="card card-fixed w-100">
                    <img :src="job.image" class="card-image" style="width:100%;height:70%"/>
                    <div class="card-body" style="margin-top:2px;; border-top: 3px solid #464545">
                        <h3> {{ job.title }}</h3>
                        <h5> {{ job.name }}</h5>
                        <p class="card-text">Period of service: <br> {{ job.start }} - {{ job.end }}</p>
                        <p class="card-text">Services needed: <br> {{ job.serviceTypeReq.join(',') }}</p>
                        <p class="card-text">Address: {{ job.address }}</p>
                        <p class="card-text">Contact Number: {{ job.contactNum }}</p>
                        <p class="card-text">Payment: ${{ job.payment }} / hour</p>
                        <p class="card-text">Special Requirements: <br> {{ job.specialReq }}</p>
                        <button @click="ongoingJob(job.documentId)">Accept Job</button>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>
            </div> 
            <div v-if="currJobPage==='MainJobsPage'"> <!--Find Jobs (Service listings using cards)-->
                <div v-if="searchJobs.length > 0">
                <div class="row" style="margin-top:10px;padding-left:5px;padding-right:5px;">
                <div v-for="job in searchJobs" :key="job.documentId" class="col-3">
                    <div class="card card-fixed w-100">
                    <img :src="job.image" class="card-image" />
                    <div class="card-body" style="margin-top:2px;; border-top: 3px solid #464545">
                        <h3>{{ job.title }}</h3>
                        <h5>{{ job.name }}</h5>
                        <p class="card-text">Period of service: <br>{{ job.start }} - {{ job.end }}</p>
                        <p class="card-text">Services Required: <br>{{ job.serviceTypeReq.join(',') }}</p>
                        <p class="card-text">Address: {{ job.address }}</p>
                        <p class="card-text">Contact Number: {{ job.contactNum }}</p>
                        <p class="card-text">Payment: ${{ job.payment }} / hour</p>
                        <p class="card-text"> Special Requirements: <br>{{ job.specialReq }}</p>
                        <button @click="ongoingJob(job.documentId)">Accept Job</button>
                    </div>
                    </div>
                </div>
                </div>
                </div>
                <div v-else-if="searchQueryS.trim()!==''">
                    No matching search found.
                </div>
                <div v-else-if="selectedServiceTypesS.length > 0 && searchJobs.length === 0">
                    No jobs available for the selected job type.
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
                <h1 style="margin-top: 10px;margin-left:5px;">Ongoing listings</h1>
                <div class="row" style="margin-top:10px;padding-left:5px;padding-right:5px;">
                <div v-for="(event,index) in myongoingservices" :key="index" class="col-3">
                    <div class="card card-fixed w-100">
                    <img :src="event.image" class="card-image" />
                    <div class="card-body">
                        <h3>{{ event.title }}</h3>
                        <p class="card-text">Listing by: {{ event.name }} <br> Listing For: {{ event.linkedPerson }}</p> 
                        <p class="card-text">Period of service: <br>{{ event.start }} - {{ event.end }}</p>
                        <p class="card-text">Services Required: <br>{{ event.serviceTypeReq.join(',') }}</p>
                        <p class="card-text">Address: {{ event.address }}</p>
                        <p class="card-text">Contact Number: {{ event.contactNum }}</p>
                        <p class="card-text">Payment: ${{ event.payment }} / hour</p>
                        <p class="card-text"> Special Requirements: <br>{{ event.specialReq }}</p>
                        <button @click="viewMore(event)">View More</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div style="border-bottom: 3px solid #464545; padding-bottom: 10px;"> <!--All created, non expired job listings-->
                <h1 style="margin-top: 10px;margin-left:5px;">My listings</h1>
                <div v-for="(event,index) in myservices" :key="index" class="card col-3 card-fixed" style="display:inline-flex; margin-left:5px; border: solid 3px #000000">
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
                <div v-for="(event,index) in mypastservices" :key="index" class="card col-3 card-fixed" style="display:inline-flex; margin-left:5px; border: solid 3px #000000">
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

            <div v-if="showOngoingListing" class="listing-overlay"> <!--Full screen of selected ongoing listing-->
                <div class="listing-content">
                    <h3>{{ selectedEvent.title }}</h3>
                    <img :src="selectedEvent.image" class="full-image" />
                    <p><strong>Listing by:</strong> {{ selectedEvent.name }}</p>
                    <p><strong>Listing For:</strong> {{ selectedEvent.linkedPerson }}</p>
                    <p><strong>Period of service:</strong> {{ selectedEvent.start }} - {{ selectedEvent.end }}</p>
                    <p><strong>Services Required:</strong> {{ selectedEvent.serviceTypeReq.join(', ') }}</p>
                    <p><strong>Address:</strong> {{ selectedEvent.address }}</p>
                    <p><strong>Contact Number:</strong> {{ selectedEvent.contactNum }}</p>
                    <p><strong>Payment:</strong> ${{ selectedEvent.payment }} / hour</p>
                    <p><strong>Special Requirements:</strong> {{ selectedEvent.specialReq }}</p>
                    <button>This button links to My Profile (Service Provider)</button>
                    <button>This button links to the Pet Owner Profile(Job Provider)</button>
                    <button>This button links to the chat between us</button>
                    <button @click="closeListing()" class="close-btn">Close</button>
                    
                </div>
            </div>
        </div>
    
    </div>
    </div>
    </template>
