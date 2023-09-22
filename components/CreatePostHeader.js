import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";

const CreatePostHeader = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={props.leftOnPress}>
        <Text style={{ color: Colors.gray2 }}>{props.leftButton}</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ ...styles.headerText, color: Colors.primary }}>
          KMITL{" "}
        </Text>
        <Text style={styles.headerText}>Trouble</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: props.isActive ? Colors.primary : Colors.gray2,
          paddingHorizontal: 20,
          paddingVertical: 5,
          borderRadius: 25,
        }}
        onPress={props.rightOnPress}
        disabled={!props.isActive}
      >
        <Text style={{ color: "#fff" }}>{props.rightButton}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    width: "100%",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default CreatePostHeader;
