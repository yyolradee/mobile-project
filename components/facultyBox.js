import { Image, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { deleteMember } from "../data/locations/locationsController";
import { fetchFollowLocations } from "../store/actions/dataAction";

const facultyBox = (props) => {
  const item = props.item;
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", width: "75%" }}
        onPress={
          props.onPressHandler
          //   () => {
          //   navigation.navigate("Location", { location_id: item.location_id });
          // }
        }
      >
        <Image
          style={{
            backgroundColor: Colors.gray2,
            width: 40,
            height: 40,
            borderRadius: 30,
          }}
          source={
            item.img_path
              ? { uri: item.img_path }
              : require("../assets/no-image.png")
          }
        />
        <Text
          style={{ fontSize: 14, marginLeft: 14, width: "80%" }}
          numberOfLines={1}
          flexWrap="wrap"
        >
          {item.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderColor: Colors.primary,
          borderWidth: 1,
          borderRadius: 20,
          paddingVertical: 4,
          paddingHorizontal: 10,
          display: props.isFollow ? "flex": "none"
        }}
        onPress={async () => {
          try {
            await deleteMember(item.location_id, userInfo.uid);
            dispatch(fetchFollowLocations(userInfo.uid));
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <Text style={{ color: Colors.primary, fontSize: 12 }}>ติดตามแล้ว</Text>
      </TouchableOpacity>
    </View>
  );
};

export default facultyBox;
