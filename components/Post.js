import React, {useState, useEffect} from "react";
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";
import { Button, Flex, WingBlank } from '@ant-design/react-native';
import { Ionicons, Entypo, Feather, FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import ManagePostModal from './ManagePostModal';
import CommentModal from "./CommentModal";
import actualDimensions from "../constants/actualDimensions";

// Render Category
const renderItem = ({ item }) => (
  <View style={styles.Cat} disabled>
    <Text style={{color: "white", fontSize: 12}}>{item.value}</Text>
  </View>
);

// Show Trending or not
const renderTrending = (trending) => {
  if (trending) {
    return (
      <Flex style={{marginLeft: 12, gap: 3}}>
        <MaterialIcons name="local-fire-department" size={20} color={Colors.pink} />
        <Text style={{color: Colors.pink}}>ยอดนิยม</Text>
      </Flex>
      )
  } else {
    return null
  }
}



const Post = (props) => {
  // Check if post category is can move or not
  const postData = props.postData
  const [data, setData] = useState([])
  const [trending, setTrending] = useState(false)
  const [comments, setComments] = useState([])

  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [statusColor, setStatusColor] = useState("red")

  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false)

  // Set When Open this page
  useEffect(() => {
    setData(postData)
    setComments(postData.comments)
    if (postData.isTrending) {
      setTrending(true)
    }
    else {
      setTrending("")
    }

    if (data.status == "กำลังดำเนินการ") {
      setStatusColor(Colors.success)
    }
    else if (data.status == "รอรับเรื่อง") {
      setStatusColor(Colors.warning)
    }
    else if (data.status == "แก้ไขเสร็จสิ้น") {
      setStatusColor(Colors.gray2)
    }
    else {
      setStatusColor("red")
    }
    let contentWidth = 0;
    postData.categories.forEach(item => {
      contentWidth += item.value.length * 8;
    });

    if (contentWidth <= actualDimensions.width) {
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    }
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
      <CommentModal isVisible={isCommentModalVisible} onClose={toggleCommentModal} commentsItem={comments}></CommentModal>
      <ManagePostModal isVisible={isPostModalVisible} onClose={togglePostModal} isEditable={isEditable}/>
      <WingBlank style={styles.sub_container1}>
        {/* Header */}
        <Flex direction="row" justify="between" style={{marginBottom: 5}}>
          <Flex>
            <Ionicons name="location-sharp" size={32} color={Colors.primary} />
            <WingBlank size="sm">
              <Flex direction="column" align="start">
                <Flex justify="center" align="center">
                  <Text style={{color: Colors.gray}}>จาก</Text><Text> {data.location}</Text>
                  <WingBlank size="md" >
                    <Button size="small" style={styles.button} activeStyle={{backgroundColor: Colors.primary_sub}}>
                      <Text style={{color: "white", fontSize: 12}}>ติดตาม</Text>
                    </Button>
                  </WingBlank>
                </Flex>
                <Text style={{color: Colors.gray, fontSize: 12}}>{data.date}m ago</Text>
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
            keyExtractor={item => item.key}
            scrollEnabled={scrollEnabled}
            showsHorizontalScrollIndicator={false}
          />
        {/* Content */}
        <View style={{marginTop: 10}}>
          <Flex align="center">
            <Text style={{fontWeight: "bold", fontSize: 20}}>{data.title}</Text>
            {renderTrending(trending)}
          </Flex>
          <Text style={{marginTop: 5}}>{data.des}</Text>
        </View>
      </WingBlank>
        {/* Lower Part */}
        <Image style={{ height: 250, width: "100%" }} source={data.img ? {uri: data.img} : require('../assets/no-image.png')}></Image>

        <Flex direction="row" justify="between" style={styles.sub_container2}>
            <Flex style={{gap: 5}}>
              <Feather name="chevrons-up" size={24} color={Colors.gray}/>
              <Text>{data.vote}</Text>
              <Feather name="chevrons-down" size={24} color={Colors.gray} />
              <TouchableOpacity onPress={toggleCommentModal}>
                <FontAwesome name="commenting-o" size={24} color={Colors.gray} style={{marginLeft: 7, marginRight: 2, top: -1}}/>
                {/* <Text style={{color: Colors.gray}}>{comments.length} ความคิดเห็น</Text> */}
              </TouchableOpacity>
            </Flex>
            <Flex style={{gap: 5}}>
              <AntDesign name="infocirlceo" size={20} color={Colors.gray} />
              <Text style={{color: statusColor}}> {data.status}</Text>
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
    width: "100%"
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
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15
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
  }
});


export default Post;
