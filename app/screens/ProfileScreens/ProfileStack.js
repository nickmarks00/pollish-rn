import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FollowersScreen from './FollowersScreen';
import ProfilePage from './ProfilePage';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
            <Stack.Navigator initialRouteName='Profile'
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
              }}>
                <Stack.Screen options={{headerShown: false, contentStyle: {backgroundColor: '#FFF'}}} name="ProfileHome" component={ProfilePage} />
                <Stack.Screen options={{contentStyle: {backgroundColor: '#FFF'}}} name="Follow" component={FollowersScreen} />
            </Stack.Navigator>
    )
}
export default ProfileStack;