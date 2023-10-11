import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, TextInput, View, FlatList } from "react-native";
import { Flex, Modal } from "@ant-design/react-native";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearch } from "../store/actions/searchAction";
import SmallPost from "./SmallPost";
import { statusBarHeight } from "../constants/responsiveHeight";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FacultyBox from "./facultyBox";

const SearchModal = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getStatusBarHeight = statusBarHeight();
  const DATA = useSelector((state) => state.post.postDetailData);
  const LOCATION_DATA = useSelector((state) => state.post.locationData);
  const searchIsVisible = useSelector((state) => state.search.searchIsVisible);
  const [switchState, setSwitchState] = useState(false);
  const [text, setText] = useState("");
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    !switchState ? searchItem(DATA, text, switchState) : searchItem(LOCATION_DATA, text, switchState);
  }, [text]);

  const toggleSearchModal = () => {
    setText("");
    setSwitchState(false);
    return dispatch(toggleSearch(!searchIsVisible));
  };

  const sortData = DATA.sort((a, b) => {
    if (a.isTrending === b.isTrending) {
      return 0; // Keep the order of equal elements unchanged
    } else if (a.isTrending) {
      return -1; // `true` comes before `false`
    } else {
      return 1; // `false` comes after `true`
    }
  });

  const handleTextChange = (input) => {
    setText(input);
  };

  const searchItem = (data, item, bool) => {
    !bool
      ? setSearchData(data.filter((data) => data.title.toLowerCase().includes(item.toLowerCase())))
      : setSearchData(data.filter((data) => data.name.toLowerCase().includes(item.toLowerCase())));
  };

  const switchHandler = (bool) => {
    setSwitchState(bool);
  };

  const navigationHanler = (id) => {
    navigation.navigate("postInNoti", { post_id: id });
    toggleSearchModal();
  };

  const renderPostItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigationHanler(item._id)}>
        <SmallPost DATA={item} />
      </TouchableOpacity>
    );
  };

  const locationInfoHandler = (item) => {
    navigation.navigate("Location", { location: item });
    toggleSearchModal();
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
      <Flex justify="between" style={[styles.container, { marginTop: getStatusBarHeight + 10 }]}>
        <TextInput style={styles.textInput} placeholder="ค้นหา..." onChangeText={handleTextChange} value={text} />
        <TouchableOpacity onPress={toggleSearchModal}>
          <Text style={{ color: Colors.gray2, fontWeight: 600 }}>ยกเลิก</Text>
        </TouchableOpacity>
      </Flex>

      {!text ? (
        <View style={{height: "100%"}}>
          <View style={{ paddingVertical: 8, paddingLeft: 17, borderBottomWidth: 1, borderColor: Colors.gray2 }}>
            <Flex align="end" style={{ gap: 6 }}>
              <Text style={{ fontWeight: "bold" }}>โพสต์ที่กำลังยอดนิยม</Text>
              <Ionicons name="md-stats-chart" size={24} color={Colors.gray2} />
            </Flex>
          </View>
          <FlatList data={sortData} renderItem={renderPostItem} keyExtractor={(item) => item._id} />
        </View>
      ) : (
        <View style={{height: "100%"}}>
          <Flex justify="between" style={{ width: "100%" }}>
            <View
              style={
                !switchState
                  ? { width: "50%", borderColor: Colors.primary, borderBottomWidth: 3 }
                  : { width: "50%", backgroundColor: Colors.gray3, borderColor: Colors.gray3, borderBottomWidth: 3 }
              }
            >
              <TouchableOpacity
                onPress={() => {
                  switchHandler(false);
                  searchItem(DATA, text, false);
                }}
              >
                <Text
                  style={
                    !switchState
                      ? { textAlign: "center", paddingVertical: 10, fontWeight: 600 }
                      : { textAlign: "center", paddingVertical: 10, fontWeight: 600, color: Colors.gray2 }
                  }
                >
                  โพสต์
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={
                switchState
                  ? { width: "50%", borderColor: Colors.primary, borderBottomWidth: 3 }
                  : { width: "50%", backgroundColor: Colors.gray3, borderColor: Colors.gray3, borderBottomWidth: 3 }
              }
            >
              <TouchableOpacity
                onPress={() => {
                  switchHandler(true);
                  searchItem(LOCATION_DATA, text, true);
                }}
              >
                <Text
                  style={
                    switchState
                      ? { textAlign: "center", paddingVertical: 10, fontWeight: 600 }
                      : { textAlign: "center", paddingVertical: 10, fontWeight: 600, color: Colors.gray2 }
                  }
                >
                  สถานที่
                </Text>
              </TouchableOpacity>
            </View>
          </Flex>
          {!switchState ? (
            <FlatList data={searchData} renderItem={renderPostItem} keyExtractor={(item) => item._id} />
          ) : (
            <FlatList
              data={searchData}
              renderItem={({ item }) => <FacultyBox item={item} onPressHandler={locationInfoHandler} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: "80%",
    margin: 17,
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
