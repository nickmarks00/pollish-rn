import React, {useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthUserContext} from './lib/context';
import {useAuthData} from './lib/hooks';

import {
  HomeStack,
  LoginScreen,
  WelcomeScreen,
  RegisterScreen,
  TestingScreen,
  SearchScreen,
  SearchStack,
  UserProfileScreen,
} from './screens';
import CreateStack from './screens/CreatePoll/CreateStack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  const authUser = useAuthData();
  console.log(authUser);
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator>
        <Tab.Screen
          options={{headerShown: false}}
          name="Feed"
          component={HomeStack}
        />
        <Tab.Screen
          name="Create"
          component={CreateStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          options={{headerShown: false}}
          name="Search"
          component={SearchStack}
        />
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen
          options={{headerShown: false}}
          name="Profile"
          component={ProfilePage}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
