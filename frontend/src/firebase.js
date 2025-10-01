import { initializeApp } from "firebase/app";
// Import the Authentication module
import { getAuth } from "firebase/auth";
// Import Analytics module (optional)
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Your actual keys are now securely added
  apiKey: "AIzaSyDBOiqDgUb0HvVdRA7ppsEM0lzYjU82180",
  authDomain: "xprep-c5b0b.firebaseapp.com",
  projectId: "xprep-c5b0b",
  storageBucket: "xprep-c5b0b.firebasestorage.app",
  messagingSenderId: "276191498735",
  appId: "1:276191498735:web:8d5ab3386ace473a79661a",
  measurementId: "G-DL1CYSF2R4",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app); 
const auth = getAuth(app); // Initialize Authentication service

// CRITICAL FIX: Use NAMED EXPORT to match your component imports:
export { auth };
