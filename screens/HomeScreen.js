import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Post from "../components/Post";
import { useSelector } from "react-redux";

const renderItem = ({ item }) => <Post postData={item} />;

const HomeScreen = () => {
  const DATA = useSelector((state) => {
    const filterData = state.data.filterData;
    return filterData.length > 0 ? filterData : state.data.postDetailData;
  });
  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.post_id}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default HomeScreen;
