import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase/compat";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB38QN1F43ZKfdyG1HFmIqtWrtlgkil2R4",
  authDomain: "kmitl-trouble.firebaseapp.com",
  projectId: "kmitl-trouble",
  storageBucket: "kmitl-trouble.appspot.com",
  messagingSenderId: "864621180068",
  appId: "1:864621180068:web:22219ed75ca09a44bfe231",
  measurementId: "G-LQ1PRTNJ36",
};

app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const storage = getStorage(app);

export default firebase.initializeApp(firebaseConfig);

// credentials for google cloud services
// Android: 159187597555-jta8s5e5mhlh4et2st5lq45eu2bvhs3q.apps.googleusercontent.com
// IOS: 159187597555-1r0pco54a6g3kk3c3so15d7ojq5pv3nv.apps.googleusercontent.com
// WEB: 159187597555-sr6jlaqlbujdg871iomntefv89kg7e5h.apps.googleusercontent.com
