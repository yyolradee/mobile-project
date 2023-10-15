
import firebase from "../firebaseConfig";


// ---------- Catagories ---------------

export const getAllCategories = () => {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("Categories")
        .get()
        .then((documentSnapshot) => {
          const data = [];
          documentSnapshot.forEach((doc) => {
            data.push({ ...doc.data(), category_id: doc.id });
          });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };


  export const getSelectorCategories = (setState) => {
    firebase
      .firestore()
      .collection("Categories")
      .get()
      .then((documentSnapshot) => {
        const data = [];
        documentSnapshot.forEach((doc) => {
          data.push({ key: doc.id, value: doc.data().name });
        });
        setState(data);
      });
  };