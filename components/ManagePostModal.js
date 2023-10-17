import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Modal, Flex } from "@ant-design/react-native";
import Colors from "../constants/Colors";
import { MaterialIcons, AntDesign, Octicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deletePostById } from "../data/posts/postsController";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../store/actions/dataAction";


const ManagePostModal = ({ isVisible, onClose, isEditable, postId }) => {
  const dispatch = useDispatch();
  const deleteHandler = async (postId) => {
    try {
      await deletePostById(postId);
      dispatch(await fetchPosts());
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const renderItem = () => {
    if (isEditable) {
      return (
        // Editable Post
        <View style={styles.container}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>การจัดการโพสต์</Text>
          <View style={{ borderBottomColor: Colors.gray2, borderBottomWidth: 1 }} />
          <Flex align="center" style={{ gap: 5 }}>
            <MaterialIcons name="visibility-off" size={24} color={Colors.gray} />
            <Text style={{ color: Colors.gray }}>ซ่อนโพสต์</Text>
          </Flex>
          <TouchableOpacity onPress={() => deleteHandler(postId)}>
            <Flex align="center" style={{ gap: 5 }}>
              <Feather name="trash-2" size={24} color="red" />
              <Text style={{ color: "red" }}>ลบโพสต์</Text>
            </Flex>
          </TouchableOpacity>
          <Flex align="center" style={{ gap: 5 }}>
            <FontAwesome5 name="edit" size={24} color={Colors.gray} />
            <Text style={{ color: Colors.gray }}>แก้ไขโพสต์</Text>
          </Flex>
        </View>
      );
    } else {
      return (
        // Repost Post
        <View style={styles.container}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>การจัดการโพสต์</Text>
          <View style={{ borderBottomColor: Colors.gray2, borderBottomWidth: 1 }} />
          <Flex align="center" style={{ gap: 5 }}>
            <MaterialIcons name="visibility-off" size={24} color={Colors.gray} />
            <Text style={{ color: Colors.gray }}>ซ่อนโพสต์</Text>
          </Flex>
          <Flex align="center" style={{ gap: 5 }}>
            <AntDesign name="warning" size={24} color="red" />
            <Text style={{ color: "red" }}>รายงานโพสต์</Text>
          </Flex>
          <Flex align="center" style={{ gap: 5 }}>
            <Octicons name="bell" size={24} color={Colors.gray} />
            <Text style={{ color: Colors.gray }}>เปิดการแจ้งเตือนเกี่ยวกับโพสต์นี้</Text>
          </Flex>
        </View>
      );
    }
  };

  return (
    <Modal popup visible={isVisible} animationType="slide-up" onClose={onClose} maskClosable>
      <View style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>{renderItem()}</View>
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
export default ManagePostModal;
