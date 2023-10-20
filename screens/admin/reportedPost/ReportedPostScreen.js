import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Post from "../../../components/Post";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Colors from "../../../constants/Colors";

const ReportedPostScreen = () => {
  const route = useRoute();
  const DATA = useSelector((state) => state.data.postDetailData);
  const post_id = route.params.post_id;
  const data = DATA.find((post) => post.post_id === post_id);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Post postData={data} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "white",
            borderColor: Colors.gray2,
            borderBottomWidth: 1,
            paddingBottom: 15,
            paddingTop: 5,
            marginTop: -1,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: Colors.success,
              borderRadius: 36,
              paddingVertical: 5,
              paddingHorizontal: 20,
              marginRight: 10,
            }}
            onPress={() => {}}
          >
            <Text style={{ color: "#fff", fontSize: 15 }}>ไม่มีปัญหา</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.red,
              borderRadius: 36,
              paddingVertical: 5,
              paddingHorizontal: 25,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 15 }}>ลบโพสต์</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ReportedPostScreen;
