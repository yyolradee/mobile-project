import { Flex } from "@ant-design/react-native";
import React from "react";
import { View, Text, Image } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const SmallPost = ({ DATA }) => {
  return (
    <View style={{ borderBottomWidth: 1, borderColor: Colors.gray2, paddingHorizontal: 10, paddingVertical: 15 }}>
      <Flex>
        <Flex direction="column" align="start" style={ DATA.img_path && { width: "70%", paddingRight: 10 }}>
          <Flex style={{ gap: 3 }}>
            <Ionicons name="location-sharp" size={20} color={Colors.primary} />
            <Text style={{ fontSize: 12, color: Colors.gray }}>จาก</Text>
            <Text style={{ fontSize: 12 }}>{DATA.location.name}</Text>
          </Flex>
          <Text style={{ fontSize: 20, color: Colors.primary, fontWeight: "bold" }}>{DATA.title}</Text>
          <Text style={{ fontSize: 14, color: Colors.gray }} numberOfLines={2}>
            {DATA.description}
          </Text>
        </Flex>
        {DATA.img_path && (
          <View style={{ width: "30%" }}>
            <Image
              style={{ height: 100, width: "100%" }}
              source={DATA.img_path ? { uri: DATA.img_path } : require("../assets/no-image.png")}
            />
          </View>
        )}
      </Flex>
    </View>
  );
};

export default SmallPost;
