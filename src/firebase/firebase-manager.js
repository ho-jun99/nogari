import firebase from "firebase/app";
import "firebase/firestore";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyB4S8bwplLBO2akKgUWHKtkUjwfwAPhUeE",
  authDomain: "nogari-2e614.firebaseapp.com",
  databaseURL: "https://nogari-2e614-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nogari-2e614",
  storageBucket: "nogari-2e614.appspot.com",
  messagingSenderId: "678673807435",
  appId: "1:678673807435:web:89d6aed9102c1fb610f5ce",
  measurementId: "G-S131ML6MYE"
};


export const database = getDatabase();

firebase.initializeApp(firebaseConfig);