// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-35a2f.firebaseapp.com",
  projectId: "mern-estate-35a2f",
  storageBucket: "mern-estate-35a2f.appspot.com",
  messagingSenderId: "884423449773",
  appId: "1:884423449773:web:48309fa776ac765d657a24"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);