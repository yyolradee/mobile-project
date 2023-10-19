import React, { useEffect, useState, useCallback } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { getLocationById } from "../data/locations/locationsController";
import { LoadingScreen } from "./LoadingScreen";
import { useSelector } from "react-redux";

const postItem = ({ item }) => <Post postData={item} />;

const LocationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const location_id = route.params.location_id;
  const [locationData, setLocationData] = useState(null);
  const postArray = useSelector((state) => state.data.postDetailData);
  const [postData, setPostData] = useState(null);

  const fetchData = async () => {
    try {
      const location = await getLocationById(location_id);
      setLocationData(location);
      const filterPost = postArray.filter(
        (post) => post.location.name == location.name
      );
      setPostData(filterPost);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (locationData === null) {
    // You can display a loading indicator here until locationData is available.
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          backgroundColor: Colors.gray3,
          paddingVertical: 20,
          paddingHorizontal: 30,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <Image
            style={{
              height: 50,
              width: 50,
              backgroundColor: Colors.gray2,
              borderRadius: 25,
            }}
            source={
              locationData.img_path
                ? { uri: locationData.img_path }
                : require("../assets/no-image.png")
            }
          />
          <View style={{ marginLeft: 10, marginRight: 20, width: "60%" }}>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>
              {locationData.name}
            </Text>
            <Text style={{ color: Colors.gray2, fontSize: 13, marginTop: 5 }}>
              {locationData.members.length} สมาชิก
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 25,
              paddingVertical: 3,
              paddingHorizontal: 15,
              marginTop: 4,
            }}
            onPress={() => {}}
          >
            <Text style={{ color: "#fff", fontSize: 12 }}>ติดตาม</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 10, color: Colors.gray }}>
          {locationData.description}
        </Text>
      </View>
      <FlatList
        data={postData}
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

export default LocationScreen;
