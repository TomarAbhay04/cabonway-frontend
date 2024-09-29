
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMPBy3L46Mx7vPXWD6_P-ne7wmFiSOj6A",
  authDomain: "cabonway-7e777.firebaseapp.com",
  projectId: "cabonway-7e777",
  storageBucket: "cabonway-7e777.appspot.com",
  messagingSenderId: "485944972084",
  appId: "1:485944972084:web:68eb9db52cd94d85318b61",
  measurementId: "G-PR2G1Z0XH5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);