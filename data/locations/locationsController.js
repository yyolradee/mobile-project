import firebase from "../firebaseConfig";

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

export const getFollowLocations = (user_id) => {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();
    db.collection("Users")
      .doc(user_id)
      .get()
      .then((documentSnapshot) => {
        const followList = [];
        documentSnapshot.data().follow_locations.forEach((location) => {
          location.get().then((documentSnapshot) => {
            followList.push({
              ...documentSnapshot.data(),
              location_id: documentSnapshot.id,
            });
          });
        });
        console.log(followList);
        resolve(followList);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getLocationById = (location_id) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("Locations")
      .doc(location_id)
      .get()
      .then((documentSnapshot) => {
        const locationData = {...documentSnapshot.data(), location_id: documentSnapshot.id}
        resolve(locationData)
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addMember = (location_id, user_id) => {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();
    const locationMemberArray = [];
    const userFollowArray = [];
    const userRef = db.collection("Users").doc(user_id);
    const locationRef = db.collection("Locations").doc(location_id);

    db.runTransaction(async (transaction) => {
      await transaction.get(locationRef).then(async (documentSnapshot) => {
        if (documentSnapshot.exists) {
          const memberArray = documentSnapshot.data().members;
          memberArray.forEach((member) => {
            locationMemberArray.push(member);
          });
        } else {
          console.error("Document does not exist");
        }
      });

      await transaction.get(userRef).then(async (documentSnapshot) => {
        if (documentSnapshot.exists) {
          const followLocationArray = documentSnapshot.data().follow_locations;
          followLocationArray.forEach((location) => {
            userFollowArray.push(location);
          });
        } else {
          console.error("Documents does not exist");
        }
      });

      let checkMemberIndex = locationMemberArray.findIndex(
        (ref) => ref.path == userRef.path
      );
      if (checkMemberIndex !== -1) {
        throw new Error("User is already Member");
      }
      locationMemberArray.push(userRef);
      await transaction.update(locationRef, {
        members: locationMemberArray,
      });

      let checkFollowIndex = userFollowArray.findIndex(
        (ref) => ref.path == userRef.path
      );
      if (checkFollowIndex !== -1) {
        throw new Error("User is already Member");
      }
      userFollowArray.push(locationRef);
      await transaction.update(userRef, {
        follow_locations: userFollowArray,
      });
    })
      .then(() => {
        resolve("Added Member");
        console.log("Member added to Users and Locations");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteMember = (location_id, user_id) => {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();
    const locationMemberArray = [];
    const userFollowArray = [];
    const userRef = db.collection("Users").doc(user_id);
    const locationRef = db.collection("Locations").doc(location_id);

    db.runTransaction(async (transaction) => {
      await transaction.get(locationRef).then(async (documentSnapshot) => {
        if (documentSnapshot.exists) {
          const memberArray = documentSnapshot.data().members;
          memberArray.forEach((member) => {
            locationMemberArray.push(member);
          });
        } else {
          console.error("Document does not exist");
        }
      });

      await transaction.get(userRef).then(async (documentSnapshot) => {
        if (documentSnapshot.exists) {
          const followLocationArray = documentSnapshot.data().follow_locations;
          followLocationArray.forEach((location) => {
            userFollowArray.push(location);
          });
        } else {
          console.error("Documents does not exist");
        }
      });

      let removeMemberIndex = locationMemberArray.findIndex(
        (ref) => ref.path == userRef.path
      );
      if (removeMemberIndex !== 1) {
        locationMemberArray.splice(removeMemberIndex, 1);
      } else {
        throw new Error("not have this member in Location");
      }
      await transaction.update(locationRef, {
        members: locationMemberArray,
      });

      let removeFollowIndex = userFollowArray.findIndex(
        (ref) => ref.path == locationRef.path
      );
      if (removeFollowIndex !== -1) {
        userFollowArray.splice(removeFollowIndex, 1);
      } else {
        throw new Error("not have this location in follow location");
      }
      await transaction.update(userRef, {
        follow_locations: userFollowArray,
      });
    })
      .then(() => {
        resolve("Deleted Member");
        console.log("Member deleted from Users and Locations");
      })
      .catch((error) => {
        reject(error);
      });
  });
};
