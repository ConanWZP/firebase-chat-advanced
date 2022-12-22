// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*const firebaseConfig = {
    apiKey: "AIzaSyBinXRnBEFn7mecNrqgVbqMmKjuBnnb_nE",
    authDomain: "messeger-1b5c3.firebaseapp.com",
    databaseURL: "http://messeger-1b5c3.firebaseapp.com",
    projectId: "messeger-1b5c3",
    storageBucket: "messeger-1b5c3.appspot.com",
    messagingSenderId: "281400176411",
    appId: "1:281400176411:web:397f5d2979945478462dbe"
};*/

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const dataBase = getFirestore(app)
export const storage = getStorage(app)


