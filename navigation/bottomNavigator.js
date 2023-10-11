import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";

//import screen
import HomeNavigator from "./homeNavigator";
import FollowNavigator from "./followStackNavigator";
import CreatePostNavigator from "./createPostStackNavigator";
import NotificationNavigator from "./notificationNavigator";
import ProfileNavigator from "./profileStackNavigator";
import SearchModal from "../components/SearchModal";

const BottomTab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.shadow,
        top: -20,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 35,
          backgroundColor: Colors.primary,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default function BottomNavigator() {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
      <BottomTab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: Colors.gray2,
        }}
      >
        <BottomTab.Screen
          name="HomeScreen"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ focused, color }) => {
              var name = "";
              if (focused) {
                name = "home";
                color = "black";
              } else {
                name = "home-outline";
                color = Colors.gray2;
              }
              return (
                <View style={{ alignItems: "center" }}>
                  <Ionicons name={name} size={24} color={color} />
                  <Text style={{ color: color, fontSize: 10 }}>หน้าแรก</Text>
                </View>
              );
            },
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="FollowScreen"
          component={FollowNavigator}
          options={{
            tabBarIcon: ({ focused, color }) => {
              var name = "";
              if (focused) {
                name = "heart";
                color = "black";
              } else {
                name = "heart-outline";
                color = Colors.gray2;
              }
              return (
                <View style={{ alignItems: "center" }}>
                  <Ionicons name={name} size={24} color={color} />
                  <Text style={{ color: color, fontSize: 10 }}>การติดตาม</Text>
                </View>
              );
            },
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="CreatePostScreen"
          component={CreatePostNavigator}
          options={{
            tabBarIcon: ({ focused }) => <Entypo name="plus" size={35} color="white" />,
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
            tabBarStyle: { display: "none" },
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="NotificationScreen"
          component={NotificationNavigator}
          options={{
            tabBarIcon: ({ focused, color }) => {
              var name = "";
              if (focused) {
                name = "bell-fill";
                color = "black";
              } else {
                name = "bell";
                color = Colors.gray2;
              }
              return (
                <View style={{ alignItems: "center" }}>
                  <Octicons name={name} size={24} color={color} />
                  <Text style={{ color: color, fontSize: 10 }}>การแจ้งเตือน</Text>
                </View>
              );
            },
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="ProfileScreen"
          component={ProfileNavigator}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={focused ? styles.shadow : {}}>
                  <Image
                    style={{
                      height: 35,
                      width: 35,
                      borderRadius: 35,
                    }}
                    source={userInfo ? { uri: userInfo.photoURL } : require("../assets/no-image.png")}
                  />
                </View>
              );
            },
            headerShown: false,
          }}
        />
      </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "#fff",
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5,
    borderRadius: 35,
  },
});
