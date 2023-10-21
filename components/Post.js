import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { Flex, WingBlank } from "@ant-design/react-native";
import {
  Ionicons,
  Entypo,
  Feather,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import ManagePostModal from "./ManagePostModal";
import CommentModal from "./CommentModal";
import { actualDimensions } from "../constants/responsiveHeight";
import { ReadMoreText } from "../constants/ReadMoreText";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addMember, deleteMember } from "../data/locations/locationsController";
import { fetchFollowLocations } from "../store/actions/dataAction";

// Render Category
const renderItem = ({ item }) => (
  <View style={styles.Cat} disabled>
    <Text style={{ color: "white", fontSize: 12 }}>{item.name}</Text>
  </View>
);

// Show Trending or not
const renderTrending = (trending) => {
  if (trending) {
    return (
      <Flex style={{ marginLeft: 12, gap: 3 }}>
        <MaterialIcons
          name="local-fire-department"
          size={20}
          color={Colors.pink}
        />
        <Text style={{ color: Colors.pink }}>ยอดนิยม</Text>
      </Flex>
    );
  } else {
    return null;
  }
};

const Post = (props) => {
  // Check if post category is can move or not
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const postData = props.postData;
  const [data, setData] = useState([]);
  const [timePassed, setTimePassed] = useState(null);
  const [trending, setTrending] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFollow, setIsFollow] = useState(false);

  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [statusColor, setStatusColor] = useState("red");

  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const followData = useSelector((state) => state.data.followLocationsData);
  // Set When Open this page
  useEffect(() => {
    setData(postData);
    setComments(postData.comments);
    setTimePassed(moment(postData.create_date.toDate()).fromNow());
    setTrending(postData.is_trending);

    if (postData.owner.owner_id === userInfo.uid) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }

    if (data.status == "กำลังดำเนินการ") {
      setStatusColor(Colors.success);
    } else if (data.status == "รอรับเรื่อง") {
      setStatusColor(Colors.warning);
    } else if (data.status == "แก้ไขเสร็จสิ้น") {
      setStatusColor(Colors.gray2);
    } else {
      setStatusColor("red");
    }
    let contentWidth = 0;
    postData.categories.forEach((item) => {
      contentWidth += item.name.length * 8;
    });

    if (contentWidth <= actualDimensions.width) {
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    }

    const checkFollow = followData.findIndex(
      (location) => location.location_id == postData.location.location_id
    );
    setIsFollow(checkFollow == -1 ? false : true);
  });

  // Manage Post Modal Visible
  const togglePostModal = () => {
    setIsPostModalVisible(!isPostModalVisible);
  };

  // Comment Modal Visible
  const toggleCommentModal = () => {
    setIsCommentModalVisible(!isCommentModalVisible);
  };

  return (
    <View style={styles.container}>
      <CommentModal
        isVisible={isCommentModalVisible}
        onClose={toggleCommentModal}
        commentsData={comments}
        postId={postData.post_id}
      ></CommentModal>
      <ManagePostModal
        isVisible={isPostModalVisible}
        onClose={togglePostModal}
        isEditable={isEditable}
        postId={data.post_id}
      />
      <WingBlank style={styles.sub_container1}>
        {/* Header */}
        <Flex direction="row" justify="between" style={{ marginBottom: 5 }}>
          <Flex>
            <Ionicons name="location-sharp" size={32} color={Colors.primary} />
            <WingBlank size="sm">
              <Flex direction="column" align="start">
                <Flex justify="center" align="center">
                  <Text style={{ color: Colors.gray }}>จาก</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Location", {
                        location_id: data.location.location_id,
                      });
                    }}
                  >
                    <Text
                      style={
                        data.location &&
                        data.location.name.length > 30 && { maxWidth: "60%" }
                      }
                      numberOfLines={1}
                    >
                      {" "}
                      {data.location ? data.location.name : null}
                    </Text>
                  </TouchableOpacity>
                  <WingBlank size="md">
                    {isFollow ? (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#fff",
                          flex: 1,
                          paddingVertical: 1,
                          paddingHorizontal: 10,
                          borderRadius: 15,
                          borderColor: Colors.primary,
                          borderWidth: 1,
                        }}
                        onPress={async () => {
                          try {
                            await deleteMember(
                              data.location.location_id,
                              userInfo.uid
                            );
                            dispatch(await fetchFollowLocations(userInfo.uid));
                            setIsFollow(false);
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                      >
                        <Text style={{ color: Colors.primary, fontSize: 12 }}>
                          ติดตามแล้ว
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                          try {
                            await addMember(
                              data.location.location_id,
                              userInfo.uid
                            );
                            dispatch(await fetchFollowLocations(userInfo.uid));
                            setIsFollow(false);
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 12 }}>
                          ติดตาม
                        </Text>
                      </TouchableOpacity>
                    )}
                  </WingBlank>
                </Flex>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>
                  {timePassed}
                </Text>
              </Flex>
            </WingBlank>
          </Flex>
          <Flex direction="column">
            <TouchableOpacity onPress={togglePostModal}>
              <Entypo name="dots-three-horizontal" size={14} color="black" />
            </TouchableOpacity>
            <Text></Text>
          </Flex>
        </Flex>
        {/* Category */}
        <FlatList
          horizontal
          data={data.categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.category_id}
          scrollEnabled={scrollEnabled}
          showsHorizontalScrollIndicator={false}
        />
        {/* Content */}
        <View style={{ marginTop: 10 }}>
          <Flex align="center">
            <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>
              {data.title}
            </Text>
            {renderTrending(trending)}
          </Flex>
          <ReadMoreText
            contents={data.description}
            MAX_LINES={3}
            style={{ marginTop: 5 }}
          />
          {/* <Text style={{marginTop: 5}} numberOfLines={5} flexWrap="wrap">{data.des}</Text> */}
        </View>
      </WingBlank>
      <Image
        style={{
          height: 250,
          width: "100%",
          display: data.img_path ? "flex" : "none",
        }}
        source={
          data.img_path
            ? { uri: data.img_path }
            : require("../assets/no-image.png")
        }
      ></Image>

      <Flex direction="row" justify="between" style={styles.sub_container2}>
        <Flex style={{ gap: 5 }}>
          <Feather name="chevrons-up" size={24} color={Colors.gray} />
          <Text>{data.vote}</Text>
          <Feather name="chevrons-down" size={24} color={Colors.gray} />
          <TouchableOpacity onPress={toggleCommentModal}>
            <FontAwesome
              name="commenting-o"
              size={24}
              color={Colors.gray}
              style={{ marginLeft: 7, marginRight: 2, top: -1 }}
            />
            {/* <Text style={{color: Colors.gray}}>{comments.length} ความคิดเห็น</Text> */}
          </TouchableOpacity>
        </Flex>
        <Flex style={{ gap: 5 }}>
          <AntDesign name="infocirlceo" size={20} color={Colors.gray} />
          <Text style={{ color: statusColor }}> {data.status}</Text>
        </Flex>
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderColor: Colors.gray2,
    borderBottomWidth: 1,
    width: "100%",
  },
  sub_container1: {
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  sub_container2: {
    marginTop: 12,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 12,
  },
  button: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  Cat: {
    backgroundColor: Colors.primary_sub,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 15,
    marginRight: 5,
    border: 0,
  },
});

export default Post;
