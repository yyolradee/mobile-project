import React from "react";
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

const postItem = ({ item }) => <Post postData={item} />;

const PlaceBadgeItem = (props) => {
  const item = props.item;
  return (
    <TouchableOpacity
      style={{ alignItems: "center", width: 65, justifyContent: "center" }}
      onPress={() => {props.onPressHandler(item)}}
    >
      <Image
        style={{
          backgroundColor: Colors.gray2,
          width: 50,
          height: 50,
          borderRadius: 30,
        }}
        source={
          item.logo ? { uri: item.logo } : require("../assets/no-image.png")
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

  const locationInfoHandler = (item) => {
    navigation.navigate("Location", {location: item})
  }

  const postDATA = useSelector((state) => {
    const filterData = state.post.filterData
    return filterData.length > 0 ? state.post.filterData : state.post.postDetailData}
    )
    const placeData = useSelector((state) => {
      return state.post.locationData
    })

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
          data={placeData}
          renderItem={({ item }) => <PlaceBadgeItem item={item} onPressHandler={locationInfoHandler} />}
          keyExtractor={(item) => item.id}
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
        keyExtractor={(item) => item._id}
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
