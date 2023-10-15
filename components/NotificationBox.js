import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  Octicons
} from "@expo/vector-icons";
import moment from "moment";
import { getPostsById } from "../data/posts/postsController";

const NotificationBox = (props) => {
  const notiItem = props.notiItem;
  let colorBadge = Colors.primary;
  let iconBadge = <FontAwesome5 name="question" size={14} color="white" />;
  const time_passed = moment(notiItem.date_time.toDate()).fromNow();
  const postData = notiItem.post;

  // useEffect(() => {
  //   getPostsById(notiItem.post_id, setPostData)
  // }, []);

  if (notiItem.type == "trending") {
    colorBadge = Colors.pink;
    iconBadge = (
      <MaterialIcons name="local-fire-department" size={16} color="white" />
    );
  } else if (notiItem.type == "update status") {
    if (notiItem.status == "รอรับเรื่อง") {
      colorBadge = Colors.warning;
      iconBadge = <Ionicons name="ios-timer-outline" size={16} color="white" />;
    } else if (notiItem.status == "กำลังดำเนินการ") {
      colorBadge = Colors.success;
      iconBadge = <FontAwesome name="gear" size={16} color="white" />;
    } else if (notiItem.status == "แก้ไขเสร็จสิ้น") {
      colorBadge = Colors.gray2;
      iconBadge = <FontAwesome5 name="check" size={14} color="white" />;
    } else if (notiItem.status == "ไม่แก้ไข") {
      colorBadge = Colors.red;
      iconBadge = <Octicons name="x" size={20} color="white" />;
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress(notiItem.post_id);
      }}
    >
      <View style={styles.container}>
        <View>
          <Image
            style={{ height: 65, width: 65, borderRadius: 50 }}
            source={
              postData.img_path
                ? { uri: postData.img_path }
                : require("../assets/no-image.png")
            }
          />
          <View style={{ ...styles.iconBadge, backgroundColor: colorBadge }}>
            {iconBadge}
          </View>
        </View>
        <View style={{ marginTop: 4, marginLeft: 20, width: "65%" }}>
          <Text style={{ fontSize: 15 }} numberOfLines={2} flexWrap="wrap">
            ปัญหา{" "}
            <Text style={{ fontWeight: "bold" }}>{postData.title}</Text>
            {" " + notiItem.description}
          </Text>
          <Text style={{ fontSize: 10, color: Colors.gray, marginTop: 3 }}>
            {time_passed}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    // backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingLeft: 25,
    borderColor: Colors.gray2,
    borderBottomWidth: 1,
  },
  iconBadge: {
    position: "absolute",
    height: 25,
    width: 25,
    borderRadius: 15,
    top: 40,
    left: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NotificationBox;
