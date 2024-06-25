// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFVd6b0Ko5oCHZsmbCZYt8m147VXVSJI4",
  authDomain: "reactapp-83640.firebaseapp.com",
  projectId: "reactapp-83640",
  storageBucket: "reactapp-83640.appspot.com",
  messagingSenderId: "644226906306",
  appId: "1:644226906306:web:9df26272ef3e70d45ca35b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const imgdb = getStorage(app);