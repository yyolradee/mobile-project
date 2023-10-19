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
import Colors from "../constants/Colors";
import { addMember, deleteMember } from "../data/locations/locationsController";
import { LoadingScreen } from "./LoadingScreen";
import { set } from "lodash";

const NotificationScreen = () => {
  const userInfo = useSelector((state) => {
    return state.user.userInfo;
  });
  const [notifications, setNotifications] = useState(null);

  const navigation = useNavigation();
  const pressHandler = (id) => {
    navigation.navigate("inPost", { post_id: id });
  };

  async function fetchNotifications() {
    try {
      await getMyNotifications(userInfo.uid, setNotifications);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (notifications == null) {
    return <LoadingScreen />
  }

  return (
    <View
      style={{
        ...styles.container,
        justifyContent: notifications.length === 0 ? "center" : "flex-start",
      }}
    >
      {notifications.length === 0 ? (
        <Text style={{ fontSize: 18, color: Colors.gray, alignSelf: "center" }}>
          ไม่มีการแจ้งเตือนในขณะนี้...
        </Text>
      ) : (
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <NotificationBox notiItem={item} onPress={pressHandler} />
          )}
          keyExtractor={(item) => item.notification_id}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Button
        title="Follow"
        onPress={() => {
          addMember("ZcJBG89ZDsVCeogMP0NX", "VF2A0jeb9Hff8n7NwhgoCR9nOqS2");
        }}
      />
      <Button
        title="unFollow"
        onPress={() => {
          deleteMember("OHPLF1Ztxn9JGWGfGvgw", "VF2A0jeb9Hff8n7NwhgoCR9nOqS2");
        }}
      />
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
