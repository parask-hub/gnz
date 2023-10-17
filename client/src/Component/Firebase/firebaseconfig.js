// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Genz
// const firebaseConfig = {
//   apiKey: "AIzaSyBOuDkzBUgnUDxA0xIJmE7zPrrhlIdq2mw",
//   authDomain: "genz-dabde.firebaseapp.com",
//   projectId: "genz-dabde",
//   storageBucket: "genz-dabde.appspot.com",
//   messagingSenderId: "1046347792579",
//   appId: "1:1046347792579:web:53d8d85da3956ebf0d6276",
//   measurementId: "G-FZ82TQSW20",
// };

// Genz_2

// const firebaseConfig = {
//   apiKey: "AIzaSyB2WZ44KR841ynldzUC8zlUuAKH4muKgYE",
//   authDomain: "genz2-4d2e1.firebaseapp.com",
//   projectId: "genz2-4d2e1",
//   storageBucket: "genz2-4d2e1.appspot.com",
//   messagingSenderId: "773151976515",
//   appId: "1:773151976515:web:58d6935b8e437e27f5f8f6",
//   measurementId: "G-B0TENTT6S1",
// };

//Genz3
// const firebaseConfig = {
//   apiKey: "AIzaSyCR90RDUfhrQHTYq3X6GglEZiNwi042QMw",
//   authDomain: "genz3-ebca1.firebaseapp.com",
//   projectId: "genz3-ebca1",
//   storageBucket: "genz3-ebca1.appspot.com",
//   messagingSenderId: "324582283822",
//   appId: "1:324582283822:web:d423b77b7e7587a3c39dbf",
//   measurementId: "G-7WNQTVESPB",
// };

// Genz4
// const firebaseConfig = {
//   apiKey: "AIzaSyDhjwTMKvLuNMrbmj0QdrNzWra41yvPD1c",
//   authDomain: "genz4-e3038.firebaseapp.com",
//   projectId: "genz4-e3038",
//   storageBucket: "genz4-e3038.appspot.com",
//   messagingSenderId: "1087538986687",
//   appId: "1:1087538986687:web:a75e28fcd876872595d00a",
//   measurementId: "G-LZWNH37L2T",
// };

//Genc1
const firebaseConfig = {
  apiKey: "AIzaSyD3k5AgUbpHa14eN1O8EBaQsei6rxYehl4",
  authDomain: "genzc1.firebaseapp.com",
  projectId: "genzc1",
  storageBucket: "genzc1.appspot.com",
  messagingSenderId: "221530150327",
  appId: "1:221530150327:web:1d898545d0f97ac4eb4432",
  measurementId: "G-NGECPEGQ2S",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyD6uliHeY2r0ZNBiPjQfyGxTgDf4rH7lxM",
//   authDomain: "genz-2ac84.firebaseapp.com",
//   projectId: "genz-2ac84",
//   storageBucket: "genz-2ac84.appspot.com",
//   messagingSenderId: "286331448295",
//   appId: "1:286331448295:web:efa6b2d1856164ab44ab42",
//   measurementId: "G-94QSK7362C",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
