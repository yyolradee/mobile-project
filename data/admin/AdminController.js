import firebase from "../firebaseConfig";

export const getDocumentCount = async (collectionName, callback) => {
  try {
    const db = firebase.firestore();
    const query = db.collection(collectionName);
    const snapshot = await query.get();
    callback((counts) => {
      return [...counts, snapshot.size];
    });
  } catch (error) {
    console.error("Error counting documents:", error);
  }
};

export const getMatchingDocumentCount = async (values, callback) => {
  try {
    const db = firebase.firestore();
    const counts = [];

    for (const value of values) {
      const query = db.collection("Posts").where("status", "==", value);
      const snapshot = await query.get();
      counts.push(snapshot.size);
    }
    const repostQuery = db.collection("ReportedPosts");
    const reportSnapshot = await repostQuery.get();
    return callback([...counts, reportSnapshot.size]);
  } catch (error) {
    console.error("Error counting matching documents:", error);
  }
};
