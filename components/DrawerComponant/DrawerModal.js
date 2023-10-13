import { useDispatch, useSelector } from "react-redux";
import { renderFilterData } from "./DrawerUtils";
import React, { useEffect, useState } from "react";
import { Text, FlatList } from "react-native";
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
  });

  const listData = [
    {
      name: "สถานะ",
      contents: statusData,
    },
    {
      name: "สถานที่",
      contents: locationData.map((item) => item.name),
    },
    {
      name: "หมวดหมู่",
      contents: categoriesData.map((item) => item.value),
    },
  ];

  const refactoredListData = listData.map((item, index) => ({
    index,
    openStatus: openStatus[index],
    ...item,
  }));

  const filterHander = (index) => {
    const newOpenStatus = [...openStatus];
    newOpenStatus[index] = !newOpenStatus[index];
    setOpenStatus(newOpenStatus);
  };

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
        data={refactoredListData}
        renderItem={({ item }) => renderFilterData({ item, openStatus, filterHandler: filterHander })}
        keyExtractor={(item) => item.index.toString()} // Use toString() to ensure key is a string
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
