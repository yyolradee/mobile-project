import firebase from "../firebaseConfig"

// ---------- Locations ----------------

export const getAllLocations = () => {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("Locations")
        .get()
        .then((documentSnapshot) => {
          const data = [];
          documentSnapshot.forEach((doc) => {
            data.push({ ...doc.data(), location_id: doc.id });
          });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };