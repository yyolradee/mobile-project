import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Post from "../components/Post";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { LoadingScreen } from "./LoadingScreen";

const postItem = ({ item }) => <Post postData={item} />;

const PlaceBadgeItem = (props) => {
  const item = props.item;
  return (
    <TouchableOpacity
      style={{ alignItems: "center", width: 65, justifyContent: "center" }}
      onPress={() => {
        props.onPressHandler(item.location_id);
      }}
    >
      <Image
        style={{
          backgroundColor: Colors.gray2,
          width: 50,
          height: 50,
          borderRadius: 30,
        }}
        source={
          item.img_path ? { uri: item.img_path } : require("../assets/no-image.png")
        }
      />
      <Text
        style={{ fontSize: 13, marginHorizontal: 5 }}
        numberOfLines={1}
        flexWrap="wrap"
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const FollowScreen = () => {
  const navigation = useNavigation();
  const followLocationsData = useSelector((state) => state.data.followLocationsData);

  const postDATA = useSelector((state) => {
    const filterData = state.data.filterData;
    return filterData.length > 0 ? filterData : state.data.postDetailData;
  });
  const placeData = useSelector((state) => {
    return state.data.locationData;
  });
  const locationInfoHandler = (item) => {
    navigation.navigate("Location", { location_id: item });
  };

  // useEffect(() => {
  //   console.log(followLocationsData);
  // });

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          horizontal
          data={followLocationsData}
          renderItem={({ item }) => (
            <PlaceBadgeItem item={item} onPressHandler={locationInfoHandler} />
          )}
          keyExtractor={(item) => item.location_id}
          showsHorizontalScrollIndicator={false}
          style={{ padding: 10 }}
        />
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#fff",
            paddingHorizontal: 20,
          }}
          onPress={() => {
            navigation.navigate("FollowingAll");
          }}
        >
          <Text style={{ color: Colors.primary }}>ทั้งหมด</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={postDATA}
        renderItem={postItem}
        keyExtractor={(item) => item.post_id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default FollowScreen;
