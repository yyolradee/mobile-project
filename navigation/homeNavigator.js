import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Flex } from "@ant-design/react-native";
import headerCustomTitle from "../constants/headerCustomtitle";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearch } from "../store/actions/searchAction";
import PostScreen from "../screens/PostScreen";
import LocationScreen from "../screens/LocationScreen";

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
  const dispatch = useDispatch();
  const searchIsVisible = useSelector((state) => state.search.searchIsVisible);

  const toggleSearchModal = () => {
    return dispatch(toggleSearch(!searchIsVisible));
  };

  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "",
          headerLeft: ({ color, size, focused }) => {
            color = "black";
            size = 24;
            return (
              <Flex align="center" style={{ gap: 16 }}>
                <TouchableOpacity
                  onPress={() => {
                    return this.drawer && this.drawer.openDrawer();
                  }}
                >
                  <Feather name="menu" size={size} color={color} />
                </TouchableOpacity>
                {headerCustomTitle()}
              </Flex>
            );
          },
          headerRight: ({ color, size, focused }) => {
            color = Colors.gray2;
            size = 24;
            return (
              <TouchableOpacity onPress={toggleSearchModal}>
                <Ionicons name="search" size={size} color={color} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <HomeStack.Screen
        name="Location"
        component={LocationScreen}
        options={{
          headerTitle: "",
          headerTintColor: "#000",
          headerRight: ({ color, size, focused }) => {
            color = "black";
            size = 24;
            return (
              <Flex style={{ gap: 10 }}>
                <TouchableOpacity onPress={toggleSearchModal}>
                  <Ionicons name="search" size={size} color={Colors.gray2} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    return this.drawer && this.drawer.openDrawer();
                  }}
                >
                  <Feather name="menu" size={size} color={color} />
                </TouchableOpacity>
              </Flex>
            );
          },
        }}
      />
      <HomeStack.Screen
        name="inPost"
        component={PostScreen}
        options={{ headerTitle: headerCustomTitle }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
