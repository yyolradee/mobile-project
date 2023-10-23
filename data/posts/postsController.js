import firebase, { storage } from "../firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { createNotification } from "../notifications/notificationsController";

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

            setState({
              ...db,
              post_id: postId,
              location: locationData,
              categories: categoriesList,
            });
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
    const documentSnapshot = await firebase
      .firestore()
      .collection("Posts")
      .get();
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

export const addNewPost = async (itemData) => {
  const db = firebase.firestore();
  const locationsRef = db.collection("Locations");
  const usersRef = db.collection("Users");

  const categoryRef = itemData.categories_id.map((category_id) => {
    return db.doc(`Categories/${category_id}`);
  });

  const locationRef = locationsRef.doc(itemData.location_id);
  const userRef = usersRef.doc(itemData.owner_id);

  try {
    var downloadURL = null;
    if (itemData.img_path) {
      const localImagePath = itemData.img_path;
      const imageFileName = `${new Date().getTime()}_image.jpg`;
      const storageRef = ref(storage, `images/${imageFileName}`);
      const mediaBlob = await fetch(localImagePath).then((response) =>
        response.blob()
      );
      // // Upload the Blob to Firebase Storage
      const snapshot = await uploadBytes(storageRef, mediaBlob);
      // // Get the download URL
      downloadURL = await getDownloadURL(snapshot.ref);

      console.log("Download URL:", downloadURL);
    }
    // Add the post to Firestore with the image URL
    const postRef = db.collection("Posts");
    const newPost = {
      title: itemData.title,
      description: itemData.description,
      img_path: downloadURL, // Store the image URL
      vote: 0,
      comments: [],
      create_date: new Date(),
      update_date: new Date(),
      status: "รอรับเรื่อง",
      categories: categoryRef,
      location_id: locationRef,
      owner_id: userRef,
      is_trending: false,
    };

    const docRef = await postRef.add(newPost);
    console.log("Post added with ID: ", docRef.id);

    return true;
  } catch (error) {
    console.error("Error adding item: ", error);
    return false;
  }
};

export const updatePostWithId = async (postId, itemData) => {
  const db = firebase.firestore();
  const locationsRef = db.collection("Locations");
  const usersRef = db.collection("Users");

  const categoryRef = itemData.categories_id.map((category_id) => {
    return db.doc(`Categories/${category_id}`);
  });

  const locationRef = locationsRef.doc(itemData.location_id);

  try {
    var downloadURL = null;
    if (itemData.img_path) {
      const localImagePath = itemData.img_path;
      const imageFileName = `${new Date().getTime()}_image.jpg`;
      const storageRef = ref(storage, `images/${imageFileName}`);
      const mediaBlob = await fetch(localImagePath).then((response) =>
        response.blob()
      );

      // Check if there's an old image associated with the post
      if (itemData.old_img_path) {
        // Delete the old image from Firebase Storage
        const oldImageRef = ref(storage, itemData.old_img_path);
        await deleteObject(oldImageRef);
      }

      // Upload the new Blob to Firebase Storage
      const snapshot = await uploadBytes(storageRef, mediaBlob);
      // Get the download URL
      downloadURL = await getDownloadURL(snapshot.ref);

      console.log("Download URL:", downloadURL);
    }

    // Update the post in Firestore with the new image URL
    await db.collection("Posts").doc(postId).update({
      title: itemData.title,
      description: itemData.description,
      img_path: downloadURL,
      update_date: new Date(),
      categories: categoryRef,
      location_id: locationRef,
    });

    console.log("Post updated with ID: ", postId);
    return true;
  } catch (error) {
    console.log("Cannot update", error);
    return false;
  }
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
    const notiPostsRef = db
      .collection("Notifications")
      .where("post_id", "==", postsRef);
    const notiPostsQuery = await notiPostsRef.get();
    const reportedPostsRef = db
      .collection("ReportedPosts")
      .where("post_id", "==", postsRef);
    const reportedPostsQuery = await reportedPostsRef.get();
    const postDoc = await postsRef.get();

    if (postDoc.exists) {
      const post = postDoc.data();
      if (post.img_path) {
        // Delete the file in Firebase Storage
        const oldImageRef = ref(storage, post.img_path);
        await deleteObject(oldImageRef);
      }
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
    }
    console.log("Post and associated data deleted successfully");
  } catch (error) {
    console.error("Error deleting post and associated data:", error);
  }
};

export const addComment = async (postId, comment, setComments) => {
  try {
    const commentsRef = firebase.firestore().collection("Posts").doc(postId);

    // Define the comment object
    const newComment = {
      contents: comment.contents,
      create_date: new Date(),
      img_path: comment.img_path,
      name: comment.name,
      role: comment.role,
    };

    // Get the current comments array
    const doc = await commentsRef.get();
    const post = doc.data();
    const comments = post.comments || [];

    // Add the new comment to the comments array
    comments.push(newComment);

    // Update the comments in Firestore
    await commentsRef.update({
      comments: comments,
    });

    // Set up a real-time listener to watch for changes in the comments
    commentsRef.onSnapshot((doc) => {
      const updatedPost = doc.data();
      const updatedComments = updatedPost.comments || [];

      // You can update your UI with the new comments array
      console.log("Added comments success");
      setComments(updatedComments);
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (postId, status) => {
  try {
    const postRef = firebase.firestore().collection("Posts").doc(postId);
    await postRef.update({
      status: status,
    });
    let des;
    if (status == "กำลังดำเนินการ") {
      des = "กำลังดำเนินการแก้ไข"
    } else if (status == "แก้ไขเสร็จสิ้น") {
      des = "ได้ทำการแก้ไขเสร็จสิ้นแล้ว "
    } else if (status == "ไม่แก้ไข") {
      des = "ถูกปฏิเสธการแก้ไข"
    }
    await createNotification({
      post_id: postId,
      type: "update status",
      status: status,
      description: `ของคุณ ${des}`,
    });
    console.log("Status Updated");
  } catch (error) {
    console.error(error);
  }
};
