// src/api/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyD0cAKsei5FsJrerxnKpfRAAUx9e63wzaA",
  authDomain: "petguardian-b4891.firebaseapp.com",
  projectId: "petguardian-b4891",
  storageBucket: "petguardian-b4891.appspot.com",
  messagingSenderId: "177074165056",
  appId: "1:177074165056:web:18502043055593d53416a5",
  measurementId: "G-FBZ0FZNNED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app); // For Authentication
export const googleProvider = new GoogleAuthProvider(); // Google Login
export const db = getFirestore(app); // Firestore Database
