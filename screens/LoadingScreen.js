import React from "react";
import { Text, View } from "react-native";

export const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Please wait...</Text>
    </View>
  );
};
