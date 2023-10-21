import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert
} from "react-native";
import Post from "../../../components/Post";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import { deleteReportedPost } from "../../../data/admin/ReportedController";
import { deletePostById } from "../../../data/posts/postsController";
import { fetchPosts } from "../../../store/actions/dataAction";

const ReportedPostScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const DATA = useSelector((state) => state.data.postDetailData);
  const post_id = route.params.post_id;
  const data = DATA.find((post) => post.post_id === post_id);

  const confirmDelete = () => {
    Alert.alert(
      "คุณยืนยันที่จะลบโพสต์นี้หรือไม่",
      "การลบโพสต์จะไม่สามารถกู้คืนได้ในภายหลัง",
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
            await deletePostById(post_id);
            route.params.fetchPost();
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
              await deleteReportedPost(route.params.report_id);
              route.params.fetchPost();
              navigation.pop();
            }}
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
            onPress={() => {
              confirmDelete();
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
