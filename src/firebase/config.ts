// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC66ibjv6WDHQUadEsot8FROsgbHPchoaQ",
  authDomain: "chat-app-c9654.firebaseapp.com",
  projectId: "chat-app-c9654",
  storageBucket: "chat-app-c9654.appspot.com",
  messagingSenderId: "377716573414",
  appId: "1:377716573414:web:60e03bfc974dcfe75e6727",
  measurementId: "G-LMNPRFMZKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

connectAuthEmulator(auth, "http://127.0.0.1:9099");
if(window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}

export {auth, db}