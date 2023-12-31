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
import {
  fetchCategories,
  fetchFollowLocations,
  fetchPosts,
  fetctLocations,
} from "../store/actions/dataAction";
import { getUserById } from "../data/users/usersController";
import CreatePostNavigator from "./createPostStackNavigator";
import { navigationRef } from '../constants/navigationService';
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../data/firebaseConfig";

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
        dispatch(await fetchFollowLocations(userLocalInfo.uid));
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

  let renderCreatePost = (
    <MainStackNavigator.Screen
      name="CreatePostScreen"
      component={CreatePostNavigator}
      options={{
        tabBarStyle: {
          display: "none",
        },
        headerShown: false,
      }}
    />
  );

  return (
    <Provider>
      <DrawerModal
        contents={
          <NavigationContainer ref={navigationRef}>
            <SearchModal />
            <MainStackNavigator.Navigator
              initialRouteName="App"
              screenOptions={{ headerShown: false }}
            >
              <MainStackNavigator.Screen
                name="App"
                component={BottomNavigator}
              />
              {renderCreatePost}
            </MainStackNavigator.Navigator>
          </NavigationContainer>
        }
      />
    </Provider>
  );
}
