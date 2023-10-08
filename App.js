import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {req, res, promptAsync} from "./auth"

WebBrowser.maybeCompleteAuthSession();

import MainNavigator from "./navigation/mainNavigator";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  const [userInfo, setUserInfo] = useState();
  const [req, res, promptAsync] = Google.useAuthRequest({
    iosClientId: "159187597555-1r0pco54a6g3kk3c3so15d7ojq5pv3nv.apps.googleusercontent.com",
    androidClientId: "159187597555-jta8s5e5mhlh4et2st5lq45eu2bvhs3q.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (res?.type == "success") {
      const { id_token } = res.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [res]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
      } else {
        console.log("No User");
      }
    });
    return () => unsub();
  }, []);

  if (!userInfo) {
    return <LoginScreen promptAsync={promptAsync} />;
  } else {
    return (
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <MainNavigator />
        </GestureHandlerRootView>
      </Provider>
    );
  }
}
