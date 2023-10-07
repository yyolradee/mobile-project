import {View, Text} from "react-native"
import Colors from "./Colors";

const headerCustomTitle = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 20, fontWeight: 600, color: Colors.primary }}>KMITL </Text>
        <Text style={{ color: "black", fontSize: 20, fontWeight: 600 }}>
          Trouble
        </Text>
      </View>
    );
  };

export default headerCustomTitle;