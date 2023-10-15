import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import Post from "../components/Post";
import { useNavigation } from "@react-navigation/native";
import postDATA from "../data/postDetail.json";
import { Button, Flex } from "@ant-design/react-native";
import { auth } from "../data/firebaseConfig";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const userInfo = useSelector((state) => {
    return state.user.userInfo;
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: 25,
          paddingVertical: 20,
          borderColor: "#000",
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 10,
          }}
        >
          <Image
            style={{ height: 120, width: 120, borderRadius: 100 }}
            source={userInfo ? { uri: userInfo.photoURL } : require("../assets/no-image.png")}
          />
          <TouchableOpacity
            style={styles.borderButton}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <Text>จัดการโปรไฟล์</Text>
          </TouchableOpacity>
        </View>
        <Flex justify="between">
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>{userInfo.displayName}</Text>
          {/* ขก design อ้ะ อยากแก้ แก้ได้เลย */}
          <Button
            size="small"
            style={{
              borderColor: "red",
            }}
            onPress={async () => {
              console.log("sign out");
              await AsyncStorage.removeItem("@user");
              await signOut(auth);
            }}
          >
            <Text style={{ fontSize: 12, color: "red", fontWeight: 600 }}>ออกจากระบบ</Text>
          </Button>
        </Flex>
        <Text style={{ color: Colors.gray, fontSize: 13, marginBottom: 5 }}>{userInfo.email}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="map-marker-alt" size={15} color={Colors.gray} />
          <Text style={{ fontSize: 15, marginLeft: 5 }}>คณะ</Text>
          <Text style={{ fontSize: 15 }}> เทคโนโลยีสารสนเทศ</Text>
        </View>
      </View>
      <FlatList
        data={postDATA}
        renderItem={({ item }) => <Post postData={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  borderButton: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
});

export default ProfileScreen;
