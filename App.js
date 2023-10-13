import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
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
import firebase, { auth } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import firestore from "@react-native-firebase/firestore";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userLocalInfo, setUserLocalInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [req, res, promptAsync] = Google.useAuthRequest({
    // credentials for google cloud services
    iosClientId: "864621180068-kerk6g67bchrib8i8clobcrdhbv523n4.apps.googleusercontent.com",
    androidClientId: "864621180068-a2u6qjn4he81a942gpdsg3hf0g8nkfvv.apps.googleusercontent.com",
    webClientId: "864621180068-a8bfs5gdda7c2767srk05oc821a8b94u.apps.googleusercontent.com",
  });

  const checkLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userDATA = userJSON ? JSON.parse(userJSON) : null;
      setUserLocalInfo(userDATA);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (res?.type == "success") {
      const { id_token } = res.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [res]);

  const customUserData = {
    faculty: "",
    follow_locations: [],
    follow_posts: [],
    notifications: [],
    role: "",
    update_date: "",
    // Add other custom data here
  };
  useEffect(() => {
    checkLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        firebase
          .firestore()
          .collection("Users")
          .doc(user.uid)
          .set(customUserData)
          .then(() => {
            console.log("Custom data attached to the user profile");
          })
          .catch((error) => {
            console.error("Error attaching custom data:", error);
          });
        // setUserLocalInfo(user);
        // await AsyncStorage.setItem("@user", JSON.stringify(user));
        // console.log(user);
      } else {
        setUserLocalInfo(null);
        console.log("Not Login");
      }
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>Please wait...</Text>
      </View>
    );
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
