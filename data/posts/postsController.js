import firebase from "../firebaseConfig";

// ---------- Posts ---------------

export const getPostsById = (postId, setState) => {
  firebase
    .firestore()
    .collection("Posts")
    .doc(postId)
    .then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        setState({ ...documentSnapshot.data(), post_id: postId });
      } else {
        console.error("Document does not exist");
        setState(null);
      }
    });
};

export const getAllPosts = async () => {
  try {
    const documentSnapshot = await firebase.firestore().collection("Posts").get();
    const data = [];

    await Promise.all(
      documentSnapshot.docs.map(async (doc) => {
        const post = doc.data();
        const categoriesList = doc.data().categories || [];
        const tempCategoriesList = [];
        const locationRef = doc.data().location_id;
        let locationData = null;
        const ownerRef = doc.data().owner_id;
        let ownerData = null;

        if (locationRef) {
          try {
            const locationSnapshot = await locationRef.get();
            if (locationSnapshot.exists) {
              locationData = {
                ...locationSnapshot.data(),
                location_id: locationSnapshot.id,
              };
            }
          } catch (error) {
            console.error("Error fetching location:", error);
          }
        }

        if (ownerRef) {
          try {
            const ownerSnapshot = await ownerRef.get();
            if (ownerSnapshot.exists) {
              ownerData = {
                ...ownerSnapshot.data(),
                owner_id: ownerSnapshot.id,
              };
            }
          } catch (error) {
            console.error("Error fetching location:", error);
          }
        }

        await Promise.all(
          categoriesList.map(async (item) => {
            try {
              const docSnapshot = await item.get();
              if (docSnapshot.exists) {
                tempCategoriesList.push({
                  ...docSnapshot.data(),
                  category_id: docSnapshot.id,
                });
              }
            } catch (error) {
              console.error("Error fetching categories:", error);
            }
          })
        );

        data.push({ ...post, post_id: doc.id, categories: tempCategoriesList, location: locationData, owner: ownerData});
      })
    );
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
