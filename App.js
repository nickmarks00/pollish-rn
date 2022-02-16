import * as React from 'react';
import {NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeStack from './screens/HomeStack';
import CreateStack from './screens/CreatePoll/CreateStack';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import TestingScreen from './screens/TestSpace';
import SearchScreen from './screens/SearchScreen';
import SearchStack from './screens/SearchStack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator>
        <Tab.Screen options={{headerShown: false}} name="Feed" component={HomeStack} />
        <Tab.Screen name="Create" component={CreateStack} options={{headerShown: false}} />
        <Tab.Screen options={{headerShown: false}} name="Search" component={SearchStack}/>
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Testing" component={TestingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Welcome" component={WelcomeScreen} />
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //     <Stack.Screen name="Register" component={RegisterScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
