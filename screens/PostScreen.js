import React from "react";
import Post from "../components/Post";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const PostScreen = () => {
  const DATA = useSelector((state) => state.data.postDetailData)
  const route = useRoute();
  const post_id = route.params.post_id
  console.log(post_id);
  const data = DATA.find(post => post.post_id === post_id)
  return <Post postData={data} />;
};

export default PostScreen;
