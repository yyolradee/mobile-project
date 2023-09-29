import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

const NotificationBox = (props) => {
  const notiItem = props.notiItem;
  let colorBadge;
  let iconBadge;
  const time_passed = moment(notiItem.date_time).fromNow();

  if (notiItem.type == "hot") {
    colorBadge = Colors.pink;
    iconBadge = <MaterialIcons name="local-fire-department" size={16} color="white" />;
  } else {
    if (notiItem.status == "wating") {
      colorBadge = Colors.warning;
      iconBadge = <Ionicons name="ios-timer-outline" size={16} color="white" />;
    } else if (notiItem.status == "inprocess") {
      colorBadge = Colors.success;
      iconBadge = <FontAwesome name="gear" size={16} color="white" />;
    } else if (notiItem.status == "done") {
      colorBadge = Colors.gray2;
      iconBadge = <FontAwesome5 name="check" size={14} color="white" />;
    }
  }

  return (
    <TouchableOpacity onPress={() => {props.onPress(notiItem.post_id)}}>
      <View style={styles.container}>
        <View>
          <Image
            style={{ height: 65, width: 65, borderRadius: 50 }}
            source={
              notiItem.img_path
                ? { uri: notiItem.img_path }
                : require("../assets/no-image.png")
            }
          />
          <View style={{ ...styles.iconBadge, backgroundColor: colorBadge }}>
            {iconBadge}
          </View>
        </View>
        <View style={{ marginTop: 4, marginLeft: 25, width: "65%" }}>
          <Text style={{ fontSize: 15 }} numberOfLines={2} flexWrap="wrap">
            ปัญหา{" "}
            <Text style={{ fontWeight: "bold" }}>{notiItem.post_name}</Text>
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
