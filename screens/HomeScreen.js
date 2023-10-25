// HomeScreen.js

import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import SortHeader from "../components/SortHeader";

const renderItem = ({ item }) => <Post postData={item} />;

const HomeScreen = () => {
  const [selectedSort, setSelectedSort] = useState("all"); // Initialize the selectedSort state

  const DATA = useSelector((state) => {
    const filterData = state.data.filterData;
    return filterData.length > 0 ? filterData : state.data.postDetailData;
  });

  const handleSortChange = (value) => {
    setSelectedSort(value); // Update the selectedSort state when a button is pressed
  };

  // Sorting logic based on selectedSort value
  const sortedData = [...DATA].sort((a, b) => {
    if (selectedSort === "popular") {
      // Sort by popularity logic
      return b.is_trending - a.is_trending;
    } else if (selectedSort === "latest") {
      // Sort by latest logic (you need to have a timestamp property in your data)
      return b.create_date - a.create_date;
    }
    return 0; // Default sorting (no change)
  });

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => <SortHeader selectedSort={selectedSort} onSortChange={handleSortChange} />}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.post_id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default HomeScreen;
