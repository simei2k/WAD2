import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAXBijdCQvs-mmBfowIVZikzWhla_48vsA",
  authDomain: "wad2-ce64e.firebaseapp.com",
  databaseURL: "https://wad2-ce64e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wad2-ce64e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}
export const signIn = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error; // Rethrow the error to be caught in the component
  }
};
export function signOut() {
    return FBsignOut(auth);
}


export { app }
