import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import CreatePostHeader from "../components/CreatePostHeader";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

import { getPostsById } from "../data/posts/postsController";


const CreatePostScreen = ({ route }) => {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const [categories, setCategories] = useState(null);
  const [location, setLocation] = useState(null);
  const [validate, setValidate] = useState(false);
  const [isImagePickerActive, setIsImagePickerActive] = useState("เพิ่มรูปภาพ หรือวิดีโอ (สูงสุด 1 รูป)");
  const [postData, setPostData] = useState(null);

  const [check, setCheck] = useState(true);

  const { postId } = route.params ? route.params : {};

  const clearState = () => {
    route.params = { postId: undefined };
    setTitle("");
    setDescription("");
    setImage(null);
    setPostData(null);
    setCheck(true);
    setCategories(null);
    setLocation(null);
    setOldImage(null);
    console.log("Clear state");
  };

  const leftButtonHandler = () => {
    if (title == "" && (description == "") & (image == null)) {
      navigation.navigate("HomeScreen");
    } else {
      Alert.alert("ต้องการบันทึกแบบร่างหรือไม่", "หากคุณละทิ้ง ค่าทุกอย่างของโพสต์จะหายไป", [
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
      ]);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const nextHandler = () => {
    navigation.navigate("detail", {
      post_id: postId,
      title: title,
      description: description,
      img_path: image,
      old_img_path: oldImage,
      categoriesData: categories,
      locationData: location,
      clearState,
    });
  };

  useEffect(() => {
    if (image == null) {
      setIsImagePickerActive("เพิ่มรูปภาพ หรือวิดีโอ (สูงสุด 1 รูป)");
    } else {
      setIsImagePickerActive("เลือกรูปภาพ หรือวิดีโอใหม่");
    }
  }, [image]);

  useEffect(() => {
    if ((!title == null || !title == "") && (!description == null || !description == "")) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  }, [title, description]);

  useEffect(() => {
    if (postId && !postData && check) {
      getPostsById(postId, setPostData);
      setCheck(false);
      console.log("get post by id");
    }
  });

  useEffect(() => {
    if (postData) {
      setTitle(postData.title);
      setDescription(postData.description);
      setImage(postData.img_path);
      setOldImage(postData.img_path);
      setLocation(postData.location);
      setCategories(postData.categories);
    }
  }, [postData]);

  return (
    <View style={styles.container}>
      <CreatePostHeader
        leftButton="ยกเลิก"
        rightButton="ถัดไป"
        isActive={validate}
        leftOnPress={leftButtonHandler}
        rightOnPress={() => {
          nextHandler();
        }}
      />
      <View style={{ flex: 1 }}>
        <TextInput
          style={{ fontSize: 30, paddingHorizontal: 30 }}
          placeholder="หัวข้อ..."
          autoCorrect={false}
          maxLength={100}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
        <TextInput
          style={{ fontSize: 15, paddingVertical: 14, paddingHorizontal: 30 }}
          placeholder="อธิบายเนื้อหาของปัญหา..."
          multiline={true}
          autoCorrect={false}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        {image && <Image style={{ width: "100%", height: 300 }} source={{ uri: image }} />}
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
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: Platform.OS === "ios" ? 25 : 15,
          }}
          // disabled={!isImagePickerActive}
          onPress={pickImage}
        >
          <MaterialIcons
            name="image"
            size={30}
            // color={isImagePickerActive ? Colors.primary : Colors.gray2}
            color={Colors.primary}
          />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 15,
              // color: isImagePickerActive ? Colors.black : Colors.gray2,
            }}
          >
            {isImagePickerActive}
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
