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

export const createTrendingNotification = async (post_id) => {
  try {
    const db = firebase.firestore();
    await db.runTransaction(async (transaction) => {
      // เช็คว่าโพสต์นี้สถานที่คือที่ไหน
      const postRef = db.collection("Posts").doc(post_id);
      const memberList = [];
      let location_name;

      await transaction.get(postRef).then(async (doc) => {
        const locationRef = doc.data().location_id;
        const locationSnapshot = await locationRef.get();
        // เช็คว่ามีใครบ้างที่ติดตามสถานที่นี้
        location_name = locationSnapshot.data().name;
        console.log(location_name);
        const members = locationSnapshot.data().members;
        for (memberRef of members) {
          usersSnapshot = await memberRef.get();
          const oldNotiarray = usersSnapshot.data().notifications;
          memberList.push({ ref: memberRef, noti: oldNotiarray });
        }
      });

      // สร้าง noti ใหม่ลง db
      const newNotiRef = db.collection("Notifications").doc();
      await transaction.set(newNotiRef, {
        post_id: postRef,
        status: null,
        type: "trending",
        description: `กำลังเป็นที่สนใจใน ${location_name}`,
        date_time: new Date(),
      });

      // เพิ่ม noti ใหม่ลง noti array ของ user แต่ละคน
      for (member of memberList) {
        console.log("Updated", [...member.noti, newNotiRef]);
        await transaction.update(member.ref, {
          notifications: [...member.noti, newNotiRef],
        });
      }

      console.log("Created New Trending Notification");
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteNotification = async (notification_id) => {
  try {
    const db = firebase.firestore();
    const notiRef = db.collection("Notifications").doc(notification_id);
    // Array of Users that need to update notiArray
    const userArray = [];

    // Get a list of all users
    const usersRef = db.collection("Users");
    await usersRef.get().then((docSnapshot) => {
      docSnapshot.forEach(async (doc) => {
        const notiArray = doc.data().notifications;
        const existIndex = notiArray.findIndex(
          (noti) => noti.path === notiRef.path
        );
        console.log("Index ===> " + existIndex)
        // If the notification exists in the user's notiArray
        if (existIndex !== -1) {
          userArray.push({ user_id: doc.id, notiArray: notiArray, index: existIndex });
        }
      });
    });
    console.log(userArray);

    for (user of userArray) {
      const userRef = await db.collection("Users").doc(user.user_id);
      const notiArray = [...user.notiArray];
      notiArray.splice(user.index, 1)
      await userRef.update({ notifications: notiArray });
      console.log("Updated Users")
    }

    // Delete the notification
    console.log("deleted Noti in User");
    // await
  } catch (error) {
    throw error;
  }
};
