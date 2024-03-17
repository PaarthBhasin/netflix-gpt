// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA8Aik3QHlgIyhtlTXeeMHDxQg2hyYJ58",
  authDomain: "netflix-gpt-53311.firebaseapp.com",
  projectId: "netflix-gpt-53311",
  storageBucket: "netflix-gpt-53311.appspot.com",
  messagingSenderId: "916038236112",
  appId: "1:916038236112:web:fc2caeae47ef271167ebd5",
  measurementId: "G-5HV1HMQR47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();