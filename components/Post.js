import React, {useState, useEffect} from "react";
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import { Button, Flex, WingBlank } from '@ant-design/react-native';

import { Ionicons, Entypo, Feather, FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';

const renderItem = ({ item }) => (
  <View style={styles.Cat} disabled>
    <Text style={{color: "white", fontSize: 12}}>{item.value}</Text>
  </View>
);

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
  const postData = props.postData
  const [data, setData] = useState([])
  const [trending, setTrending] = useState(false)
  const [comments, setComments] = useState([])

  const screenWidth = Dimensions.get('window').width;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [statusColor, setStatusColor] = useState("red")


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

    // console.log(`screen width: ${screenWidth}`);
    let contentWidth = 0;
    postData.categories.forEach(item => {
      contentWidth += item.value.length * 8;
    });

    if (contentWidth <= screenWidth) {
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    }
  });

  return (
    <View style={styles.container}>
      <WingBlank style={styles.sub_container1}>
        <Flex direction="row" justify="between" style={{marginBottom: 5}}>
          {/* Header */}
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
            <Entypo name="dots-three-horizontal" size={14} color="black" />
            <Text></Text>
          </Flex>
        </Flex>
        <FlatList
            horizontal
            data={data.categories}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            scrollEnabled={scrollEnabled}
            showsHorizontalScrollIndicator={false}
          />
        <View style={{marginTop: 10}}>
          <Flex align="center">
            <Text style={{fontWeight: "bold", fontSize: 20}}>{data.title}</Text>
            {renderTrending(trending)}
          </Flex>
          <Text style={{marginTop: 5}} numberOfLines={5} flexWrap="wrap">{data.des}</Text>
        </View>
      </WingBlank>
        <Image style={{ height: 250, width: "100%", display:data.img ? "flex": "none" }} source={data.img ? {uri: data.img} : require('../assets/no-image.png')}></Image>

        <Flex direction="row" justify="between" style={styles.sub_container2}>
            <Flex style={{gap: 5}}>
              <Feather name="chevrons-up" size={24} color={Colors.gray}/>
              <Text>{data.vote}</Text>
              <Feather name="chevrons-down" size={24} color={Colors.gray} />
              <FontAwesome name="commenting-o" size={24} color={Colors.gray} style={{marginLeft: 7, marginRight: 2, top: -1}}/>
              {/* <Text style={{color: Colors.gray}}>{comments.length} ความคิดเห็น</Text> */}
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
