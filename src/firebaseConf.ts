// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBinXRnBEFn7mecNrqgVbqMmKjuBnnb_nE",
    authDomain: "messeger-1b5c3.firebaseapp.com",
    databaseURL: "http://messeger-1b5c3.firebaseapp.com",
    projectId: "messeger-1b5c3",
    storageBucket: "messeger-1b5c3.appspot.com",
    messagingSenderId: "281400176411",
    appId: "1:281400176411:web:397f5d2979945478462dbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const dataBase = getFirestore(app)
export const storage = getStorage(app)


