import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Button } from "@ant-design/react-native";

const ReportedScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ปัญหาที่ถูกรายงาน</Text>
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

export default ReportedScreen;
