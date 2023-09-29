import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Post from "../components/Post";
import DATA from "../data/postDetail.json";
import { useRoute } from "@react-navigation/native";

const PostScreen = () => {
  const route = useRoute();
  const post_id = route.params.post_id
  const data = DATA.find(post => post._id == post_id)
  return <Post postData={data} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default PostScreen;
