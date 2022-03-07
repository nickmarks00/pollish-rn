import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {HomeStack, ProfilePage, UserProfileScreen} from '../screens';
import CreateStack from '../screens/CreatePollScreens/CreateStack';
import {SearchStack} from '../screens/SearchScreens';

const Tab = createBottomTabNavigator();

const AppNavigator = props => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Feed" component={HomeStack} />
      <Tab.Screen name="Create" component={CreateStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
