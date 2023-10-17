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
            console.error("Error fetching users:", error);
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

        data.push({
          ...post,
          post_id: doc.id,
          categories: tempCategoriesList,
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
      is_trending: false
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

export const updatePostWithId = (documentId, newData) => {
  const db = firebase.firestore();

  db.collection("Posts")
    .doc(documentId)
    .update(newData)
    .then((docRef) => {
      if (docRef.exists) {
        console.log("Post updated with ID: ", docRef.id);
        return true;
      } else {
        throw new Error("Collection is not exists");
      }
    })
    .catch((error) => {
      console.error("Error updating item:", error);
    });
};


export const getUserPosts = (userId, onDataReceived) => {
  const db = firebase.firestore();
  const postsRef = db.collection('Posts');

  // Set up a listener for real-time updates
  const query = postsRef.where('owner_id', '==', userId);
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


export const deletePostById = (postId) => {
  const db = firebase.firestore();

  const itemsRef = db.collection('Posts');

  itemsRef.doc(postId)
    .delete()
    .then(() => {
      console.log('Post deleted successfully');
    })
    .catch((error) => {
      console.error('Error deleting post:', error);
    });
}