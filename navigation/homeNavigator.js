import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Drawer } from "@ant-design/react-native";
import headerCustomTitle from "../constants/headerCustomtitle";

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
    return (
      <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: headerCustomTitle,
            headerLeft: ({ color, size, focused }) => {
              color = "black";
              size = 24;
              return (
                <TouchableOpacity
                  onPress={() => {
                    return this.drawer && this.drawer.openDrawer();
                  }}
                >
                  <Feather name="menu" size={size} color={color} />
                </TouchableOpacity>
              );
            },
          }}
        />
      </HomeStack.Navigator>
  );
};

export default HomeNavigator;
