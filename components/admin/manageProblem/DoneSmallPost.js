import { Flex } from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import Colors from "../../../constants/Colors";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const DoneSmallPost = ({ DATA }) => {
  const [statusColor, setStatusColor] = useState("red");

  useEffect(() => {
    if (DATA.status == "แก้ไขเสร็จสิ้น") {
      setStatusColor(Colors.gray2);
    } else {
      setStatusColor("red");
    }
  });
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: Colors.gray2,
        paddingHorizontal: 15,
        paddingVertical: 15,
      }}
    >
      <Flex>
        <Flex
          direction="column"
          align="start"
          style={DATA.img_path && { width: "70%", paddingRight: 10 }}
        >
          <Flex style={{ gap: 3 }}>
            <Ionicons name="location-sharp" size={20} color={Colors.primary} />
            <Text style={{ fontSize: 13.5, color: Colors.gray }}>จาก</Text>
            <Text
              style={[
                { fontSize: 13.5 },
                DATA.location.name.length > 30 && { maxWidth: "80%" },
              ]}
              numberOfLines={1}
            >
              {DATA.location.name}
            </Text>
          </Flex>
          <Text
            style={{
              fontSize: 20,
              color: Colors.primary,
              fontWeight: "bold",
              marginTop: 5,
            }}
            numberOfLines={1}
          >
            {DATA.title}
          </Text>
          <Text
            style={{ fontSize: 15, color: Colors.gray, marginTop: 5 }}
            numberOfLines={2}
          >
            {DATA.description}
          </Text>
          <Text style={{color: Colors.gray, marginTop: 10}}>
            <AntDesign name="infocirlceo" size={16} color={Colors.gray} />
            {" สถานะ : "}
            <Text style={{color: statusColor}}>{" " + DATA.status}</Text>
          </Text>
        </Flex>
        {DATA.img_path && (
          <View style={{ width: "30%" }}>
            <Image
              style={{ height: 100, width: "100%" }}
              source={
                DATA.img_path
                  ? { uri: DATA.img_path }
                  : require("../../../assets/no-image.png")
              }
            />
          </View>
        )}
      </Flex>
    </View>
  );
};

export default DoneSmallPost;
