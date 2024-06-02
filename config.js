import { initializeApp } from "firebase/app";
import { getReactNativePersistence,initializeAuth} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBDs9XUR5bMF0Xv5moQ8oQk4Mt5ILc_86A",
  authDomain: "health-fit-1d40d.firebaseapp.com",
  projectId: "health-fit-1d40d",
  storageBucket: "health-fit-1d40d.appspot.com",
  messagingSenderId: "705426915433",
  appId: "1:705426915433:web:fde407363f5f5a731962f8"
};

// Initialize Firebaseconst app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
  persistence : getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const userRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');

