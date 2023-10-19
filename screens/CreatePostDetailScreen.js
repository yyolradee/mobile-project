import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import CreatePostHeader from "../components/CreatePostHeader";
import { useNavigation } from "@react-navigation/native";
import { round, xorBy } from "lodash";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { MultipleSelectList } from "react-native-dropdown-select-list";

// ----------Mock Up API----------
import Colors from "../constants/Colors";

// -----------API---------------
import { getSelectorCategories } from "../data/catagories/categoriesController";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, updatePostWithId } from "../data/posts/postsController";
import { fetchPosts } from "../store/actions/dataAction";

const CreatePostDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [validate, setValidate] = useState(false);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const { title, description, img_path, post_id, locationData, categoriesData, clearState } = route.params;
  const userId = useSelector((state) => state.user.userInfo.uid);
  const locationsTemp = useSelector((state) => state.data.locationData);
  const dispatch = useDispatch();

  function refactorLocations() {
    const locationList = [];
    locationsTemp.forEach((location) => {
      locationList.push({ label: location.name, value: location.location_id });
    });
    setLocations(locationList);
  }

  useEffect(() => {
    // console.log(post_id);
    // console.log(locationData);
    // console.log(categoriesData);
    getSelectorCategories(setCategories);
    refactorLocations();
  }, []);

  useEffect(() => {
    if (selectedPlace == null || selectedCategory.length == 0) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  });

  const checkMaxSelected = (val) => {
    if (selectedCategory.length >= 4) {
      Alert.alert("", "หมวดหมู่สามารถเลือกได้ไม่เกิน 4 หมวดหมู่", [
        {
          text: "ตกลง",
          onPress: () => {},
        },
      ]);
    } else {
      setSelectedCategory(val);
    }
  };

  const objectData = {
    title: title,
    description: description,
    img_path: img_path ? img_path : null,
    owner_id: userId,
    categories_id: selectedCategory,
    location_id: selectedPlace,
  };
  const postHandler = async () => {
    try {
      console.log(objectData);
      await addNewPost(objectData);
      dispatch(await fetchPosts());
    } catch (error) {
      console.log("Add post failure: " + error);
    } finally {
      clearState();
      navigation.popToTop();
      navigation.navigate("HomeScreen");
    }
  };

  const editHander = async () => {
    try {
      console.log(objectData);
      await updatePostWithId(post_id, objectData);
      dispatch(await fetchPosts());
    } catch (error) {
      console.log("Add post failure: " + error);
    } finally {
      clearState();
      navigation.popToTop();
      navigation.navigate("HomeScreen");
    }
  };

  const textSwap = !post_id ? "โพสต์" : "แก้ไข";

  return (
    <View style={styles.container}>
      <CreatePostHeader
        leftButton="ย้อนกลับ"
        rightButton={textSwap}
        isActive={validate}
        leftOnPress={() => {
          navigation.pop();
        }}
        rightOnPress={() => {
          !post_id ? postHandler() : editHander();
        }}
      />
      <View style={{ paddingHorizontal: 30 }}>
        <View style={styles.form}>
          <FontAwesome5 name="map-marker-alt" size={18} color={Colors.primary} />
          <Text style={{ marginLeft: 10 }}>สถานที่</Text>
          <Text style={{ color: "red", marginRight: 40 }}>*</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => {
              setSelectedPlace(value);
            }}
            items={locations}
            placeholder={{ label: "เลือกสถานที่", value: null }}
            Icon={() => {
              return (
                <View style={{ marginRight: 0 }}>
                  <Entypo name="chevron-down" size={24} color="black" />
                </View>
              );
            }}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
          />
        </View>
        <View style={{ ...styles.form, alignItems: "flex-start" }}>
          <View style={{ flexDirection: "row", marginTop: 25 }}>
            <FontAwesome5 name="tag" size={18} color={Colors.primary} />
            <Text style={{ marginLeft: 10 }}>หมวดหมู่</Text>
            <Text style={{ color: "red", marginRight: 7 }}>*</Text>
          </View>
          <MultipleSelectList
            data={categories}
            setSelected={checkMaxSelected}
            save="key"
            placeholder="เลือกประเภท"
            arrowicon={<Entypo name="chevron-down" size={24} color="black" />}
            boxStyles={{
              borderRadius: 0,
              borderWidth: 0,
              width: 270,
              marginTop: 12,
            }}
            inputStyles={{
              color: Colors.gray2,
            }}
            dropdownStyles={{
              width: 230,
              borderWidth: 0,
            }}
            badgeStyles={{ backgroundColor: Colors.primary }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  iconContainer: {
    top: 5,
    right: 0,
  },
  inputIOS: {
    borderColor: Colors.gray2,
    borderBottomWidth: 0.5,
    paddingVertical: 8,
    width: 230,
  },
  inputAndroid: {
    borderColor: Colors.gray2,
    borderBottomWidth: 0.5,
    paddingVertical: 8,
    width: 230,
  },
});

export default CreatePostDetailScreen;
