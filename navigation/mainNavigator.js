import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import screen
import LoginScreen from "../screens/LoginScreen";
import BottomNavigator from "./bottomNavigator";
import { NavigationContainer } from "@react-navigation/native";

const MainStackNavigator = createNativeStackNavigator();

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <MainStackNavigator.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <MainStackNavigator.Screen name="Login" component={LoginScreen}/>
                <MainStackNavigator.Screen name="App" component={BottomNavigator} />
            </MainStackNavigator.Navigator>
        </NavigationContainer>
    )
}