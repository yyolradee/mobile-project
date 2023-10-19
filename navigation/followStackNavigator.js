import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import headerCustomTitle from "../constants/headerCustomtitle";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
//import screen
import Colors from "../constants/Colors";
import FollowScreen from "../screens/FollowScreen";
import FollowingAllScreen from "../screens/FollowingAllScreen";
import LocationScreen from "../screens/LocationScreen";
import { Flex } from "@ant-design/react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearch } from "../store/actions/searchAction";
import PostScreen from "../screens/PostScreen";

const FollowStack = createNativeStackNavigator();

const headerCustomTitle2 = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 18, fontWeight: 600 }}>การติดตาม</Text>
      <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: 600 }}>ทั้งหมด</Text>
    </View>
  );
};

export default function FollowNavigator() {
  const dispatch = useDispatch();
  const searchIsVisible = useSelector((state) => state.search.searchIsVisible);

  const toggleSearchModal = () => {
    return dispatch(toggleSearch(!searchIsVisible));
  };

  return (
    <FollowStack.Navigator initialRouteName="FollowMain" screenOptions={{ headerTitleAlign: "left" }}>
      <FollowStack.Screen
        name="FollowMain"
        component={FollowScreen}
        options={{
          headerTitle: "",
          headerLeft: ({ color, size, focused }) => {
            color = "black";
            size = 24;
            return (
              <Flex align="center" style={{ gap: 16 }}>
                <TouchableOpacity
                  onPress={() => {
                    return this.drawer && this.drawer.openDrawer();
                  }}
                >
                  <Feather name="menu" size={size} color={color} />
                </TouchableOpacity>
                {headerCustomTitle()}
              </Flex>
            );
          },
          headerRight: ({ color, size, focused }) => {
            color = Colors.gray2;
            size = 24;
            return (
              <TouchableOpacity onPress={toggleSearchModal}>
                <Ionicons name="search" size={size} color={color} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <FollowStack.Screen
        name="FollowingAll"
        component={FollowingAllScreen}
        options={{
          headerTitle: headerCustomTitle2,
          headerBackTitleVisible: false,
          headerTintColor: "#000",
          headerRight: ({ color, size, focused }) => {
            color = Colors.gray2;
            size = 24;
            return (
              <TouchableOpacity onPress={toggleSearchModal}>
                <Ionicons name="search" size={size} color={color} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <FollowStack.Screen
        name="Location"
        component={LocationScreen}
        options={{
          headerTitle: "",
          headerTintColor: "#000",
          headerBackTitleVisible: false,
          headerRight: ({ color, size, focused }) => {
            color = "black";
            size = 24;
            return (
              <Flex style={{ gap: 10 }}>
                <TouchableOpacity onPress={toggleSearchModal}>
                  <Ionicons name="search" size={size} color={Colors.gray2} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    return this.drawer && this.drawer.openDrawer();
                  }}
                >
                  <Feather name="menu" size={size} color={color} />
                </TouchableOpacity>
              </Flex>
            );
          },
        }}
      />
      <FollowStack.Screen name="inPost" component={PostScreen} options={{headerTitle: headerCustomTitle}}/>
    </FollowStack.Navigator>
  );
}
