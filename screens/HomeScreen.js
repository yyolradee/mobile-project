import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Post from "../components/Post";
import { useSelector } from "react-redux";

const renderItem = ({ item }) => <Post postData={item} />;

const HomeScreen = () => {
  const DATA = useSelector((state) => {
    const filterData = state.post.filterData;
    return filterData.length > 0 ? state.post.filterData : state.post.postDetailData;
  });
  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
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
