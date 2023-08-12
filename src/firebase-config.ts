import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtbGqUdgvTj7Ax0ZWvC0cq1_47zeoBtFE",
  authDomain: "my-todo-920ff.firebaseapp.com",
  projectId: "my-todo-920ff",
  storageBucket: "my-todo-920ff.appspot.com",
  messagingSenderId: "798471102928",
  appId: "1:798471102928:web:2ac472a90aefc421c799d5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
