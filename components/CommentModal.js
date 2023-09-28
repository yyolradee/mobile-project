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
  KeyboardAvoidingView
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
