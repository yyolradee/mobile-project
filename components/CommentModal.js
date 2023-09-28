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
} from "react-native";
import { Modal, Flex } from "@ant-design/react-native";
import actualDimensions from "../constants/actualDimensions";
import Colors from "../constants/Colors";
import useKeyboardHeight from "../constants/useKeyboardHeight";

const CommentModal = ({ isVisible, onClose, commentsItem }) => {
  const [text, setText] = useState("");
  const textInputRef = useRef(null);
  const [getHeight, setGetHeight] = useState("");
  const [nowKeyboardHeight, setNowKeyboardHeight] = useState(0);
  const keyboardHeight = useKeyboardHeight();
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setGetHeight(actualDimensions.height);
    if (!isVisible) {
      translateY.setValue(0);
    }
  }, []);

  useEffect(() => {
    if (keyboardHeight !== 0 && nowKeyboardHeight === 0) {
      setNowKeyboardHeight(keyboardHeight);
      console.log(`then: ${keyboardHeight}\nnow: ${nowKeyboardHeight}`);
    }
  }, [keyboardHeight]);

  const slideUpAnimation = (value) => {
    Animated.spring(translateY, {
      toValue: -value,
      duration: 225,
      friction: 9,
      useNativeDriver: false,
    }).start();
  };

  const slideDownAnimation = () => {
    Animated.spring(translateY, {
      toValue: 0,
      duration: 225,
      friction: 9,
      useNativeDriver: false,
    }).start();
  };

  const handleTextChange = (newText) => {
    setText(newText);
  };

  const handleKeyboardShow = () => {
    if (nowKeyboardHeight > 0) {
      slideUpAnimation(nowKeyboardHeight);
    }
  };

  const handleKeyboardHide = () => {
    slideDownAnimation();
  };

  const responsiveHeight = () => {
    return getHeight - (getHeight * 25) / 100;
  };

  const renderComment = ({ item }) => {
    return <Text>{item}</Text>;
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
          <FlatList data={commentsItem} renderItem={renderComment} />
        </View>
      );
    } else {
      return (
        // No Comment
        <View style={[styles.container, { height: responsiveHeight() }]}>
          <Text style={styles.header}>ความคิดเห็น</Text>
          <View style={styles.line} />
          <Flex justify="center" align="center" style={{ flex: 1 }}>
            <Text style={{ fontSize: 20 }}>โพสต์นี้ยังไม่มีความคิดเห็น...</Text>
          </Flex>
        </View>
      );
    }
  };

  return (
    <Modal popup visible={isVisible} animationType="slide-up" onClose={onClose} maskClosable>
      <View style={styles.subContainer}>{renderContent()}</View>
      {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : null}
          style={{ flex: 1}}
        > */}
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
        <View style={styles.postButton}>{renderPostButton()}</View>
      </Animated.View>
      {/* </KeyboardAvoidingView> */}
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

  postButton: {
    position: "absolute",
    zIndex: 2,
    right: 15,
    backgroundColor: "white",
    padding: 5,
  },
});
export default CommentModal;
