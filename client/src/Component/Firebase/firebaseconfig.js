// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOuDkzBUgnUDxA0xIJmE7zPrrhlIdq2mw",
  authDomain: "genz-dabde.firebaseapp.com",
  projectId: "genz-dabde",
  storageBucket: "genz-dabde.appspot.com",
  messagingSenderId: "1046347792579",
  appId: "1:1046347792579:web:53d8d85da3956ebf0d6276",
  measurementId: "G-FZ82TQSW20",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
