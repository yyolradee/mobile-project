import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getReportedPost } from "../../../data/admin/ReportedController";
import { LoadingScreen } from "../../LoadingScreen";
import ReportedBox from "../../../components/admin/reportedPost/ReportedBox";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";

const ReportedScreen = () => {
  const [reportedPost, setReportedPost] = useState(null);
  const postDATA = useSelector((state) => state.data.postDetailData);

  async function fetchPost() {
    const fetchReportedPost = await getReportedPost();
    const readyData = fetchReportedPost.map((item) => {
      const post = postDATA.find((post) => post.post_id === item.post_id);
      return {
        ...item,
        post: post,
      };
    });
    console.log("FetchPost");
    setReportedPost(readyData);
  }

  useEffect(() => {
    fetchPost();
  }, []);

  if (reportedPost == null) {
    return <LoadingScreen />;
  }
  return (
    <View
      style={{
        ...styles.container,
        justifyContent: reportedPost.length == 0 ? "center" : "flex-start",
      }}
    >
      {reportedPost.length == 0 ? (
        <Text style={{ fontSize: 20, color: Colors.gray, alignSelf: "center" }}>
          ยังไม่มีโพสต์ที่ถูกรายงานในขณะนี้...
        </Text>
      ) : (
        <FlatList
          data={reportedPost}
          keyExtractor={(post) => post.report_id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <ReportedBox reportedPost={item} fetchPost={fetchPost} />;
          }}
        />
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

export default ReportedScreen;
