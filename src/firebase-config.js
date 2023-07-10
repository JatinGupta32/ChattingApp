// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB6OqhQj831XhH8KN5fmwIgZRrsIVkbfNE",
  authDomain: "chatapp-791a9.firebaseapp.com",
  projectId: "chatapp-791a9",
  storageBucket: "chatapp-791a9.appspot.com",
  messagingSenderId: "514036743124",
  appId: "1:514036743124:web:9270d143e1686635bef441"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();