<script>
import NavBar from '../NavBar.vue'
import { getDatabase, ref, onValue } from "firebase/database";
import app from '../../../firebase.js'

const db = getDatabase(app);
console.log(db);
const dbRef = ref(getDatabase());
//const test = ref(db,'/value2/users/alovelace');
console.log(dbRef)

</script>
<template>
    <NavBar></NavBar>
    <h1>this is home</h1>
</template>