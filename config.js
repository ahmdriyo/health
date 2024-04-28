
import  firebase  from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyBDs9XUR5bMF0Xv5moQ8oQk4Mt5ILc_86A",
  authDomain: "health-fit-1d40d.firebaseapp.com",
  projectId: "health-fit-1d40d",
  storageBucket: "health-fit-1d40d.appspot.com",
  messagingSenderId: "705426915433",
  appId: "1:705426915433:web:fde407363f5f5a731962f8"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const userRef = db.collection('users');
const roomRef = db.collection('rooms');

export { firebase, auth, db, userRef, roomRef };

