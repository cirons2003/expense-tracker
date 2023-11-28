    



import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDCYRwfHvMd0lCfLeVD7IqNudUil3koe1k",
  authDomain: "finance-tracker-9f5c1.firebaseapp.com",
  projectId: "finance-tracker-9f5c1",
  storageBucket: "finance-tracker-9f5c1.appspot.com",
  messagingSenderId: "879568989384",
  appId: "1:879568989384:web:cd5671554821d41cf309fd",
  measurementId: "G-Q0V095E6DJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)


// firebase login 
// firebase init 
// firebase deploy


// Project Console: https://console.firebase.google.com/project/finance-tracker-9f5c1/overview
// Hosting URL: https://finance-tracker-9f5c1.web.app