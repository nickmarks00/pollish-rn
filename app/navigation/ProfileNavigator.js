import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {UserProfileScreen} from '../screens/';
import {SettingsScreen} from '../screens/';

const Stack = createNativeStackNavigator();

const ProfileNavigator = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
