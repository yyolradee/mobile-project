import firebase from "../firebaseConfig";

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
 * @param {Object} payload Noti info to create
 *
 * payload Spec
 * {
 *  post_id : post_id,
 *  type : enum("update status", "trending"),
 *  status: enum("รอรับเรื่อง", "กำลังดำเนินการ", "แก้ไขเสร็จสิ้น", "ไม่แก้ไข"),
 *  description: description
 * }
 */
export const createNotification = async (payload) => {
  await firebase
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

export const trendingNotification = (post_id) => {
  // เช็คว่าโพสต์นี้สถานที่คือที่ไหน
  // เช็คว่ามีใครบ้างที่ติดตามสถานที่นี้
  // สร้าง noti ใหม่ลง db
  // เพิ่ม noti ใหม่ลง noti array ของ user แต่ละคน
};

// ไม่เวิร์คเพราะไรไม่รู้ ค่อยมาแก้พน.ขอนอนก่อน เจอกั๊นนนนน
export const deleteNotification = async (notification_id) => {
  try {
    const db = firebase.firestore();
    const notiRef = db.collection("Notifications").doc(notification_id);

    // Array ของ User ที่ต้อง update notiArray
    const userArray = [];
    // เอา user แต่ละคนมาเช็คว่ามี noti อันนี้อยู่มั้ย
    await db.collection("Users").get((docSnapshot) => {
      docSnapshot.forEach(async (doc) => {
        // check ว่ามี noti id นี้อยู่หรือไม่
        const notiArray = doc.data().notifications;
        const copyNotiArray = [];
        notiArray.forEach((noti) => {
          copyNotiArray.push(noti);
        });
        const exist = copyNotiArray.findIndex((noti) => {
          noti.path == notiRef.path;
        });
        // ถ้ามี noti id นี้อยู่
        if (exist !== -1) {
          copyNotiArray.splice(exist, 1);
          userArray.push({ user_id: doc.id, newNotiArray: copyNotiArray });
        }
      });
    });

    await db.runTransaction((transaction) => {
      // delete Notification in Users
      userArray.forEach((user) => {
        const userRef = db.collection("Users").doc(user.user_id);
        transaction.update(userRef, { notifications: user.newNotiArray });
      });
      // delete Notification
      transaction.delete(notiRef);
    });
  } catch (error) {
    throw error;
  }
};
