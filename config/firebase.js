import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore,doc, setDoc,getDocs,collection, addDoc,getDoc, updateDoc,arrayUnion,arrayRemove    } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBY2J1b1FvdP8NmGwJPruvRLMR_BCr0F5k",
    authDomain: "to-do-app-0-1.firebaseapp.com",
    projectId: "to-do-app-0-1",
    storageBucket: "to-do-app-0-1.firebasestorage.app",
    messagingSenderId: "322617762192",
    appId: "1:322617762192:web:504f7ab6152f61f67e9315",
    measurementId: "G-ZXT1CMZE05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,doc, setDoc,db,auth, onAuthStateChanged,getDocs,collection, addDoc,getDoc,updateDoc,arrayUnion,arrayRemove   }
