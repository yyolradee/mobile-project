import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { setUserInfo } from "../store/actions/userAction";

//import screen
import BottomNavigator from "./bottomNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "@ant-design/react-native";
import { useDispatch, useSelector } from "react-redux";

const MainStackNavigator = createNativeStackNavigator();

export default function MainNavigator(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserInfo(props.userLocalInfo));
  }, []);

  useSelector((state) => {
    console.log(JSON.stringify(state.user.userInfo, null, 2));
  });
  return (
    <Provider>
      <NavigationContainer>
        <MainStackNavigator.Navigator initialRouteName="App" screenOptions={{ headerShown: false }}>
          <MainStackNavigator.Screen name="App" component={BottomNavigator} />
        </MainStackNavigator.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
