import { initializeApp } from 'firebase/app';
import { getAuth} from "@firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAXBijdCQvs-mmBfowIVZikzWhla_48vsA",
  authDomain: "wad2-ce64e.firebaseapp.com",
  databaseURL: "https://wad2-ce64e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wad2-ce64e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}
export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
export function signOut() {
    return FBsignOut(auth);
}


export { app }

