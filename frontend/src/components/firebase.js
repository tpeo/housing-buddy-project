// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy_bb1IMyRhr2i6A9LQLNMlzqM69CVFus",
  authDomain: "housing-buddy-402b5.firebaseapp.com",
  projectId: "housing-buddy-402b5",
  storageBucket: "housing-buddy-402b5.appspot.com",
  messagingSenderId: "131382078023",
  appId: "1:131382078023:web:8439443291c371a27fdf62"
};

export const auth = require("firebase/auth");
const googleProvider = new auth.GoogleAuthProvider()

export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

