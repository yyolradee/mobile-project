import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { setUserInfo } from "../store/actions/userAction";

//import screen
import BottomNavigator from "./bottomNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "@ant-design/react-native";
import { useDispatch, useSelector } from "react-redux";
import SearchModal from "../components/SearchModal";
import DrawerModal from "../components/DrawerComponant/DrawerModal";
import { fetchCategories, fetchPosts, fetctLocations } from "../store/actions/dataAction";
import { getUserById } from "../data/users/usersController";

const MainStackNavigator = createNativeStackNavigator();

export default function MainNavigator(props) {
  const dispatch = useDispatch();
  const userLocalInfo = props.userLocalInfo;
  const [getUser, setGetUser] = useState(null);
  let check = true;
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserById(userLocalInfo.uid, setGetUser);
        dispatch(await fetchCategories());
        dispatch(await fetchPosts());
        dispatch(await fetctLocations());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    console.log("login");
  }, []);

  useEffect(() => {
    if (getUser && check) {
      dispatch(setUserInfo({ ...userLocalInfo, ...getUser }));
      check = !check;
    }
  }, [getUser]);

  return (
    <Provider>
      <DrawerModal
        contents={
          <NavigationContainer>
            <SearchModal />
            <MainStackNavigator.Navigator initialRouteName="App" screenOptions={{ headerShown: false }}>
              <MainStackNavigator.Screen name="App" component={BottomNavigator} />
            </MainStackNavigator.Navigator>
          </NavigationContainer>
        }
      />
    </Provider>
  );
}
