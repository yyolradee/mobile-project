import React from "react";
import Post from "../components/Post";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const PostScreen = () => {
  const DATA = useSelector((state) => state.post.postDetailData)
  const route = useRoute();
  const post_id = route.params.post_id
  const data = DATA.find(post => post._id == post_id)
  return <Post postData={data} />;
};

export default PostScreen;
