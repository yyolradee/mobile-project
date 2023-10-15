import firebase from "../firebaseConfig";

// ---------- Notifictaions --------------

export const getMyNotifications = (userId, setState) => {
  firebase
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
            notificationData.push({
              ...docSnapshot.data(),
              notification_id: docSnapshot.id,
            });
          }
        } catch (error) {
          console.error("Error fetching notification:", error);
        }
      }
      setState(notificationData);
    });
  return () => subscriber();
};

export const createNotification = (userId, payload) => {
  firebase
    .firestore()
    .runTransaction(async (transaction) => {
      // get notiArray form user
      const userDoc = firebase.firestore().collection("Users").doc(userId);
      let notificationsArray;
      await transaction.get(userDoc).then((docSnapshot) => {
        notificationsArray = docSnapshot.data().notifications;
      });

      // add new noti
      const notificationsCollection = firebase.firestore().collection("Notifications");
      const newNotificationRef = notificationsCollection.doc(); // Create a new document reference with an auto-generated ID
      const timestamp = firebase.firestore.Timestamp.now();
      await transaction.set(newNotificationRef, {
        ...payload,
        date_time: new Date(),
      });

      notificationsArray.push(newNotificationRef);
      transaction.update(userDoc, { notifications: notificationsArray });
      console.log("Added new Notification");
    })
    .catch((error) => console.log(error));
};
