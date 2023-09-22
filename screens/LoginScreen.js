import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
// import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={{ color: "#fff", fontSize: 60, fontWeight: "bold", marginBottom: -10 }}>
          KMITL
        </Text>
        <Text style={{ fontSize: 40, fontWeight: "bold"}}>Trouble</Text>
        <Text style={{ color: "#fff", marginTop: 10 }}>
          แจ้งปัญหาที่คุณประสบในพื้นที่
        </Text>
        <Text style={{ color: "#fff" }}>
          สถาบันพระจอมเกล้าเจ้าคุณทหารลาดกระบังได้ที่นี่
        </Text>
      </View>
      <View style={styles.activeArea}>
        <Text style={{ fontSize: 20 }}>ยืนยันตัวตนด้วยบริการของ Google</Text>
        <Text style={{ color: Colors.gray2, marginVertical: 9 }}>
          โดยใช้ email account ของสถาบัน
        </Text>
        <Button
          title="LOGIN"
          onPress={() => {
            navigation.replace("App");
          }}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  activeArea: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 350,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      height: -5,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
  },
});

export default LoginScreen;
