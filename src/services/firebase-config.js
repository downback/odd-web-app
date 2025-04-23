// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
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


const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)
