import { onAuthStateChanged } from "firebase/auth";
import firebase, { auth } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";


const customUserData = (date) => {
  return {
    faculty: null,
    follow_locations: [],
    follow_posts: [],
    notifications: [],
    role: "user",
    update_date: date,
  };
};

export const handleAuthStateChanged = (setUserLocalInfo) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      let docRef = firebase.firestore().collection("Users").doc(user.uid);
      docRef
        .get()
        .then((doc) => {
          let DATA = customUserData(new Date());
          if (doc.exists) {
            console.log("User exists");
          } else {
            firebase
              .firestore()
              .collection("Users")
              .doc(user.uid)
              .set(DATA)
              .then(() => {
                console.log("Custom data attached to the user profile");
              })
              .catch((error) => {
                console.error("Error attaching custom data:", error);
              });
          }
        })
        .catch(function (error) {
          console.error("Error getting document:", error);
        });

      setUserLocalInfo(user);
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } else {
      setUserLocalInfo(null);
      console.log("Not Login");
    }
  });
};


