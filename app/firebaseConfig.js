
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD8dRqJNf6SmEbnmU6kMVDCXMjT5N2A7v0",
  authDomain: "quiz-creator-67923.firebaseapp.com",
  databaseURL: "https://quiz-creator-67923-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quiz-creator-67923",
  storageBucket: "quiz-creator-67923.firebasestorage.app",
  messagingSenderId: "759371528735",
  appId: "1:759371528735:web:f81e35126d7122f6d6f32a"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const database = getDatabase(app);