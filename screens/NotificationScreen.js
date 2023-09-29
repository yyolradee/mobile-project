import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import NotificationBox from "../components/NotificationBox";
import NotiData from "../data/notificationData.json";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const pressHandler = (id) => {
    navigation.navigate("postInNoti", {post_id: id})
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={NotiData}
        renderItem={({ item }) => <NotificationBox notiItem={item} onPress={pressHandler} />}
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
