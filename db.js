// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLKBtaIhQi6sjl7ceHqfikUxGaP1ftPCI",
  authDomain: "minh-8cdc2.firebaseapp.com",
  databaseURL:
    "https://minh-8cdc2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "minh-8cdc2",
  storageBucket: "minh-8cdc2.appspot.com",
  messagingSenderId: "872089676929",
  appId: "1:872089676929:web:911d7f1c7d7f2c4e5af180",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db}