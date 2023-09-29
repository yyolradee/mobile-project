import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import Colors from "../constants/Colors";

//import screen
import NotificationScreen from "../screens/NotificationScreen";
import PostScreen from "../screens/PostScreen";

const NotiStackNavigator = createNativeStackNavigator();

const headerCustomTitle = () => {
  return (
    <Text style={{ fontSize: 18, fontWeight: 600 }}>
      การ
      <Text style={{ color: Colors.primary }}>แจ้งเตือน</Text>
    </Text>
  );
};

export default function NotificationNavigator() {
  return (
    <NotiStackNavigator.Navigator
      initialRouteName="noti"
      screenOptions={{ headerTitle: headerCustomTitle }}
    >
      <NotiStackNavigator.Screen name="noti" component={NotificationScreen} />
      <NotiStackNavigator.Screen name="postInNoti" component={PostScreen} />
    </NotiStackNavigator.Navigator>
  );
}
