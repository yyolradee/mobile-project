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

export const getFollowLocations = async (user_id) => {
  try {
    const followList = [];
    const db = firebase.firestore();
    const documentSnapshot = await db.collection("Users").doc(user_id).get();
    const followLocationPromises = documentSnapshot
      .data()
      .follow_locations.map(async (location) => {
        const locationSnapshot = await location.get();
        followList.push({
          ...locationSnapshot.data(),
          location_id: locationSnapshot.id,
        });
      });

    await Promise.all(followLocationPromises);
    return followList;
  } catch (error) {
    return error;
  }
};

export const getLocationById = async (location_id) => {
  try {
    const db = firebase.firestore();
    const documentSnapshot = await db
      .collection("Locations")
      .doc(location_id)
      .get();

    if (documentSnapshot.exists) {
      const locationData = {
        ...documentSnapshot.data(),
        location_id: documentSnapshot.id,
      };
      return locationData;
    } else {
      throw new Error("Document does not exist");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
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
      if (removeMemberIndex !== -1) {
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
