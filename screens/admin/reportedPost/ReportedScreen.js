import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getReportedPost } from "../../../data/admin/ReportedController";
import { LoadingScreen } from "../../LoadingScreen";
import ReportedBox from "../../../components/admin/reportedPost/ReportedBox";
import { useSelector } from "react-redux";

const ReportedScreen = () => {
  const [reportedPost, setReportedPost] = useState(null);
  const postDATA = useSelector((state) => state.data.postDetailData)

  async function fetchPost() {
    const fetchReportedPost = await getReportedPost();
    const readyData = fetchReportedPost.map((item) => {
      const post = postDATA.find(post => post.post_id === item.post_id)
      return {
        ...item,
        post: post
      }
    })
    console.log("FetchPost")
    setReportedPost(readyData);
  }

  useEffect(() => {
    fetchPost();
  }, []);

  if (reportedPost == null) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={reportedPost}
        keyExtractor={(post) => post.report_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <ReportedBox reportedPost={item} fetchPost={fetchPost} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
  },
});

export default ReportedScreen;
