import firebase from "../firebaseConfig";

// ---------- Posts ---------------

export const getPostsById = async (postId, setState) => {
  try {
    await Promise.all(
      firebase
        .firestore()
        .collection("Posts")
        .doc(postId)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            const db = doc.data();
            const locationRef = db.location_id;
            let locationData = null;
            const categoriesRef = db.categories || [];
            const categoriesList = [];

            if (locationRef) {
              try {
                const locationSnapshot = await locationRef.get();
                if (locationSnapshot.exists) {
                  locationData = {
                    // ...locationSnapshot.data(), //disable for performance
                    name: locationSnapshot.data().name,
                    location_id: locationSnapshot.id,
                  };
                }
              } catch (error) {
                console.error("Error fetching location:", error);
              }
            }

            await Promise.all(
              categoriesRef.map(async (item) => {
                try {
                  const categoriesSnapshot = await item.get();
                  if (categoriesSnapshot.exists) {
                    categoriesList.push({
                      ...categoriesSnapshot.data(), //disable for performance
                      category_id: categoriesSnapshot.id,
                    });
                  }
                } catch (error) {
                  console.error("Error fetching categories:", error);
                }
              })
            );

            setState({ ...db, post_id: postId, location: locationData, categories: categoriesList });
          } else {
            console.error("Document does not exist");
            setState(null);
          }
        })
    );
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const documentSnapshot = await firebase.firestore().collection("Posts").get();
    const data = [];

    await Promise.all(
      documentSnapshot.docs.map(async (doc) => {
        const post = doc.data();
        const categoriesRef = doc.data().categories || [];
        const categoriesList = [];
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
            console.error("Error fetching users:", error);
          }
        }

        await Promise.all(
          categoriesRef.map(async (item) => {
            try {
              const categoriesSnapshot = await item.get();
              if (categoriesSnapshot.exists) {
                categoriesList.push({
                  ...categoriesSnapshot.data(),
                  category_id: categoriesSnapshot.id,
                });
              }
            } catch (error) {
              console.error("Error fetching categories:", error);
            }
          })
        );

        data.push({
          ...post,
          post_id: doc.id,
          categories: categoriesList,
          location: locationData,
          owner: ownerData,
        });
      })
    );
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const addNewPost = (itemData) => {
  const db = firebase.firestore();
  const locationsRef = db.collection("Locations");
  const usersRef = db.collection("Users");

  const categoryRef = itemData.categories_id.map((category_id) => {
    return db.doc(`Categories/${category_id}`);
  });

  const locationRef = locationsRef.doc(itemData.location_id);
  const userRef = usersRef.doc(itemData.owner_id);

  const img_path = itemData.img_path;

  db.collection("Posts")
    .add({
      title: itemData.title,
      description: itemData.description,
      img_path: img_path,
      vote: 0,
      comments: [],
      create_date: new Date(),
      update_date: new Date(),
      status: "รอรับเรื่อง",
      categories: categoryRef,
      location_id: locationRef,
      owner_id: userRef,
      is_trending: false,
    })
    .then((docRef) => {
      if (docRef) {
        console.log("Post added with ID: ", docRef.id);
        return true;
      } else {
        throw new Error("Collection is not exists");
      }
    })
    .catch((error) => {
      console.error("Error adding item: ", error);
    });
};

export const updatePostWithId = (postId, itemData) => {
  const db = firebase.firestore();
  const locationsRef = db.collection("Locations");
  const usersRef = db.collection("Users");

  const categoryRef = itemData.categories_id.map((category_id) => {
    return db.doc(`Categories/${category_id}`);
  });

  const locationRef = locationsRef.doc(itemData.location_id);
  const userRef = usersRef.doc(itemData.owner_id);

  const img_path = itemData.img_path;

  db.collection("Posts")
    .doc(postId)
    .update({
      title: itemData.title,
      description: itemData.description,
      img_path: img_path,
      update_date: new Date(),
      categories: categoryRef,
      location_id: locationRef,
      owner_id: userRef,
    })
    .then(() => {
      console.log("Post updated with ID: ", postId);
      return true;
    })
    .catch((error) => {
      console.error("Error updating item:", error);
    });
};

export const getUserPosts = (userId, onDataReceived) => {
  const db = firebase.firestore();
  const postsRef = db.collection("Posts");

  // Set up a listener for real-time updates
  const query = postsRef.where("owner_id", "==", userId);
  const unsubscribe = query.onSnapshot((snapshot) => {
    const Posts = snapshot.docs.map((doc) => ({
      post_id: doc.id,
      ...doc.data(),
    }));
    onDataReceived(Posts);
  });

  // Return the unsubscribe function to clean up the listener
  return unsubscribe;
};

export const deletePostById = async (postId) => {
  try {
    const db = firebase.firestore();
    const postsRef = db.collection("Posts").doc(postId);
    const notiPostsRef = db.collection("Notifications").where("post_id", "==", postsRef);
    const notiPostsQuery = await notiPostsRef.get();
    const reportedPostsRef = db.collection("ReportedPosts").where("post_id", "==", postsRef);
    const reportedPostsQuery = await reportedPostsRef.get();
    await db.runTransaction(async (transaction) => {
      // Delete Notifications associated with the post
      notiPostsQuery.forEach(async (doc) => {
        transaction.delete(doc.ref);
        console.log("delete noti");
      });

      // Delete ReportedPosts associated with the post
      reportedPostsQuery.forEach(async (doc) => {
        transaction.delete(doc.ref);
        console.log("delete report post");
      });

      // Delete the post itself
      transaction.delete(postsRef);
    });

    console.log("Post and associated data deleted successfully");
  } catch (error) {
    console.error("Error deleting post and associated data:", error);
  }
};
