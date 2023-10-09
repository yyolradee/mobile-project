import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import screen
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { View, Text } from "react-native";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";

const ProfileStack = createNativeStackNavigator();

export default function ProfileNavigator() {
  const userInfo = useSelector((state) => {
    return state.user.userInfo;
  });
  const headerCustomTitle = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 18, fontWeight: 600 }}>{userInfo.displayName.split(" ")[0]}'s</Text>
        <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: 600 }}> โปรไฟล์</Text>
      </View>
    );
  };
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerTitle: headerCustomTitle,
        // headerLeft: () => {
        //   return headerCustomTitle();
        // },
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ headerTitleAlign: "left" }} />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerBackTitleVisible: false, headerTintColor: "#000" }}
      />
    </ProfileStack.Navigator>
  );
}
