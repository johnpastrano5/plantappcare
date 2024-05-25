import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5cRtWqNW62xe9IiIH8oD0zVh0HV9EYkg",
  authDomain: "plantcareapp-11f5b.firebaseapp.com",
  projectId: "plantcareapp-11f5b",
  storageBucket: "plantcareapp-11f5b.appspot.com",
  messagingSenderId: "817908811746",
  appId: "1:817908811746:web:b199332f2cd207a26e9bbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };
