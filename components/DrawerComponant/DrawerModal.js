import { useDispatch, useSelector } from "react-redux";
import { renderFilterData } from "./DrawerUtils";
import React, { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import { Flex, Drawer } from "@ant-design/react-native";
import { Ionicons } from "@expo/vector-icons";
import { setDrawer } from "../../store/actions/drawerAction";
import { statusBarHeight } from "../../constants/responsiveHeight";
import { fetchPosts, setFilteredData } from "../../store/actions/dataAction";
import SideMenu from "react-native-side-menu-updated";
import { getCurrentRouteName } from "../../constants/navigationService";

const DrawerModal = ({ contents }) => {
  const statusData = useSelector((state) => state.data.statusData);
  const locationData = useSelector((state) => state.data.locationData);
  const categoriesData = useSelector((state) => state.data.categoriesData);
  const isDrawerOpen = useSelector((state) => state.drawer.drawerState);
  const getStatusBarHeight = statusBarHeight();
  const postData = useSelector((state) => state.data.postDetailData);
  const currentPageName = getCurrentRouteName();

  const [checked, setChecked] = useState([]); // Initialize checked state

  const onChange = (data) => {
    if (checked.includes(data)) {
      setChecked(checked.filter((item) => item !== data));
    } else {
      setChecked([...checked, data]);
    }
  };

  const filterPosts = () => {
    // Filter your post data based on the checked filters
    return postData.filter((post) => {
      // Filter by category
      const postCategories = post.categories.map((category) => category.name);
      const categoryMatch = checked.some((filter) => postCategories.includes(filter));

      // Filter by status
      const statusMatch = checked.includes(post.status);

      // Filter by location
      const locationMatch = checked.includes(post.location.name);

      // Return true if any of the filters match
      return categoryMatch || statusMatch || locationMatch;
    });

    // You can update your application state or perform other actions with the filtered data
    // For now, we'll just console.log it
  };

  // Filter Open Status
  const initialOpenStatus = [false, false, false];
  const [openStatus, setOpenStatus] = useState(initialOpenStatus);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDrawer(isDrawerOpen));
  });

  useEffect(() => {
    const filterData = filterPosts(); // Call the filtering function when checked items change
    dispatch(setFilteredData(filterData));
    if (checked.length === 0) {
      dispatch(fetchPosts());
    }
  }, [checked]);

  const defaultListData = [
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
        contents: categoriesData.map((item) => item.name),
      },
  ];
  const [listData, setListData] = useState(defaultListData);


  useEffect(() => {
    if (currentPageName === "Location") {
      setListData([
        {
          name: "สถานะ",
          contents: statusData,
        },
        {
          name: "หมวดหมู่",
          contents: categoriesData.map((item) => item.name),
        },
      ]);
    } else {
      setListData(defaultListData);
    }
  }, [currentPageName]);

  const refactoredListData = listData.map((item, index) => ({
    index,
    openStatus: openStatus[index],
    ...item,
  }));

  const openHandler = (index) => {
    const newOpenStatus = [...openStatus];
    newOpenStatus[index] = !newOpenStatus[index];
    setOpenStatus(newOpenStatus);
  };

  const FilterScreen = (
    <View
      style={{
        flex: 1,
        borderWidth: 0.2,
        borderColor: Colors.gray4,
      }}
    >
      <View
        style={{
          padding: 19,
          backgroundColor: Colors.primary,
          width: "100%",
          gap: 5,
          paddingTop: getStatusBarHeight,
        }}
      >
        <Flex align="center">
          <Text style={{ color: "white", fontSize: 20, fontWeight: 600 }}>การกรองข้อมูล</Text>
          <Ionicons name="filter" size={24} color="white" />
        </Flex>
      </View>
      <FlatList
        data={refactoredListData}
        renderItem={({ item }) => renderFilterData({ item, openStatus, openHandler, onChange, checked })}
        keyExtractor={(item) => item.index.toString()}
        style={{ width: "100%" }}
      />
    </View>
  );

  return (
    <SideMenu
      menu={FilterScreen}
      isOpen={isDrawerOpen}
      onChange={() => {
        dispatch(setDrawer(false));
      }}
      disableGestures={true}
    >
      {contents}
    </SideMenu>
  );
};

export default DrawerModal;
