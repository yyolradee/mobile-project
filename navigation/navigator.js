import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import Colors from "../constants/color";

//import screen
import HomeScreen from "../screens/HomeScreen";
import FollowScreen from "../screens/FollowScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";

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

const PictureButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>{children}</View>
    </TouchableOpacity>
  );
};

export default function Navigator() {
  return (
    <NavigationContainer>
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
          component={HomeScreen}
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
          }}
        />
        <BottomTab.Screen
          name="FollowScreen"
          component={FollowScreen}
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
          }}
        />
        <BottomTab.Screen
          name="CreatePostScreen"
          component={CreatePostScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo name="plus" size={35} color="white" />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <BottomTab.Screen
          name="NotificationScreen"
          component={NotificationScreen}
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
                  <Text style={{ color: color, fontSize: 10 }}>
                    การแจ้งเตือน
                  </Text>
                </View>
              );
            },
          }}
        />
        <BottomTab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={focused? styles.shadow: {}}> 
                  <Image
                    style={{
                      height: 35,
                      width: 35,
                      borderRadius: 35,
                    }}
                    source={{
                      uri: "https://cdn.discordapp.com/attachments/962280584418304030/1154024339591663646/profile.PNG",
                    }}
                  />
                </View>
              );
            },
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    overflow: 'visible',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5,
    borderRadius: 35
  },
});
