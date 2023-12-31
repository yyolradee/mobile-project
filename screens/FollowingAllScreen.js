import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Colors from "../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FacultyBox from "../components/facultyBox";
import { useSelector } from "react-redux";

const FollowingAllScreen = () => {
  const navigation = useNavigation();
  const [sort, setSort] = useState("เรียงจากตัวอักษร");
  const [show, setShow] = useState(false);
  const followLocationsData = useSelector(
    (state) => state.data.followLocationsData
  );

  followLocationsData.sort((item1, item2) =>
    item1.name > item2.name ? 1 : item1.name < item2.name ? -1 : 0
  );

  useEffect(() => {
    if (sort == "เรียงจากตัวอักษร") {
      followLocationsData.sort((item1, item2) =>
        item1.name > item2.name ? 1 : item1.name < item2.name ? -1 : 0
      );
    } else {
      console.log("เวลาเหลือค่อยทำนะ");
    }
  }, [sort]);

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
      <FlatList
        style={{ paddingTop: 10 }}
        data={followLocationsData}
        renderItem={({ item }) => (
          <FacultyBox
            item={item}
            onPressHandler={() => {
              navigation.navigate("Location", {
                location_id: item.location_id,
              });
            }}
            isFollow={true}
          />
        )}
        keyExtractor={(item) => item.location_id}
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
