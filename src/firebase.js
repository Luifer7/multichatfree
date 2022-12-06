
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuisZw72iHTfZtBMuxsqs_yNXuYizCmTw",
  authDomain: "dobleufilms-f07e7.firebaseapp.com",
  projectId: "dobleufilms-f07e7",
  storageBucket: "dobleufilms-f07e7.appspot.com",
  messagingSenderId: "759500438446",
  appId: "1:759500438446:web:85601b4a6475ec4334663f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


export {auth, db}