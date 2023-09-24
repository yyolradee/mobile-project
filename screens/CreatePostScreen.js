import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import CreatePostHeader from "../components/CreatePostHeader";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

const CreatePostScreen = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isImagePickerActive, setIsImagePickerActive] = useState(true);

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
      <View style={{ paddingHorizontal: 30, flex: 1 }}>
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          borderColor: "#000",
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 15,
          paddingHorizontal: 30,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginBottom: Platform.OS === "ios" ? 25 : 15 }}
          disabled={!isImagePickerActive}
        >
          <MaterialIcons
            name="image"
            size={30}
            color={isImagePickerActive ? Colors.primary : Colors.gray2}
          />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 15,
              color: isImagePickerActive ? Colors.black : Colors.gray2,
            }}
          >
            เพิ่มรูปภาพ หรือวิดีโอ (สูงสุด 1 รูป)
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
