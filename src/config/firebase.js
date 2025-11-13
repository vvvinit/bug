import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// Note: In production, these should be environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDBRcA1j9VEJ-UwCDzNdYTG5840RKfyKbs",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "bug-latte.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "bug-latte",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "bug-latte.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "570781289886",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:570781289886:web:dcfe54c2c17b59fbe29a8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);

export default app;
