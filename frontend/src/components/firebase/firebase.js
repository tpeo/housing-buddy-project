// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy_bb1IMyRhr2i6A9LQLNMlzqM69CVFus",
  authDomain: "housing-buddy-402b5.firebaseapp.com",
  projectId: "housing-buddy-402b5",
  storageBucket: "housing-buddy-402b5.appspot.com",
  messagingSenderId: "131382078023",
  appId: "1:131382078023:web:8439443291c371a27fdf62"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = firebase.auth();

export {storage, auth, firebase};
