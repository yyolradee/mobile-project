import React from "react";
import { Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import Colors from "../constants/Colors";

export const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Feather name="loader" size={24} color={Colors.gray} />
      <Text style={{ fontSize: 20, color: Colors.gray }}>Loading...</Text>
      <Text style={{ fontSize: 20, color: Colors.gray }}>Please wait</Text>
    </View>
  );
};
