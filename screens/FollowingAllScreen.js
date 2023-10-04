import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Post from "../components/Post";
import postDATA from "../data/postDetail.json";
import placeData from "../data/location.json";
import Colors from "../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PlaceFollow = (props) => {
  const item = props.item;
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", width: "75%" }}
        onPress={() => {props.onPressHandler(props.item)}}
      >
        <Image
          style={{
            backgroundColor: Colors.gray2,
            width: 40,
            height: 40,
            borderRadius: 30,
          }}
          source={
            item.logo ? { uri: item.logo } : require("../assets/no-image.png")
          }
        />
        <Text
          style={{ fontSize: 14, marginLeft: 14, width: "80%" }}
          numberOfLines={1}
          flexWrap="wrap"
        >
          {item.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderColor: Colors.primary,
          borderWidth: 1,
          borderRadius: 20,
          paddingVertical: 4,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ color: Colors.primary, fontSize: 12 }}>ติดตามแล้ว</Text>
      </TouchableOpacity>
    </View>
  );
};

const FollowingAllScreen = () => {
  const navigation = useNavigation();
  const [sort, setSort] = useState("เรียงจากตัวอักษร");
  const [show, setShow] = useState(false);

  placeData.sort((item1, item2) =>
    item1.name > item2.name ? 1 : item1.name < item2.name ? -1 : 0
  );

  useEffect(() => {
    if (sort == "เรียงจากตัวอักษร") {
      placeData.sort((item1, item2) =>
        item1.name > item2.name ? 1 : item1.name < item2.name ? -1 : 0
      );
    } else {
    }
  }, [sort]);

  const locationInfoHandler = (item) => {
    navigation.navigate("Location", {location: item})
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 15,
          paddingHorizontal: 20,
        }}
        onPress={() => {
          setShow(!show);
        }}
      >
        <Text style={{ marginRight: 5 }}>{sort}</Text>
        <Entypo name="chevron-down" size={18} color="black" />
      </TouchableOpacity>
      <FlatList
        data={placeData}
        renderItem={({ item }) => <PlaceFollow item={item} onPressHandler={locationInfoHandler} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <View
        style={{
          borderColor: Colors.gray,
          borderWidth: 0.5,
          borderRadius: 5,
          position: "absolute",
          top: 40,
          left: 20,
          padding: 8,
          paddingHorizontal: 12,
          backgroundColor: "#fff",
          display: show ? "flex" : "none",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setSort("เรียงจากตัวอักษร");
            setShow(false);
          }}
        >
          <Text style={{ color: Colors.gray }}>เรียงจากตัวอักษร</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 5 }}
          onPress={() => {
            setSort("เรียงจากติดตามล่าสุด");
            setShow(false);
          }}
        >
          <Text style={{ color: Colors.gray }}>เรียงจากติดตามล่าสุด</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default FollowingAllScreen;
