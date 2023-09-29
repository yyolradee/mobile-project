import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import NotificationBox from "../components/NotificationBox";
import NotiData from "../data/notificationData.json";

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={NotiData}
        renderItem={({ item }) => <NotificationBox notiItem={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
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
