import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Drawer } from "@ant-design/react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import { Flex, Checkbox } from "@ant-design/react-native";

//import screen
import HomeNavigator from "./homeNavigator";
import FollowNavigator from "./followStackNavigator";
import CreatePostNavigator from "./createPostStackNavigator";
import NotificationNavigator from "./notificationNavigator";
import ProfileNavigator from "./profileStackNavigator";

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
  const isDrawerOpen = useSelector((state) => state.drawer.drawerState);
  const statusData = useSelector((state) => state.post.statusData);
  const locationData = useSelector((state) => state.post.locationData);
  const facultiesData = useSelector((state) => state.post.facultiesData);

  // Filter Open Status
  const initialOpenStatus = [false, false, false];
  const [openStatus, setOpenStatus] = useState(initialOpenStatus);

  const [listData, setListData] = useState([
    {
      index: 0,
      name: "สถานะ",
      contents: statusData,
      openStatus: openStatus[0],
    },
    {
      index: 1,
      name: "สถานที่",
      contents: locationData.map((item) => item.name),
      openStatus: openStatus[1],
    },
    {
      index: 2,
      name: "หมวดหมู่",
      contents: facultiesData.map((item) => item.label),
      openStatus: openStatus[2],
    },
  ]);

  const filterHander = (index) => {
    const newStatus = [...openStatus];
    newStatus[index] = !newStatus[index];
    setOpenStatus(newStatus);
  };

  const chevronRender = (state) => {
    let name = state ? "chevron-thin-down" : "chevron-thin-right";
    return <Entypo name={name} size={16} color="black" style={{ paddingRight: 1.5 }} />;
  };

  const renderFilterDataContent = (item, open) => {
    if (open) {
      return (
        <Flex direction="column" align="start" style={{ gap: 3 }}>
          {item.contents.map((content, index) => (
            <Flex key={index} style={{ width: "100%" }}>
              <Checkbox
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text style={{ color: Colors.gray2 }}>{content}</Text>
              </Checkbox>
            </Flex>
          ))}
        </Flex>
      );
    }
  };

  // Render Filter Data
  const renderFilterData = ({ item }) => (
    <View
      style={{
        flex: 1,
        justifyContent: "start",
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#C8C8C8",
      }}
    >
      <Flex direction="column" align="start" style={{ paddingBottom: 6 }}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            width: "100%",
          }}
          onPress={() => {
            filterHander(item.index);
          }}
        >
          <Text>{item.name}</Text>
          {chevronRender(openStatus[item.index])}
        </TouchableOpacity>
      </Flex>
      {renderFilterDataContent(item, openStatus[item.index])}
    </View>
  );

  // Render Filter Screen
  const FilterScreen = (
    <Flex direction="column" align="start" style={{ backgroundColor: "white", flex: 1 }}>
      <Flex style={{ padding: 16, backgroundColor: Colors.primary, width: "100%", gap: 5 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: 600 }}>การกรองข้อมูล</Text>
        <Ionicons name="filter" size={24} color="white" />
      </Flex>
      <FlatList
        data={listData}
        renderItem={renderFilterData}
        keyExtractor={(item) => item.index}
        style={{ width: "100%" }}
      />
    </Flex>
  );

  return (
    <Drawer
      position="left"
      sidebar={FilterScreen}
      open={isDrawerOpen}
      drawerRef={(el) => (this.drawer = el)}
      drawerBackgroundColor="#ccc"
    >
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
                    source={{
                      uri: "https://cdn.discordapp.com/attachments/962280584418304030/1154024339591663646/profile.PNG",
                    }}
                  />
                </View>
              );
            },
            headerShown: false,
          }}
        />
      </BottomTab.Navigator>
    </Drawer>
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
