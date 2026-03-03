// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "aimodel-646e9.firebaseapp.com",
  projectId: "aimodel-646e9",
  storageBucket: "aimodel-646e9.firebasestorage.app",
  messagingSenderId: "618890861365",
  appId: "1:618890861365:web:f6518305fd97df91b8ca7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}