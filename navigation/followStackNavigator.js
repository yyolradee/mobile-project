import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import screen
import { View, Text } from "react-native";
import Colors from "../constants/Colors";
import FollowScreen from "../screens/FollowScreen";
import FollowingAllScreen from "../screens/FollowingAllScreen";
import LocationScreen from "../screens/LocationScreen";

const FollowStack = createNativeStackNavigator();

const headerCustomTitle = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 18, fontWeight: 600 }}>การติดตาม</Text>
      <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: 600 }}>
        ทั้งหมด
      </Text>
    </View>
  );
};

export default function FollowNavigator() {
  return (
    <FollowStack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerTitleAlign: "left" }}
    >
      <FollowStack.Screen
        name="FollowMain"
        component={FollowScreen}
        options={{}}
      />
      <FollowStack.Screen
        name="FollowingAll"
        component={FollowingAllScreen}
        options={{
          headerTitle: headerCustomTitle,
          headerBackTitleVisible: false,
          headerTintColor: "#000",
        }}
      />
      <FollowStack.Screen name="Location" component={LocationScreen} />
    </FollowStack.Navigator>
  );
}
