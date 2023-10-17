import firebase from "../firebaseConfig"

export const getUserById = (userId, successCallback) => {
  const db = firebase.firestore();
  const usersRef = db.collection("Users");

  const userDoc = usersRef.doc(userId);

  userDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        successCallback(userData);
      }
    })
    .catch((error) => {
      errorCallback("Error fetching user data: " + error);
    });
};
