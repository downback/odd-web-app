// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPopijb148SGm6JaQv-ECecoUjI6v82RI",
  authDomain: "odd-office.firebaseapp.com",
  projectId: "odd-office",
  storageBucket: "odd-office.firebasestorage.app",
  messagingSenderId: "363672877465",
  appId: "1:363672877465:web:3677b7999531a3cb32bb08",
  measurementId: "G-K5NP71YG76",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
