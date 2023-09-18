import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDtbGqUdgvTj7Ax0ZWvC0cq1_47zeoBtFE",
//   authDomain: "my-todo-920ff.firebaseapp.com",
//   projectId: "my-todo-920ff",
//   storageBucket: "my-todo-920ff.appspot.com",
//   messagingSenderId: "798471102928",
//   appId: "1:798471102928:web:2ac472a90aefc421c799d5",
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
