// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyA7lD8R6ov9dUZEl91aI3Ar6Lflvu1ZKIA",
  // authDomain: "my-as-12-turist.firebaseapp.com",
  // projectId: "my-as-12-turist",
  // storageBucket: "my-as-12-turist.firebasestorage.app",
  // messagingSenderId: "323299530903",
  // appId: "1:323299530903:web:898562fa8f7795ded831d2"
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);