import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import Post from "../components/Post";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.user.userInfo);
  const isAdmin = userInfo.role == "admin" ? true : false;
  const postDATA = useSelector((state) => state.data.postDetailData);
  const filtersPostData = postDATA.filter((post) => post.owner.owner_id === userInfo.uid);
  const [ownerPostData, setOwnerPostData] = useState(filtersPostData);
  const [tempFaculty, setTempFaculty] = useState(null);

  const { faculty } = route.params ? route.params : {};
  // useSelector((state) => {
  //   console.log(JSON.stringify(state.user.userInfo, null, 2));
  // });

  useEffect(() => {
    if (faculty) {
      setTempFaculty(faculty)
    }
    else {
      setTempFaculty(userInfo.faculty)
    }
  }, []);

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
              navigation.navigate("EditProfile", { tempFaculty: tempFaculty });
            }}
          >
            <Text>จัดการโปรไฟล์</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>{userInfo.displayName}</Text>
          <View
            style={{
              backgroundColor: Colors.primary,
              paddingHorizontal: 15,
              paddingVertical: 3,
              justifyContent: "center",
              borderRadius: 20,
              marginLeft: 10,
              marginTop: 3,
              display: isAdmin ? "flex" : "none",
            }}
          >
            <Text style={{ fontSize: 14, color: "#fff" }}>Admin</Text>
          </View>
        </View>
        <Text style={{ color: Colors.gray, fontSize: 13, marginBottom: 5 }}>{userInfo.email}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="map-marker-alt" size={15} color={Colors.gray} />
          <Text style={{ fontSize: 15, marginLeft: 5 }}>คณะ</Text>
          <Text style={{ fontSize: 15 }}> {!faculty ? tempFaculty : faculty}</Text>
        </View>
      </View>
      <FlatList
        data={ownerPostData}
        renderItem={({ item }) => <Post postData={item} />}
        keyExtractor={(item) => item.post_id}
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
