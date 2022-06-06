import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import HomeStack from '../stacks/HomeStack';
import SearchStack from '../stacks/SearchStack';
import CreationHub from '../screens/CreatePollScreens/CreationHub';
import ProfileStack from '../stacks/ProfileStack';
import TestingSpace from '../screens/ProfilePage';

const Tab = createBottomTabNavigator();

const AppNavigator = props => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false, tabBarStyle: {
      borderTopWidth: 0.5,
      borderTopColor: '#ccc'
}}}>
      <Tab.Screen name="Feed" component={HomeStack} options={{
                    tabBarActiveBackgroundColor: 'blue',
                    tabBarIcon: () => (<MaterialCommunityIcons
                      name={"home-variant-outline"}
                      size={30}
                      color={'black'}
                      style={{borderTopWidth: 1, borderTopColor: 'red'}}
                    />)
                }}/>
      <Tab.Screen name="Create" component={CreationHub} options={{
                    tabBarIcon: () => (<MaterialCommunityIcons
                      name={"plus-circle-outline"}
                      size={30}
                      color={'black'}
                      style={{}}
                    />)
                }}/>
      <Tab.Screen name="Search" component={SearchStack} options={{
                    tabBarIcon: () => (<MaterialCommunityIcons
                      name={"magnify"}
                      size={30}
                      color={'black'}
                      style={{}}
                    />)
                }}/>
      <Tab.Screen name="Profile" component={ProfileStack} options={{
                    tabBarIcon: () => (<MaterialCommunityIcons
                      name={"account"}
                      size={30}
                      color={'black'}
                      style={{}}
                    />)
                }}/>
    </Tab.Navigator>
  );
};

export default AppNavigator;
