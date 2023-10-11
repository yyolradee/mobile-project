import { Image, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";

const facultyBox = (props) => {
  const item = props.item;
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
        onPress={() => {
          props.onPressHandler(props.item);
        }}
      >
        <Image
          style={{
            backgroundColor: Colors.gray2,
            width: 40,
            height: 40,
            borderRadius: 30,
          }}
          source={item.logo ? { uri: item.logo } : require("../assets/no-image.png")}
        />
        <Text style={{ fontSize: 14, marginLeft: 14, width: "80%" }} numberOfLines={1} flexWrap="wrap">
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
        }}
      >
        <Text style={{ color: Colors.primary, fontSize: 12 }}>ติดตามแล้ว</Text>
      </TouchableOpacity>
    </View>
  );
};

export default facultyBox;
