import React, { useState } from "react";
import { Text, StyleSheet, TextInput } from "react-native";
import { Flex, Modal } from "@ant-design/react-native";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearch } from "../store/actions/searchAction";

const SearchModal = () => {
  const dispatch = useDispatch();
  const searchIsVisible = useSelector((state) => state.search.searchIsVisible);

  const toggleSearchModal = () => {
    return dispatch(toggleSearch(!searchIsVisible));
  };

  return (
    <Modal
      transparent={false}
      visible={searchIsVisible}
      animationType="fade"
      onClose={toggleSearchModal}
      maskClosable
      style={{ height: "100%" }}
    >
      <Flex justify="between" style={styles.container}>
        <TextInput
          style={styles.textInput}
          //   ref={textInputRef}
          placeholder="ค้นหา..."
          //   onChangeText={handleTextChange}
          //   value={text}
        />
        <TouchableOpacity onPress={toggleSearchModal}>
          <Text style={{ color: Colors.gray2, fontWeight: 600 }}>ยกเลิก</Text>
        </TouchableOpacity>
      </Flex>
      <Text>dwdwdlwdlwldwpldpwd</Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: "80%",
    margin: 17,
    marginTop: 35,
    marginRight: 17,
  },
  textInput: {
    width: "85%",
    borderRadius: 7,
    backgroundColor: Colors.gray4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
  },
});

export default SearchModal;
