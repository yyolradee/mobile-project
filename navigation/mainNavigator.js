import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import screen
import LoginScreen from "../screens/LoginScreen";
import BottomNavigator from "./bottomNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "@ant-design/react-native";
import SearchModal from "../components/SearchModal";

const MainStackNavigator = createNativeStackNavigator();

export default function MainNavigator() {
    return (
        <Provider>
            <SearchModal/>
            <NavigationContainer>
                <MainStackNavigator.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                    <MainStackNavigator.Screen name="Login" component={LoginScreen}/>
                    <MainStackNavigator.Screen name="App" component={BottomNavigator} />
                </MainStackNavigator.Navigator>
            </NavigationContainer>
        </Provider>
    )
}