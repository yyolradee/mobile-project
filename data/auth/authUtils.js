import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { handleAuthStateChanged } from "./authUser";

export const checkLocalUser = async (setUserLocalInfo, setLoading) => {
  try {
    setLoading(true);
    let userJSON = await AsyncStorage.getItem("@user");
    let userDATA = userJSON ? JSON.parse(userJSON) : null;
    setUserLocalInfo(userDATA);
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

export const handleGoogleSignIn = (res, auth) => {
  if (res?.type === "success") {
    const { id_token } = res.params;
    const credential = GoogleAuthProvider.credential(id_token);
    signInWithCredential(auth, credential);
  }
};

export const subscribeToAuthStateChanges = (setUserLocalInfo) => {
  const unsub = handleAuthStateChanged(setUserLocalInfo);
  return () => unsub();
};
