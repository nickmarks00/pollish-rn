import React from 'react';
import {StyleSheet} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {EmailSentScreen, SendResetEmailScreen} from '../screens/AuthScreens';

const Stack = createNativeStackNavigator();

const ResetPasswordStack = () => {
  return (
    <Stack.Navigator
      name="resetPassword"
      initialRouteName="Add Email"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
      }}>
      <Stack.Screen name="Add Email" component={SendResetEmailScreen} />
      <Stack.Screen name="Sent Email" component={EmailSentScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ResetPasswordStack;
