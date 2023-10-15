import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import NotificationBox from "../components/NotificationBox";
import NotiData from "../data/notificationData.json";
import { useNavigation } from "@react-navigation/native";

import {
  getMyNotifications,
  createNotification,
} from "../data/notifications/notificationsController";
import { useSelector } from "react-redux";

const NotificationScreen = () => {
  const userInfo = useSelector((state) => {
    return state.user.userInfo;
  });
  const [notifications, setNotifications] = useState();

  const navigation = useNavigation();
  const pressHandler = (id) => {
    navigation.navigate("postInNoti", { post_id: id });
  };

  useEffect(() => {
    getMyNotifications(userInfo.uid, setNotifications);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationBox notiItem={item} onPress={pressHandler} />
        )}
        keyExtractor={(item) => item.notification_id}
        showsVerticalScrollIndicator={false}
      />
      <Button title="sent Noti" onPress={() => {
        createNotification("VF2A0jeb9Hff8n7NwhgoCR9nOqS2", {
          post_id : "Ydus0sroXBCaxgpQwOlr",
          type: "update status",
          description : "ของคุณ กำลังดำเนินการแก้ไช"
        })
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default NotificationScreen;
