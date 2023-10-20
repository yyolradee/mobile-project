import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import Colors from "../constants/Colors";
import DashboardScreen from "../screens/admin/DashboardScreen";
import ManageProblemScreen from "../screens/admin/ManageProblemScreen";
import ReportedScreen from "../screens/admin/ReportedScreen";

//import screen

const AdminStackNavigator = createNativeStackNavigator();

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
        component={ManageProblemScreen}
        options={{
          headerTitle: headerCustomTitle,
          headerBackTitleVisible: false,
          headerTintColor: "#000",
        }}
      />
      <AdminStackNavigator.Screen
        name="ManageReport"
        component={ReportedScreen}
        options={{
          headerTitle: headerCustomTitle2,
          headerBackTitleVisible: false,
          headerTintColor: "#000",
        }}
      />
    </AdminStackNavigator.Navigator>
  );
}
