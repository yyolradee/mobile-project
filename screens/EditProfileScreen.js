import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { Entypo } from "@expo/vector-icons";
import { auth } from "../data/firebaseConfig";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import faculties from "../data/dummy-data/faculties.json";
import { useSelector } from "react-redux";
import { updateUserFaculty } from "../data/users/usersController";

const EditProfileScreen = ({route}) => {
  const navigation = useNavigation();

  const [faculty, setFaculty] = useState(null);
  const userInfo = useSelector((state) => state.user.userInfo);
  const isAdmin = userInfo.role == "admin" ? true : false;

  const saveFaculty = async () => {
    await updateUserFaculty(userInfo.uid, faculty)
    navigation.navigate("Profile", {faculty: faculty});
  }

  const {tempFaculty} = route.params ? route.params : {};

  useEffect(()=>{
    setFaculty(tempFaculty)
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            borderColor: Colors.gray3,
            borderBottomWidth: 1,
            marginHorizontal: 25,
            paddingVertical: 20,
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Image
            style={{ height: 120, width: 120, borderRadius: 100 }}
            source={
              userInfo
                ? { uri: userInfo.photoURL }
                : require("../assets/no-image.png")
            }
          />
          <View
            style={{
              backgroundColor: Colors.primary,
              position: "absolute",
              paddingHorizontal: 15,
              paddingVertical: 4,
              borderRadius: 25,
              top: 125,
              left: 25,
              display: isAdmin ? "flex" : "none",
            }}
          >
            <Text style={{ color: "#fff" }}>Admin</Text>
          </View>
          <TouchableOpacity
            style={styles.borderButton}
            onPress={() => {
              saveFaculty()
            }}
          >
            <Text>บันทึก</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>ชื่อ นามสกุล</Text>
          <Text style={styles.value}>{userInfo.displayName}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.value}>{userInfo.email}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>คณะ</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            items={faculties}
            value={faculty}
            onValueChange={(value) => {
              setFaculty(value);
            }}
            placeholder={{ label: "กรุณาเลือกคณะ", value: null }}
            Icon={() => {
              return (
                <View style={{ marginRight: 0 }}>
                  <Entypo name="chevron-down" size={24} color="black" />
                </View>
              );
            }}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          // borderColor: "red",
          // borderWidth: 1,
          alignSelf: "flex-end",
          marginHorizontal: 30,
          marginVertical: 20,
          paddingVertical: 8,
          paddingHorizontal: 20,
          borderRadius: 25,
          backgroundColor: Colors.red
        }}
        onPress={async () => {
          console.log("sign out");
          await AsyncStorage.removeItem("@user");
          await signOut(auth);
        }}
      >
        <Text style={{ fontSize: 16, color: "white" }}>ออกจากระบบ</Text>
      </TouchableOpacity>
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
  form: {
    flexDirection: "row",
    paddingHorizontal: 25,
    marginTop: 15,
  },
  label: {
    color: Colors.primary,
    fontSize: 18,
    width: 110,
  },
  value: {
    color: Colors.gray2,
    fontSize: 18,
    borderColor: Colors.gray3,
    borderBottomWidth: 1,
    paddingBottom: 15,
    width: 240,
  },
});

const pickerSelectStyles = StyleSheet.create({
  iconContainer: {
    // top: 3,
    right: 0,
  },
  inputIOS: {
    width: 240,
    fontSize: 18,
  },
  inputAndroid: {
    width: 240,
    fontSize: 18,
  },
});

export default EditProfileScreen;
