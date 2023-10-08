import React, { useEffect, useState } from "react";
import {View, Text} from "react-native"
import { Provider } from "react-redux";
import store from "./store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Screen
import MainNavigator from "./navigation/mainNavigator";
import LoginScreen from "./screens/LoginScreen";

// Auth
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();


export default function App() {
  const [userLocalInfo, setUserLocalInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [req, res, promptAsync] = Google.useAuthRequest({
    // credentials for google cloud services
    iosClientId: "159187597555-1r0pco54a6g3kk3c3so15d7ojq5pv3nv.apps.googleusercontent.com",
    androidClientId: "159187597555-jta8s5e5mhlh4et2st5lq45eu2bvhs3q.apps.googleusercontent.com",
    webClientId: "159187597555-sr6jlaqlbujdg871iomntefv89kg7e5h.apps.googleusercontent.com"
  });

  const checkLocalUser = async () => {
    try {
      setLoading(true)
      const userJSON = await AsyncStorage.getItem("@user")
      const userDATA = userJSON ? JSON.parse(userJSON) : null;
      setUserLocalInfo(userDATA)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (res?.type == "success") {
      const { id_token } = res.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [res]);

  useEffect(() => {
    checkLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserLocalInfo(user);
        await AsyncStorage.setItem("@user", JSON.stringify(user))
      } else {
        setUserLocalInfo(null)
        console.log("Not Login");
      }
    });
    return () => unsub();
  }, []);


  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{fontSize: 20}}>Please wait...</Text>
      </View>
    )
  }
  if (!userLocalInfo) {
    return <LoginScreen promptAsync={promptAsync} />;
  } else {
    return (
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <MainNavigator userLocalInfo={userLocalInfo}/>
        </GestureHandlerRootView>
      </Provider>
    );
  }
}
