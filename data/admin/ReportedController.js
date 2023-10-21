import firebase from "../firebaseConfig";

export const getReportedPost = async () => {
  try {
    const reportedPostsArray = [];
    const db = firebase.firestore();
    const documentSnapshot = await db
      .collection("ReportedPosts")
      .orderBy("date_time", "asc")
      .get();
    for (const doc of documentSnapshot.docs) {
      const reportedPost = doc.data();
      const postSnapshot = await reportedPost.post_id.get();
      const post_id = postSnapshot.id;
      reportedPostsArray.push({
        ...reportedPost,
        report_id: doc.id,
        post_id: post_id,
      });
    }
    return reportedPostsArray;
  } catch (error) {
    console.error(error);
  }
};

export const deleteReportedPost = async (report_id) => {
  try {
    const db = firebase.firestore();
    await db.collection("ReportedPosts").doc(report_id).delete();
    console.log("reportedPost deleted successfully");
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param {String} post_id
 * @param {String} reporter_id
 * @param {String} reporter_name
 */
export const addReportedPost = async (post_id, report_id, reporter_name) => {
  try {
    const db = firebase.firestore();
    const userRef = db.collection("Users").doc(report_id);
    const postRef = db.collection("Posts").doc(post_id);
    const reportedPostRef = db.collection("ReportedPosts");

    //check is Reported by this user
    let isRedundance;
    const reportedData = [];
    await reportedPostRef.get().then((documentSnapshot) => {
      documentSnapshot.forEach((doc) => {
        reportedData.push(doc.data());
      });
    });
    reportedData.forEach((data) => {
      if (
        userRef.path === data.reporter_id.path &&
        postRef.path == data.post_id.path
      ) {
        console.log("รายงานซ้ำ");
        isRedundance = true;
        return "คุณได้รายงานโพสต์นี้ไปแล้ว ไม่สามารถรายงานซ้ำได้";
      }
    });

    if (isRedundance) {
      return "คุณได้รายงานโพสต์นี้ไปแล้ว ไม่สามารถรายงานซ้ำได้";
    }

    await reportedPostRef.add({
      post_id: postRef,
      reporter_id: userRef,
      reporter_name: reporter_name,
      date_time: new Date(),
    });

    return "รายงานโพสต์สำเร็จ";
  } catch (error) {
    console.error(error);
    throw error;
  }
};
