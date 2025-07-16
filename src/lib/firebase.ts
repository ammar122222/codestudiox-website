// src/lib/firebase.ts

// Import Firebase SDK core
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase config (yours is correct)
const firebaseConfig = {
  apiKey: 'AIzaSyAqtmtAA9sy53HnnvU6TWwwEzC1pDEop_U',
  authDomain: 'codestudiox-portfolio.firebaseapp.com',
  projectId: 'codestudiox-portfolio',
  storageBucket: 'codestudiox-portfolio.appspot.com',
  messagingSenderId: '157407224541',
  appId: '1:157407224541:web:0790b266856003fabfb134',
  measurementId: 'G-3R7R9SZQYD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
