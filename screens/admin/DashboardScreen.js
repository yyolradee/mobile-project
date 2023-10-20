import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, Button, Text, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { statusBarHeight } from "../../constants/responsiveHeight";
import { Flex } from "@ant-design/react-native";
import Colors from "../../constants/Colors";
import {
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  Octicons,
  Feather,
} from "@expo/vector-icons";
// import PieChart from 'react-native-pie-chart'


const DashboardScreen = () => {
  const navigation = useNavigation();
  const localStatusBarHeight = statusBarHeight();
  const userInfo = useSelector((state) => state.user.userInfo);
  const widthAndHeight = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00']
  return (
    <View style={[styles.container, { paddingTop: localStatusBarHeight }]}>
      <ScrollView>
        <Flex justify="between">
          <Flex direction="column" align="starts" style={{ gap: 5 }}>
            <Text style={{ fontSize: 16, color: Colors.gray2 }}>ยินดีต้อนรับ</Text>
            <Text style={{ fontSize: 24, fontWeight: 600 }}>{userInfo.displayName}</Text>
          </Flex>
          <Image style={{ width: 70, height: 70 }} source={require("../../assets/kmitl_logo.png")} />
        </Flex>
        <Flex direction="column" align="start" style={{ paddingHorizontal: 5, paddingTop: 14, paddingBottom: 25 }}>
          <Flex align="center" style={{ gap: 10, marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                textAlignVertical: "center",
                paddingLeft: 5,
              }}
            >
              การจัดการ
            </Text>
            <FontAwesome5 name="edit" size={24} color={"black"} />
            <View style={styles.dottedLine} />
          </Flex>
          <Flex justify="between" style={{ width: "100%", paddingHorizontal: 2.5, gap: 10, flex: 1 }}>
            <TouchableOpacity
              style={styles.manageButton}
              onPress={() => {
                navigation.navigate("ManageProblem");
              }}
            >
              <Flex justify="between" align="center">
                <Flex>
                  <Text style={styles.manageButtonFont}>จัดการ</Text>
                  <Text style={[styles.manageButtonFont, { color: Colors.adminary }]}>ปัญหา</Text>
                </Flex>
                <Entypo name="chevron-right" size={24} color={Colors.adminary} />
              </Flex>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.manageButton}
              onPress={() => {
                navigation.navigate("ManageReport");
              }}
            >
              <Flex justify="between" align="center">
                <Flex>
                  <Text style={styles.manageButtonFont}>จัดการ</Text>
                  <Text style={[styles.manageButtonFont, { color: Colors.adminary }]}>รายงาน</Text>
                </Flex>
                <Entypo name="chevron-right" size={24} color={Colors.adminary} />
              </Flex>
            </TouchableOpacity>
          </Flex>
        </Flex>
        <View style={styles.line}></View>
        <View style={styles.boxContainer}>
          <Flex style={{ width: "100%", gap: 10, marginVertical: 10, paddingHorizontal: 3, marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>สถิติ</Text>
            <MaterialCommunityIcons name="presentation" size={28} color="white" />
            <View style={styles.dottedLine2}></View>
          </Flex>
          <Flex style={{ gap: 20, marginBottom: 14 }}>
            <View style={styles.problemBox}>
              <Text>ยังไม่แก้ไข</Text>
              <Flex align="center" style={{ gap: 5 }}>
                <AntDesign name="warning" size={20} color={Colors.warning} />
                <Text style={{ color: Colors.warning, fontWeight: "bold", fontSize: 16 }}>560 ปัญหา</Text>
              </Flex>
            </View>
            <View style={styles.problemBox}>
              <Text>กำลังดำเนินการ</Text>
              <Flex align="center" style={{ gap: 5 }}>
                <Ionicons name="flash-outline" size={20} color={Colors.success} />
                <Text style={{ color: Colors.success, fontWeight: "bold", fontSize: 16 }}>560 ปัญหา</Text>
              </Flex>
            </View>
          </Flex>
          <Flex style={{ gap: 20, marginBottom: 14 }}>
            <View style={styles.problemBox}>
              <Text>แก้ไขแล้ว</Text>
              <Flex align="center" style={{ gap: 5 }}>
                <Octicons name="verified" size={20} color={Colors.gray2} />
                <Text style={{ color: Colors.gray2, fontWeight: "bold", fontSize: 16 }}>560 ปัญหา</Text>
              </Flex>
            </View>
            <View style={styles.problemBox}>
              <Text>ถูกรายงาน</Text>
              <Flex align="center" style={{ gap: 5 }}>
                <Feather name="info" size={20} color="red" />
                <Text style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>100 ปัญหา</Text>
              </Flex>
            </View>
          </Flex>
        </View>
        <View style={styles.line} />
        <View style={styles.boxContainer2}>
          <Text style={{color: Colors.gray2}}>จำนวนปัญหาในแต่ละหมวดหมู่</Text>
          <Text style={{fontSize: 18, fontWeight: "bold"}}>สถิตจำนวนปัญหาแยกตามหมวดหมู่</Text>
          {/* <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.45}
            coverFill={'#FFF'}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  boxContainer: {
    backgroundColor: Colors.adminary_sub,
    paddingHorizontal: 12,
    paddingVertical: 15,
    paddingBottom: 20,
    marginHorizontal: 2.5,
    borderRadius: 15,
    marginVertical: 25,
  },
  boxContainer2: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 2.5,
    borderRadius: 15,
    marginVertical: 25,
    shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
    shadowColor: "black", // Color of the shadow
    shadowOpacity: 0.1, // Opacity of the shadow (0 to 1)
    shadowRadius: 3, // Radius of the shadow blur
  },
  problemBox: {
    flex: 1,
    gap: 3,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
  },
  dottedLine: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    width: "100%",
  },
  dottedLine2: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "white",
    width: 230,
  },
  manageButtonFont: {
    fontSize: 16,
    fontWeight: "bold",
  },
  manageButton: {
    borderColor: Colors.adminary,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    height: 100,
    justifyContent: "center",
    alignContent: "center",
    width: 160,
  },
  line: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.gray4,
    width: "100%",
  },
});

export default DashboardScreen;
