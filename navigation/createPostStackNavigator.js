import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//import screen
import CreatePostScreen from "../screens/CreatePostScreen";
import CreatePostDetailScreen from "../screens/CreatePostDetailScreen";

const CreatePostStack = createNativeStackNavigator();

export default function CreatePostNavigator(){
    return (
        <CreatePostStack.Navigator initialRouteName="content" screenOptions={{headerShown: false}}>
            <CreatePostStack.Screen name="content" component={CreatePostScreen} />
            <CreatePostStack.Screen name="detail" component={CreatePostDetailScreen} />
        </CreatePostStack.Navigator>
    )
}