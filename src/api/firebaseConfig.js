// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0cAKsei5FsJrerxnKpfRAAUx9e63wzaA",
  authDomain: "petguardian-b4891.firebaseapp.com",
  projectId: "petguardian-b4891",
  storageBucket: "petguardian-b4891.firebasestorage.app",
  messagingSenderId: "177074165056",
  appId: "1:177074165056:web:18502043055593d53416a5",
  measurementId: "G-FBZ0FZNNED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);