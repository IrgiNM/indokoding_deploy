// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBcm80xmKqdPioKo-eH3k3YfdPsuwdAT4",
  authDomain: "profile-company-indokoding.firebaseapp.com",
  projectId: "profile-company-indokoding",
  storageBucket: "profile-company-indokoding.firebasestorage.app",
  messagingSenderId: "195112865661",
  appId: "1:195112865661:web:7efb43b520b4ca3c418614",
  measurementId: "G-59XEPRJSZV"
};

// Init firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, db, createUserWithEmailAndPassword, doc, setDoc };
