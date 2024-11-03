import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, EmailAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXBijdCQvs-mmBfowIVZikzWhla_48vsA",
  authDomain: "wad2-ce64e.firebaseapp.com",
  databaseURL: "https://wad2-ce64e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wad2-ce64e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//adding data
//try {
//  const docRef = await addDoc(collection(db, "users"), {
//    first: "Ada",
//    last: "Lovelace",
//    born: 1815
//  });
//  console.log("Document written with ID: ", docRef.id);
//} catch (e) {
//console.error("Error adding document: ", e);
//}

//read data
//const querySnapshot = await getDocs(collection(db, "users"));
//querySnapshot.forEach((doc) => {
//  console.log(`${doc.id} => ${doc.data()}`);
//});
//
//custom object 
//
//class City {
//  constructor (name, state, country ) {
//    this.name = name;
//    this.state = state;
//    this.country = country;
//}
//toString() {
//    return this.name + ', ' + this.state + ', ' + this.country;
//}
//}

// Firestore data converter
//const cityConverter = {
//toFirestore: (city) => {
//    return {
//        name: city.name,
//        state: city.state,
//        country: city.country
//        };
//},
//fromFirestore: (snapshot, options) => {
//    const data = snapshot.data(options);
//    return new City(data.name, data.state, data.country);
//}
//};

export default app
