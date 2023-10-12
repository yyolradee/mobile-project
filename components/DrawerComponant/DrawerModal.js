import { useDispatch, useSelector } from "react-redux";
import { chevronRender, renderFilterDataContent } from "./DrawerData";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, FlatList, View } from "react-native";
import Colors from "../../constants/Colors";
import { Flex, Drawer } from "@ant-design/react-native";
import { Ionicons } from "@expo/vector-icons";
import { setDrawer } from "../../store/actions/drawerAction";
import { statusBarHeight } from "../../constants/responsiveHeight";

const DrawerModal = ({ contents }) => {
  const statusData = useSelector((state) => state.post.statusData);
  const locationData = useSelector((state) => state.post.locationData);
  const categoriesData = useSelector((state) => state.post.categoriesData);
  const isDrawerOpen = useSelector((state) => state.drawer.drawerState);
  const getStatusBarHeight = statusBarHeight();

  // Filter Open Status
  const initialOpenStatus = [false, false, false];
  const [openStatus, setOpenStatus] = useState(initialOpenStatus);

  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(setDrawer(this.drawer.drawerShown));

    // console.log("1: " + this.drawer.drawerShown);
    // console.log("2: " + isDrawerOpen);
  });

  const [listData, setListData] = useState([
    {
      index: 0,
      name: "สถานะ",
      contents: statusData,
      openStatus: openStatus[0],
    },
    {
      index: 1,
      name: "สถานที่",
      contents: locationData.map((item) => item.name),
      openStatus: openStatus[1],
    },
    {
      index: 2,
      name: "หมวดหมู่",
      contents: categoriesData.map((item) => item.value),
      openStatus: openStatus[2],
    },
  ]);

  const filterHander = (index) => {
    const newStatus = [...openStatus];
    newStatus[index] = !newStatus[index];
    setOpenStatus(newStatus);
  };

  renderFilterData = ({ item }) => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: "#C8C8C8",
      }}
    >
      <Flex direction="column" align="start">
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            width: "100%",
          }}
          onPress={() => {
            filterHander(item.index);
          }}
        >
          <Text style={{ fontSize: 16 }}>{item.name}</Text>
          {chevronRender(openStatus[item.index])}
        </TouchableOpacity>
      </Flex>
      {renderFilterDataContent(item, openStatus[item.index])}
    </View>
  );

  const FilterScreen = (
    <Flex direction="column" align="start" style={{ backgroundColor: "white", flex: 1 }}>
      <Flex
        align="center"
        style={{ padding: 19, backgroundColor: Colors.primary, width: "100%", gap: 5, paddingTop: getStatusBarHeight }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: 600 }}>การกรองข้อมูล</Text>
        <Ionicons name="filter" size={24} color="white" />
      </Flex>
      <FlatList
        data={listData}
        renderItem={renderFilterData}
        keyExtractor={(item) => item.index}
        style={{ width: "100%" }}
      />
    </Flex>
  );
  return (
    <Drawer
      position="left"
      sidebar={FilterScreen}
      open={isDrawerOpen}
      drawerRef={(el) => (this.drawer = el)}
      drawerBackgroundColor="#ccc"
    >
      {contents}
    </Drawer>
  );
};

export default DrawerModal;
