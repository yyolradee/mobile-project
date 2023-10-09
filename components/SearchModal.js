import React, { useState } from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";
import { Flex, Modal } from "@ant-design/react-native";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearch } from "../store/actions/searchAction";
import SmallPost from "./SmallPost";

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
      <Flex justify="between" style={{ width: "100%" }}>
        <View style={{width: "50%", borderColor: Colors.primary, borderBottomWidth: 3}}>
          <TouchableOpacity>
            <Text style={{textAlign: "center", paddingVertical: 10, fontWeight: 600}}>โพสต์</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: "50%", backgroundColor: Colors.gray3, borderColor: Colors.gray3, borderBottomWidth: 3}}>
          <TouchableOpacity>
            <Text style={{textAlign: "center", paddingVertical: 10, fontWeight: 600, color: Colors.gray2}}>สถานที่</Text>
          </TouchableOpacity>
        </View>
      </Flex>
      <Text>dwdwdlwdlwldwpldpwd</Text>

      <SmallPost/>
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
