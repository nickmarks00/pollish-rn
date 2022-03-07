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
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
