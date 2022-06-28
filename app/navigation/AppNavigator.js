import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {MaterialIcons, Ionicons} from '@expo/vector-icons';

import HomeStack from '../stacks/HomeStack';
import SearchStack from '../stacks/SearchStack';
import CreationHub from '../screens/CreatePollScreens/CreationHub';
import ProfileStack from '../stacks/ProfileStack';
import TestingSpace from '../screens/Tabs/ProfilePage';
import CommunityTab from '../screens/Tabs/CommunityTab';
import colors from '../config/colors';

const Tab = createBottomTabNavigator();

const AppNavigator = props => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false, tabBarStyle: {
      borderTopWidth: 0.5,
      borderTopColor: '#ccc'
}}}>
      <Tab.Screen name="Feed" component={HomeStack} options={{
                    tabBarIcon: ({ focused }) => (<MaterialCommunityIcons
                      name={"poll"}
                      size={30}
                      color={focused ? colors.secondary : 'black'}
                      style={{borderTopWidth: 1, borderTopColor: 'red'}}
                    />)
                }}/>
      <Tab.Screen name="Community" component={CommunityTab} options={{
                    tabBarIcon: ({ focused }) => (<MaterialCommunityIcons
                      name={focused ? "account-group" : "account-group-outline"}
                      size={30}
                      color={focused ? colors.secondary : 'black'}
                      style={{}}
                    />)
                }}/>
      <Tab.Screen name="Search" component={SearchStack} options={{
                    tabBarIcon: ({focused}) => (<Ionicons
                      name={focused ? "search" : "search-outline"}
                      size={30}
                      color={focused ? colors.secondary : 'black'}
                      style={{}}
                    />)
                }}/>
      <Tab.Screen name="Profile" component={ProfileStack} options={{
                    tabBarIcon: ({focused}) => (<MaterialCommunityIcons
                      name={focused ? "account" : "account-outline"}
                      size={30}
                      color={focused ? colors.secondary : 'black'}
                      style={{}}
                    />)
                }}/>
    </Tab.Navigator>
  );
};

export default AppNavigator;
