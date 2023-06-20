// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRfJAuJYcW5Dd2vmU5rHN1mSkBEFWisew",
  authDomain: "test-web-8d584.firebaseapp.com",
  projectId: "test-web-8d584",
  storageBucket: "test-web-8d584.appspot.com",
  messagingSenderId: "211797555999",
  appId: "1:211797555999:web:7a897cefa21e0fc388ce2a",
  measurementId: "G-WD2K77D46P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

auth.settings.appVerificationDisabledForTesting = true

export { app, auth }