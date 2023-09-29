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
import postDATA from "../data/postDetail.json";
import placeData from "../data/place.json";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const postItem = ({ item }) => <Post postData={item} />;

const placeBadgeItem = ({ item }) => {
  return (
    <TouchableOpacity
      style={{ alignItems: "center", width: 65, justifyContent: "center" }}
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
          renderItem={placeBadgeItem}
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
          onPress={() => {navigation.navigate("FollowingAll")}}
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
