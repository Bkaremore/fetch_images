import React,{Component} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Login from '../container/login';
import HomeScreen from "../container/homeScreen";

const Stack = createStackNavigator();

function App(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Home' component={HomeScreen}/>
             </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App;