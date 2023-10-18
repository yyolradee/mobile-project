import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Screen
import MainNavigator from "./navigation/mainNavigator";
import LoginScreen from "./screens/LoginScreen";

// Auth
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth } from "./data/firebaseConfig";
import { checkLocalUser, handleGoogleSignIn, subscribeToAuthStateChanges } from "./data/auth/authUtils";
import { LoadingScreen } from "./screens/LoadingScreen";


WebBrowser.maybeCompleteAuthSession();

export default function App() {

  const [userLocalInfo, setUserLocalInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [req, res, promptAsync] = Google.useAuthRequest({
    iosClientId: "864621180068-kerk6g67bchrib8i8clobcrdhbv523n4.apps.googleusercontent.com",
    androidClientId: "864621180068-a2u6qjn4he81a942gpdsg3hf0g8nkfvv.apps.googleusercontent.com",
    webClientId: "864621180068-a8bfs5gdda7c2767srk05oc821a8b94u.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleGoogleSignIn(res, auth);
  }, [res]);

  useEffect(() => {
    checkLocalUser(setUserLocalInfo, setLoading);
    const unsub = subscribeToAuthStateChanges(setUserLocalInfo);
    return () => unsub();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  if (!userLocalInfo) {
    return <LoginScreen promptAsync={promptAsync} />;
  } else {
    return (
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <MainNavigator userLocalInfo={userLocalInfo} />
        </GestureHandlerRootView>
      </Provider>
    );
  }
}
