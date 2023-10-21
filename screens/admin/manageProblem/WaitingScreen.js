import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ManageSmallPost from "../../../components/admin/manageProblem/ManageSmallPost";

const WaitingScreen = () => {
  const allPostData = useSelector((state) => state.data.postDetailData);
  const filteredData = allPostData.filter(
    (post) => post.status == "รอรับเรื่อง"
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        keyExtractor={(post) => post.post_id}
        renderItem={({ item }) => <ManageSmallPost DATA={item} />}
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

export default WaitingScreen;
