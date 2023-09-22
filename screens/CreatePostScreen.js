import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";

import CreatePostHeader from "../components/CreatePostHeader";
import { useNavigation } from "@react-navigation/native";

const CreatePostScreen = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const clearState = () => {
    setTitle("");
    setDescription("");
  };

  const leftButtonHandler = () => {
    if (title == "" && description == "") {
      navigation.navigate("HomeScreen");
    } else {
      Alert.alert(
        "ต้องการบันทึกแบบร่างหรือไม่",
        "หากคุณละทิ้ง ค่าทุกอย่างของโพสต์จะหายไป",
        [
          {
            text: "บันทึกแบบร่าง",
            onPress: () => {
              navigation.navigate("HomeScreen");
            },
          },
          {
            text: "ละทิ้งโพสต์",
            onPress: () => {
              clearState();
              navigation.navigate("HomeScreen");
            },
            style: "destructive",
          },
          {
            text: "เขียนโพสต์ต่อ",
            onPress: () => {},
            style: "cancle",
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <CreatePostHeader
        leftButton="ยกเลิก"
        rightButton="ถัดไป"
        isActive={true}
        leftOnPress={leftButtonHandler}
        rightOnPress={() => {
          navigation.navigate("detail");
        }}
      />
      <View style={{ paddingHorizontal: 30 }}>
        <TextInput
          style={{ fontSize: 30 }}
          placeholder="หัวข้อ..."
          autoCorrect={false}
          maxLength={100}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
        <TextInput
          style={{ fontSize: 15, paddingVertical: 4 }}
          placeholder="อธิบายเนื้อหาของปัญหา..."
          autoCorrect={false}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default CreatePostScreen;
