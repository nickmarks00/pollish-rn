import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {HomeStack} from '../screens';
import CreatePoll from '../screens/CreatePollScreens/CreatePoll';
import {SearchStack} from '../screens/SearchScreens';
import ProfileNavigator from '../navigation/ProfileNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = props => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Feed" component={HomeStack} />
      <Tab.Screen name="Create" component={CreatePoll} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
