// Import the functions you need from the SDKs you need
import  firebase  from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDs9XUR5bMF0Xv5moQ8oQk4Mt5ILc_86A",
  authDomain: "health-fit-1d40d.firebaseapp.com",
  projectId: "health-fit-1d40d",
  storageBucket: "health-fit-1d40d.appspot.com",
  messagingSenderId: "705426915433",
  appId: "1:705426915433:web:fde407363f5f5a731962f8",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
