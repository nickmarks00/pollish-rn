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
    <AuthUserContext.Provider value={authUser}>
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
          <Tab.Screen name="Register" component={RegisterScreen} />
          <Tab.Screen name="Testing" component={TestingScreen} />
          <Tab.Screen name="Profile" component={UserProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthUserContext.Provider>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Welcome" component={WelcomeScreen} />
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //     <Stack.Screen name="Register" component={RegisterScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
