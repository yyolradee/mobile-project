import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import Colors from "../../../constants/Colors";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const ReportedBox = (props) => {
  const navigation = useNavigation();
  const data = props.reportedPost;
  const time = moment(data.date_time.toDate()).format("D MMM YYYY HH:mm");

  const confirmDelete = () => {
    Alert.alert(
      "คุณยืนยันที่จะลบโพสต์นี้หรือไม่",
      "การลบโพสต์จะไม่สามารถกู้คืนได้ในภายหลัง",
      [
        {
          text: "ยกเลิก",
          onPress: () => {
            console.log("Cancel Pressed");
          },
          style: "cancel",
        },
        {
          text: "ยืนยัน",
          onPress: () => {
            props.fetchPost();
          },
        },
      ]
    );
  };

  return (
    <View
      style={{
        borderColor: Colors.gray2,
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 25,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ height: 65, width: 65, borderRadius: 40 }}
          source={
            data.post.img_path
              ? { uri: data.post.img_path }
              : require("../../../assets/no-image.png")
          }
        />
        <View style={{ marginLeft: 20, width: "75%" }}>
          <Text style={{ fontSize: 15 }} numberOfLines={2}>
            ปัญหา
            <Text style={{ fontWeight: "bold" }}>
              {" " + data.post.title + " "}
            </Text>
            ถูกรายงานโดยผู้ใช้
            <Text style={{ fontWeight: "bold" }}>
              {" " + data.reporter_name}
            </Text>
          </Text>
          <Text style={{ fontSize: 11, color: Colors.gray, marginTop: 5 }}>
            {time}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 8,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.warning,
            borderRadius: 36,
            paddingVertical: 3,
            paddingHorizontal: 18,
            marginRight: 10,
          }}
          onPress={() => {
            navigation.navigate("detailReportedPost", {
              post_id: data.post_id,
              report_id: data.report_id,
              fetchPost: props.fetchPost,
            });
          }}
        >
          <Text style={{ color: "#fff" }}>ตรวจสอบ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.red,
            borderRadius: 36,
            paddingVertical: 3,
            paddingHorizontal: 22,
          }}
          onPress={() => {
            confirmDelete();
          }}
        >
          <Text style={{ color: "#fff" }}>ลบโพสต์</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportedBox;
