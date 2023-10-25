// SortHeader.js

import React from 'react';
import { Flex } from "@ant-design/react-native";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

export const SortHeader = ({ selectedSort, onSortChange }) => {
  const handleButtonPress = (value) => {
    onSortChange(value); // Call the sorting callback with the selected value
  };

  return (
    <View>
      <Flex style={styles.container}>
        <TouchableOpacity
          style={selectedSort === 'all' ? styles.sortButtonSelected : styles.sortButton}
          onPress={() => handleButtonPress('all')}
        >
          <Text style={selectedSort === 'all' ? styles.buttonTextSelected : styles.buttonText}>
            ทั้งหมด
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedSort === 'popular' ? styles.sortButtonSelected : styles.sortButton}
          onPress={() => handleButtonPress('popular')}
        >
          <Text style={selectedSort === 'popular' ? styles.buttonTextSelected : styles.buttonText}>
            ยอดนิยม
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedSort === 'latest' ? styles.sortButtonSelected : styles.sortButton}
          onPress={() => handleButtonPress('latest')}
        >
          <Text style={selectedSort === 'latest' ? styles.buttonTextSelected : styles.buttonText}>
            ล่าสุด
          </Text>
        </TouchableOpacity>
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: "white",
    borderColor: Colors.gray2,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 10,
  },
  sortButton: {
    backgroundColor: Colors.gray4,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  sortButtonSelected: {
    backgroundColor: Colors.primary, // Change to your selected color
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 15,
    color: Colors.gray2,
  },
  buttonTextSelected: {
    fontSize: 15,
    color: 'white',
  },
});

export default SortHeader;
