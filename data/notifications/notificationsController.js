import firebase from "../firebaseConfig";
import { useSelector } from "react-redux";

// ---------- Notifictaions --------------

export const getMyNotifications = async (userId, setState) => {
  try {
    await firebase
      .firestore()
      .collection("Users")
      .doc(userId)
      .onSnapshot(async (documentSnapshot) => {
        const listOfNoti = documentSnapshot.data().notifications || [];
        const notificationData = [];

        for (noti of listOfNoti) {
          try {
            const docSnapshot = await noti.get();
            if (docSnapshot.exists) {
              const postSnapshot = await docSnapshot.data().post_id.get();
              const post = postSnapshot.data();
              notificationData.push({
                ...docSnapshot.data(),
                notification_id: docSnapshot.id,
                post: { ...post, post_id: postSnapshot.id },
              });
            }
          } catch (error) {
            console.error("Error fetching notification:", error);
          }
        }

        notificationData.sort((a, b) => b.date_time - a.date_time);
        setState(notificationData);
      });
    return () => subscriber();
  } catch (error) {
    console.error("getNotificationError");
  }
};

/**
 * This function create new notification
 *
 * @param {Object} payload num1 - The first number to be added.
 * 
 * payload Spec
 * {
 *  post_id : post_id,
 *  type : enum("update status", "trending"),
 *  status: enum("รอรับเรื่อง", "กำลังดำเนินการ", "แก้ไขเสร็จสิ้น", "ไม่แก้ไข"),
 *  description: description
 * }
 */
export const createNotification = (payload) => {
  firebase
    .firestore()
    .runTransaction(async (transaction) => {
      // check who is owner of this post
      const postDoc = firebase
        .firestore()
        .collection("Posts")
        .doc(payload.post_id);
      let userDoc;
      await transaction.get(postDoc).then((docSnapshot) => {
        userDoc = docSnapshot.data().owner_id;
      });

      // get notiArray form user
      let notificationsArray;
      await transaction.get(userDoc).then((docSnapshot) => {
        notificationsArray = docSnapshot.data().notifications;
      });

      // add new noti
      const notificationsCollection = firebase
        .firestore()
        .collection("Notifications");
      const newNotificationRef = notificationsCollection.doc(); // Create a new document reference with an auto-generated ID
      await transaction.set(newNotificationRef, {
        ...payload,
        date_time: new Date(),
        post_id: postDoc,
      });

      notificationsArray.push(newNotificationRef);
      await transaction.update(userDoc, { notifications: notificationsArray });
      console.log("Added new Notification");
    })
    .catch((error) => console.log(error));
};
