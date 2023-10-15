import firebase from "../firebaseConfig";

// ---------- Posts ---------------

export const getPostsById = (postId, setState) => {
  firebase
    .firestore()
    .collection("Posts")
    .doc(postId)
    .get()
    .then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        setState({ ...documentSnapshot.data(), post_id: postId });
      } else {
        console.error("Document does not exist");
        setState(null); // Return null or handle the non-existent document as needed
      }
    });
};