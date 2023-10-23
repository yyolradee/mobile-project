import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native";
import Colors from "../constants/Colors";

//import screen
import DashboardScreen from "../screens/admin/DashboardScreen";
import ReportedScreen from "../screens/admin/reportedPost/ReportedScreen";
import ReportedPostScreen from "../screens/admin/reportedPost/ReportedPostScreen";
import WaitingScreen from "../screens/admin/manageProblem/WaitingScreen";
import DoingScreen from "../screens/admin/manageProblem/DoingScreen";
import DoneScreen from "../screens/admin/manageProblem/DoneScreen";
import ManageProblemPostScreen from "../screens/admin/manageProblem/ManageProblemPostScreen";

const AdminStackNavigator = createNativeStackNavigator();
const ManageProblemNavigator = createMaterialTopTabNavigator();

const headerCustomTitle = () => {
  return (
    <Text style={{ fontSize: 18, fontWeight: 600 }}>
      จัดการ
      <Text style={{ color: Colors.primary }}>ปัญหา</Text>
    </Text>
  );
};

const headerCustomTitle2 = () => {
  return (
    <Text style={{ fontSize: 18, fontWeight: 600 }}>
      โพสต์ที่ถูก
      <Text style={{ color: Colors.primary }}>รายงาน</Text>
    </Text>
  );
};

function TopTabNavigator() {
  return (
    <ManageProblemNavigator.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#fff", height: "100%", borderColor: Colors.primary, borderBottomWidth: 2 },
        tabBarStyle: {backgroundColor: Colors.gray4}
      }}
    >
      <ManageProblemNavigator.Screen
        name="waiting"
        component={WaitingScreen}
        options={{ tabBarLabel: "รอรับเรื่อง"}}
      />
      <ManageProblemNavigator.Screen
        name="doing"
        component={DoingScreen}
        options={{ tabBarLabel: "กำลังดำเนินการ" }}
      />
      <ManageProblemNavigator.Screen
        name="Done"
        component={DoneScreen}
        options={{ tabBarLabel: "แก้ไขเสร็จสิ้น" }}
      />
    </ManageProblemNavigator.Navigator>
  );
}

export default function AdminNavigator() {
  return (
    <AdminStackNavigator.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerTitle: headerCustomTitle,
        headerBackTitleVisible: false,
        headerTintColor: "#000",
      }}
    >
      <AdminStackNavigator.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <AdminStackNavigator.Screen
        name="ManageProblem"
        component={TopTabNavigator}
        options={{
          headerTitle: headerCustomTitle,
          headerShadowVisible: false
        }}
      />
      <AdminStackNavigator.Screen
        name="detailManagePost"
        component={ManageProblemPostScreen}
        options={{
          headerTitle: headerCustomTitle,
        }}
      />
      <AdminStackNavigator.Screen
        name="ManageReport"
        component={ReportedScreen}
        options={{
          headerTitle: headerCustomTitle2,
        }}
      />
      <AdminStackNavigator.Screen
        name="detailReportedPost"
        component={ReportedPostScreen}
        options={{
          headerTitle: headerCustomTitle2,
        }}
      />
    </AdminStackNavigator.Navigator>
  );
}
