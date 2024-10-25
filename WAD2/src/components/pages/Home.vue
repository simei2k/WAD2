<script>
import NavBar from '../NavBar.vue'
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import app from '../../../firebase.js'

const db = getDatabase(app);

const dbRef = ref(db);
get(child(dbRef,'/value2'))
.then(response=>{
    console.log(response.val())
})
.catch(error=>{
    console.log(error)
})


</script>
<template>
    <NavBar></NavBar>
    <h1>this is home</h1>
</template>