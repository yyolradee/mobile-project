import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Post = () => {
  return (
    <View style={styles.container}>
      <Text>This is Post Box</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: Colors.gray2,
    borderBottomWidth: 1,
    height: 300,
    width: "100%"
  },
});

export default Post;
