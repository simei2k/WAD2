import { initializeApp } from "@firebase/app";


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

export { app }
