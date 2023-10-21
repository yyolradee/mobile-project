import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import DoneSmallPost from "../../../components/admin/manageProblem/DoneSmallPost";

const DoneScreen = () => {
  const allPostData = useSelector((state) => state.data.postDetailData);
  const filteredData = allPostData.filter(
    (post) => post.status == "แก้ไขเสร็จสิ้น" || post.status == "ไม่แก้ไข"
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        keyExtractor={(post) => post.post_id}
        renderItem={({ item }) => <DoneSmallPost DATA={item} />}
      />
    </View>
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

export default DoneScreen;
