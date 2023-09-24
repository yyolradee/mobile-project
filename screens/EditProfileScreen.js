import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome5, Entypo } from "@expo/vector-icons";

import facultys from "../data/facultys.json";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [faculty, setFaculty] = useState("it");

  return (
    <View style={styles.container}>
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
          source={{
            uri: "https://cdn.discordapp.com/attachments/962280584418304030/1154024339591663646/profile.PNG",
          }}
        />
        <View
          style={{
            backgroundColor: Colors.primary,
            position: "absolute",
            paddingHorizontal: 15,
            paddingVertical: 3,
            borderRadius: 25,
            top: 125,
            left: 25,
          }}
        >
          <Text style={{ color: "#fff" }}>Admin</Text>
        </View>
        <TouchableOpacity
          style={styles.borderButton}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text>บันทึก</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>ชื่อ นามสกุล</Text>
        <Text style={styles.value}>Yolradee Prayoonpunratn</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>64070089@kmitl.ac.th</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>คณะ</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          items={facultys}
          onValueChange={(value) => {
            setFaculty(value);
          }}
          value={faculty}
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
    width: 110
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
