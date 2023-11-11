// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA53JztlFZvX4LE15wPf1g-TtFWX8DHWvA",
  authDomain: "netflixgpt-e12e4.firebaseapp.com",
  projectId: "netflixgpt-e12e4",
  storageBucket: "netflixgpt-e12e4.appspot.com",
  messagingSenderId: "992193728674",
  appId: "1:992193728674:web:42890923ac5d101e8907fb",
  measurementId: "G-CNH4E5WXFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth= getAuth();