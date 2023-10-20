import firebase from "../firebaseConfig";

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

export const updateUserFaculty = (userId, faculty) => {
  firebase
    .firestore()
    .collection("Users")
    .doc(userId)
    .update({
      faculty: faculty
    })
    .then(() => {
      console.log(`Update user: ${userId} with faculty ${faculty}`);
    })
    .catch((error)=>{
      console.log(`Update faculty error: ${error}`);
    })
};
