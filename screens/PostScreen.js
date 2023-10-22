import React from "react";
import Post from "../components/Post";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { ScrollView, View } from "react-native";
import NotFound from "../components/NotFound";

const PostScreen = () => {
  const DATA = useSelector((state) => state.data.postDetailData);
  const route = useRoute();
  const post_id = route.params.post_id;
  const data = DATA.find((post) => post.post_id === post_id);
  return (
    <View style={{ flex: 1 }}>
      {data ? (
        <ScrollView>
          <Post postData={data} />
        </ScrollView>
      ) : (
        <NotFound />
      )}
    </View>
  );
};

export default PostScreen;
