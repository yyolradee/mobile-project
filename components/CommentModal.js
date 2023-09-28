import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Modal, Flex } from "@ant-design/react-native";
import actualDimensions from "../constants/actualDimensions"
import Colors from "../constants/Colors";

const CommentModal = ({ isVisible, onClose, commentsItem }) => {
    const [getHeight, setGetHeight] = useState("")
    useEffect(() => {
        setGetHeight(actualDimensions.height)
    })
  const renderComment = ({item}) => {
    return (
        <Text>{item}</Text>
    )
  }
  const renderContent = () => {
    if (commentsItem.length) {
      return (
        // Have Comment
        <View style={[styles.container, {height: getHeight - (getHeight * 20)/100}]}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>ความคิดเห็น</Text>
          <View style={{ borderBottomColor: Colors.gray2, borderBottomWidth: 1 }} />
          <FlatList
            data={commentsItem}
            renderItem={renderComment}
          />
        </View>
      );
    } else {
      return (
        // No Comment
        <View style={[styles.container, {height: getHeight - (getHeight * 20)/100}]}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>ความคิดเห็น</Text>
          <View style={{ borderBottomColor: Colors.gray2, borderBottomWidth: 1 }} />
          <Flex justify="center" align="center" style={{flex: 1}}>
            <Text style={{fontSize: 20}}>โพสต์นี้ยังไม่มีความคิดเห็น...</Text>
        </Flex>
        </View>
      );
    }
  };

  return (
    <Modal popup visible={isVisible} animationType="slide-up" onClose={onClose} maskClosable>
      <View style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>{renderContent()}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
export default CommentModal;
