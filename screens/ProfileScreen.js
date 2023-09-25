import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import Post from "../components/Post";
import { useNavigation } from "@react-navigation/native";
import DATA from "../data/postDetail.json"

const ProfileScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 25, paddingVertical: 20, borderColor: "#000", borderBottomWidth: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "flex-end", marginBottom: 10 }}>
          <Image
            style={{ height: 120, width: 120, borderRadius: 100 }}
            source={{
              uri: "https://cdn.discordapp.com/attachments/962280584418304030/1154024339591663646/profile.PNG",
            }}
          />
          <TouchableOpacity style={styles.borderButton} onPress={() => {navigation.navigate("EditProfile")}}>
              <Text>แก้ไขโปรไฟล์</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 5}}>Yolradee Prayoonpunratn</Text>
        <Text style={{color: Colors.gray, fontSize: 13, marginBottom: 5}}>64070089@kmitl.ac.th</Text>
        <View style={{flexDirection: "row", alignItems: "center"}}>
        <FontAwesome5
            name="map-marker-alt"
            size={15}
            color={Colors.gray}
          />
          <Text style={{fontSize: 15, marginLeft: 5}}>คณะ</Text>
          <Text style={{fontSize: 15}}> เทคโนโลยีสารสนเทศ</Text>
        </View>
      </View>
      <ScrollView>
        <Post postData={DATA[0]}></Post>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  borderButton: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff"
  }
});

export default ProfileScreen;
