import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Post from "../components/Post"
import DATA from "../data/postDetail.json";

const renderItem = ({item}) => (
  <Post postData={item}/>
)

const HomeScreen = () => {
  return (
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item._id}
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
