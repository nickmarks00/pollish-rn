import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import CreatePollScreen from './screens/CreatePollScreen';
import CommentSection from './screens/CommentSection';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={HomeScreen} />
        <Tab.Screen name="Create" component={CreatePollScreen} />
        <Tab.Screen name="Comments" component={CommentSection} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
