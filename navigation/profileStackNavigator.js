import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import screen
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { View, Text } from "react-native";
import Colors from "../constants/Colors";

const ProfileStack = createNativeStackNavigator();

const headerCustomTitle = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 18, fontWeight: 600 }}>Yolradee's</Text>
      <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: 600 }}>
        {" "}
        โปรไฟล์
      </Text>
    </View>
  );
};

export default function ProfileNavigator() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerTitle: headerCustomTitle }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitleAlign: "left" }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerBackTitleVisible: false, headerTintColor: "#000" }}
      />
    </ProfileStack.Navigator>
  );
}
