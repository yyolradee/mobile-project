import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB38QN1F43ZKfdyG1HFmIqtWrtlgkil2R4",
  authDomain: "kmitl-trouble.firebaseapp.com",
  projectId: "kmitl-trouble",
  storageBucket: "kmitl-trouble.appspot.com",
  messagingSenderId: "864621180068",
  appId: "1:864621180068:web:22219ed75ca09a44bfe231",
  measurementId: "G-LQ1PRTNJ36"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Android: 159187597555-jta8s5e5mhlh4et2st5lq45eu2bvhs3q.apps.googleusercontent.com
// IOS: 159187597555-1r0pco54a6g3kk3c3so15d7ojq5pv3nv.apps.googleusercontent.com
