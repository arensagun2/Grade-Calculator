// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUKiB4rcX5_qKKe3nlumPWScUDEjoPmJE",
  authDomain: "arens4gun2.firebaseapp.com",
  projectId: "arens4gun2",
  storageBucket: "arens4gun2.appspot.com",
  messagingSenderId: "890362268601",
  appId: "1:890362268601:web:d88d9e9259dfd1b0e44468",
  measurementId: "G-H4EKREHKK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);