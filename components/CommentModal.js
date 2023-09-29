import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
  Animated,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { Modal, Flex } from "@ant-design/react-native";
import actualDimensions from "../constants/actualDimensions";
import Colors from "../constants/Colors";


const CommentModal = ({ isVisible, onClose, commentsItem }) => {
  const [text, setText] = useState("");
  const textInputRef = useRef(null);
  const [getHeight, setGetHeight] = useState("");
  const [noCommentMargin, setNoCommentMargin] = useState(getHeight - (getHeight * 80) / 100);
  const translateY = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    setGetHeight(actualDimensions.height);
    if (!isVisible) {
      translateY.setValue(0);
      setNoCommentMargin(getHeight - (getHeight * 80) / 100)
    }
  });

  const slideUpAnimation = (value, param) => {
    Animated.spring(param, {
      toValue: -value,
      friction: 9,
      useNativeDriver: false,
    }).start();
  };

  const slideDownAnimation = (value, param) => {
    Animated.spring(param, {
      toValue: value,
      friction: 9,
      useNativeDriver: false,
    }).start();
  };



  const handleTextChange = (newText) => {
    setText(newText);
  };

  const handleKeyboardShow = () => {
    slideUpAnimation(getHeight - (getHeight * 80) / 100, translateY)
    if (!commentsItem.length && Platform.OS === "ios") {
      setNoCommentMargin(getHeight - (getHeight * 90) / 100)
    }
  };

  const handleKeyboardHide = () => {
    slideDownAnimation(0, translateY);
    if (!commentsItem.length && Platform.OS === "ios") {
      setNoCommentMargin(getHeight - (getHeight * 80) / 100)
    }
  };

  const responsiveHeight = () => {
    return getHeight - (getHeight * 25) / 100;
  };

  const renderRole = (role) => {
    if (role === "admin") {
      return (
        // !!!! admin design 1
        //  <Text style={{color: Colors.primary, fontSize: 10, textAlign: "center", fontWeight: "bold"}}>Admin</Text>

        // !!!! admin design 2
        <View style={{position: "absolute", bottom: -5, backgroundColor: Colors.primary, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10}}>
          <Text style={{color: "white", fontSize: 10, textAlign: "center", fontWeight: "bold"}}>Admin</Text>
        </View>
      )
    }
  }

  const renderComment = ({ item }) => {
    return (
        <Flex direction="row" align="start" style={{flex: 1, marginBottom: 20, gap: 10}} >
          <Flex direction="column">
            <Image style={{ height: 50, width: 50, borderRadius: 100 }} source={item.img ? {uri: item.img} : require('../assets/no-image.png')}></Image>
            {/* !!!! admin design 2 */}
            {renderRole(item.role)}
          </Flex>
          <Flex direction="column" align="start" style={{flex: 1}}>
            {/* !!!! admin design 1 */}
            {/* {renderRole(item.role)} */}
            <Flex align="center" wrap="wrap-reverse" style={{marginBottom: 2}}>
              <Text style={{color: Colors.gray2, fontWeight: "600", fontSize: 16, marginRight: 7}}>{item.name}</Text>
              <Text style={{color: Colors.gray2, fontSize: 11}}>{item.date}m ago</Text>
            </Flex>
            <Text>{item.content}</Text>
          </Flex>
        </Flex>
      );
  };

  const renderPostButton = () => {
    if (text) {
      return (
        <TouchableOpacity>
          <Text style={{ color: Colors.primary, fontWeight: "bold" }}>โพสต์</Text>
        </TouchableOpacity>
      );
    }
  };

  const renderContent = () => {
    if (commentsItem.length) {
      return (
        // Have Comment
        <View style={[styles.container, { height: responsiveHeight() }]}>
          <Text style={styles.header}>ความคิดเห็น</Text>
          <View style={styles.line} />
          <FlatList style={{marginHorizontal: 10}} data={commentsItem} renderItem={renderComment} />
        </View>
      );
    } else {
      return (
        // No Comment
        <View style={[styles.container, { height: responsiveHeight() }]}>
          <Text style={styles.header}>ความคิดเห็น</Text>
          <View style={styles.line} />
          <FlatList style={{flex: 1}} data={[1]} renderItem={() => {
            return (
              <Animated.View>
                <Flex direction="column" justify="center" align="center" style={{ marginTop: noCommentMargin  }}>
                  <Text style={{ fontSize: 20 }}>โพสต์นี้ยังไม่มีความคิดเห็น...</Text>
                 <Text style={{color: Colors.gray2}}>เพิ่มความคิดเห็นเลย</Text>
                </Flex>
              </Animated.View>
            )
          }} />
        </View>
      );
    }
  };

  return (
    <Modal popup visible={isVisible} animationType="slide-up" onClose={onClose} maskClosable>
      <View style={styles.subContainer}>{renderContent()}</View>
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : null}
          style={{ flex: 1}}
        >
      <Animated.View
        style={{ display: "flex", justifyContent: "center", flexDirection: "column", transform: [{ translateY }] }}
      >
        <TextInput
          style={styles.textInput}
          ref={textInputRef}
          placeholder="เพิ่มความคิดเห็น..."
          onChangeText={handleTextChange}
          value={text}
          onFocus={Platform.OS === "ios" ? handleKeyboardShow : null}
          onEndEditing={Platform.OS === "ios" ? handleKeyboardHide : null}
        />
        <View style={styles.frame}></View>
        <View style={styles.postButton}>{renderPostButton()}</View>
      </Animated.View>
      </KeyboardAvoidingView>
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

  subContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  header: {
    textAlign: "center",
    fontSize: 16,
  },

  line: {
    borderBottomColor: Colors.gray2,
    borderBottomWidth: 1,
  },

  textInput: {
    flex: 1,
    zIndex: 1,
    backgroundColor: "white",
    borderColor: Colors.gray,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    padding: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  frame: {
    position: "absolute",
    top: 0,
    borderColor: Colors.gray,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 200,
    width: "100%",
    backgroundColor: "white"
  },
  postButton: {
    position: "absolute",
    zIndex: 2,
    right: 15,
    backgroundColor: "white",
    padding: 5,
  },
});
export default CommentModal;
