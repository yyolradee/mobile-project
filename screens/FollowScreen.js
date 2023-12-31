import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import Post from "../components/Post";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { LoadingScreen } from "./LoadingScreen";
import { getFollowLocations } from "../data/locations/locationsController";
import SortHeader from "../components/SortHeader";

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
        source={item.img_path ? { uri: item.img_path } : require("../assets/no-image.png")}
      />
      <Text style={{ fontSize: 13, marginHorizontal: 5 }} numberOfLines={1} flexWrap="wrap">
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const FollowScreen = () => {
  const navigation = useNavigation();
  const [selectedSort, setSelectedSort] = useState("all");
  const followLocationsData = useSelector((state) => {
    return state.data.followLocationsData;
  });
  const postDATA = useSelector((state) => {
    const filterData = state.data.filterData;
    return filterData.length > 0 ? filterData : state.data.postDetailData;
  });
  const placeData = useSelector((state) => {
    return state.data.locationData;
  });
  const userInfo = useSelector((state) => state.user.userInfo);
  const [loading, setLoading] = useState(false);

  const locationInfoHandler = (item) => {
    navigation.navigate("Location", { location_id: item });
  };

  const handleSortChange = (value) => {
    setSelectedSort(value); // Update the selectedSort state when a button is pressed
  };

  // Sorting logic based on selectedSort value
  const sortedData = [...postDATA].sort((a, b) => {
    if (selectedSort === "popular") {
      // Sort by popularity logic
      return b.is_trending - a.is_trending;
    } else if (selectedSort === "latest") {
      // Sort by latest logic (you need to have a timestamp property in your data)
      return b.create_date - a.create_date;
    }
    return 0; // Default sorting (no change)
  });

  useEffect(() => {
    if (followLocationsData !== null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  });

  if (!loading) {
    return <LoadingScreen />;
  }

  const headerList = () => {
    return (
      <View style={{backgroundColor: "white"}}>
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
            renderItem={({ item }) => <PlaceBadgeItem item={item} onPressHandler={locationInfoHandler} />}
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
        <SortHeader selectedSort={selectedSort} onSortChange={handleSortChange} />
      </View>
    )
  };

  return (
    <View style={{ ...styles.container, justifyContent: followLocationsData.length == 0 ? "center" : "flex-start" }}>
      {followLocationsData.length == 0 ? (
        <Text style={{ fontSize: 18, color: Colors.gray, alignSelf: "center" }}>คุณยังไม่ติดตามสถานที่ใดๆ</Text>
      ) : (
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={headerList}
            stickyHeaderIndices={[0]}
            stickyHeaderHiddenOnScroll={true}
            data={sortedData}
            renderItem={postItem}
            keyExtractor={(item) => item.post_id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
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
