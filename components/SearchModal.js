import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, TextInput, View, FlatList } from "react-native";
import { Flex, Modal } from "@ant-design/react-native";
import Colors from "../constants/Colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
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
  const DATA = useSelector((state) => state.data.postDetailData);
  const [sortData, setSortData] = useState([]);
  const LOCATION_DATA = useSelector((state) => state.data.locationData);
  const searchIsVisible = useSelector((state) => state.search.searchIsVisible);
  const [switchState, setSwitchState] = useState(false);
  const [text, setText] = useState("");
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    !switchState ? searchItem(DATA, text, switchState) : searchItem(LOCATION_DATA, text, switchState);
  }, [text]);

  useEffect(() => {
    if (searchIsVisible) {
      setSortData(DATA)
    }
  }, [searchIsVisible]);

  useEffect(() => {
    sortData.sort((a, b) => {
      if (a.is_trending === b.is_trending) {
        return 0; // Keep the order of equal elements unchanged
      } else if (a.is_trending) {
        return -1; // `true` comes before `false`
      } else {
        return 1; // `false` comes after `true`
      }
    });
  }, [sortData]);

  const toggleSearchModal = () => {
    setText("");
    setSwitchState(false);
    return dispatch(toggleSearch(!searchIsVisible));
  };

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
    navigation.navigate("inPost", { post_id: id });
    toggleSearchModal();
  };

  const renderPostItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigationHanler(item.post_id)}>
        <SmallPost DATA={item} />
      </TouchableOpacity>
    );
  };

  const renderAmount = (
    <Text style={{ color: Colors.gray2, paddingHorizontal: 17, paddingVertical: 10, fontWeight: "100" }}>
      ผลลัพท์การค้นหา {searchData ? searchData.length : 0} รายการ
    </Text>
  );

  const locationInfoHandler = () => {
    navigation.navigate("Location", { location_id: item });
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
        <View style={{ height: "100%" }}>
          <View style={{ paddingVertical: 8, paddingLeft: 17, borderBottomWidth: 1, borderColor: Colors.gray2 }}>
            <Flex align="end" style={{ gap: 6 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>โพสต์ที่กำลังยอดนิยม</Text>
              <Ionicons name="md-stats-chart" size={24} color={Colors.gray2} />
            </Flex>
          </View>
          <FlatList data={sortData} renderItem={renderPostItem} keyExtractor={(item) => item.post_id} />
        </View>
      ) : (
        <View style={{ height: "100%" }}>
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
            <FlatList
              ListHeaderComponent={renderAmount}
              data={searchData}
              renderItem={renderPostItem}
              keyExtractor={(item) => item.post_id}
            />
          ) : (
            <FlatList
              data={searchData}
              ListHeaderComponent={renderAmount}
              renderItem={({ item }) => <FacultyBox item={item} onPressHandler={() => {
                navigation.navigate("Location", {
                  location_id: item.location_id,
                });
                toggleSearchModal();
              }} isFollow={false} />}
              keyExtractor={(item) => item.location_id}
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
