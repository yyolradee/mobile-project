import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, Button } from "react-native";
import { useSelector } from "react-redux";

const DashboardScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <Button title="จัดการปัญหา" onPress={() => {navigation.navigate("ManageProblem")}} />
        <Button title="จัดการโพสต์ที่ถูกรายงาน" onPress={() => {navigation.navigate("ManageReport")}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default DashboardScreen;
