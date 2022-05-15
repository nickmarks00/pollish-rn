import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  LoginScreen,
  RegisterScreen,
  WelcomeScreen,
} from '../screens/AuthScreens';

const Stack = createNativeStackNavigator();

const AuthNavigator = props => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
