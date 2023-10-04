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
import placeData from "../data/location.json";
import Colors from "../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";

const postItem = ({ item }) => <Post postData={item} />;

const LocationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const locationData = route.params.location;

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
            source={locationData.logo ? {uri: locationData.logo}: require('../assets/no-image.png')}
          />
          <View style={{ marginLeft: 10, marginRight: 20, width: '60%' }}>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>
              {locationData.name}
            </Text>
            <Text style={{ color: Colors.gray2, fontSize: 13, marginTop: 5 }}>
              {locationData.member} สมาชิก
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
          {locationData.detail}
        </Text>
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

export default LocationScreen;
