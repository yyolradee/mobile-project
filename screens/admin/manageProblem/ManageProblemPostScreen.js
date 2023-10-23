import React, { useDebugValue } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import Post from "../../../components/Post";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import { updateStatus } from "../../../data/posts/postsController";
import { fetchPosts } from "../../../store/actions/dataAction";

const ManageProblemPostScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const DATA = useSelector((state) => state.data.postDetailData);
  const post_id = route.params.post_id;
  const data = DATA.find((post) => post.post_id === post_id);

  const confirmChangeStatus = () => {
    Alert.alert(
      "คุณแน่ใจที่จะละทิ้งปัญหานี้หรือไม่",
      "การเปลี่ยนแปลงนี้จะไม่สามารถกู้คืนได้ในภายหลัง",
      [
        {
          text: "ยกเลิก",
          onPress: () => {
            console.log("Cancel Pressed");
          },
          style: "cancel",
        },
        {
          text: "ยืนยัน",
          onPress: async () => {
            await updateStatus(post_id, "ไม่แก้ไข");
            dispatch(fetchPosts());
            navigation.pop();
          },
        },
      ]
    );
  };
  
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
            onPress={async () => {
              await updateStatus(
                post_id,
                data.status == "รอรับเรื่อง"
                  ? "กำลังดำเนินการ"
                  : "แก้ไขเสร็จสิ้น"
              );
              dispatch(fetchPosts());
              navigation.pop();
            }}
          >
            <Text style={{ color: "#fff", fontSize: 15 }}>
              {data.status == "รอรับเรื่อง" ? "ดำเนินการ" : "แก้ไขเสร็จสิ้น"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.red,
              borderRadius: 36,
              paddingVertical: 5,
              paddingHorizontal: 25,
            }}
            onPress={() => {
              confirmChangeStatus();
            }}
          >
            <Text style={{ color: "#fff", fontSize: 15 }}>
              {data.status == "รอรับเรื่อง" ? "ไม่รับเรื่อง" : "ละทิ้ง"}
            </Text>
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

export default ManageProblemPostScreen;
