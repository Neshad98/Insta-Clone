// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA_2Vxo-xZEOXUTcqphNt8DdNQ691I1yKQ",
  authDomain: "insta-clone-87026.firebaseapp.com",
  projectId: "insta-clone-87026",
  storageBucket: "insta-clone-87026.appspot.com",
  messagingSenderId: "1092559781704",
  appId: "1:1092559781704:web:8e6f98dd400316dd82fd7d",
  measurementId: "G-Y487JM2Q1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
