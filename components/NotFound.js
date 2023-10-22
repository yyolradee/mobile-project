import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const NotFound = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 6 }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>404</Text>
      <Text style={{ fontSize: 30, fontWeight: "bold"}}>ไม่เจอสิ่งใดที่นี่...</Text>
      <Text style={{ color: Colors.gray}}>...หน้าที่คุณต้องการอาจถูกลบไปแล้ว หรือไม่เคยมีอยู่</Text>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary,
          paddingHorizontal: 16,
          paddingVertical: 6,
          borderRadius: 20,
          marginTop: 12,
        }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Text style={{ color: "white", fontSize: 16 }}>กลับสู่หน้าหลัก</Text>
          <FontAwesome name="long-arrow-right" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NotFound;
