import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FollowersScreen from '../screens/Profile/FollowersScreen';
import PollsScreen from '../screens/Profile/PollsScreen';
import CommentSection from '../screens/CommentSection';
import CommunityList from '../screens/Profile/UserCommunities';
import CommunitiesScreen from '../screens/Community';
import TestingSpace from '../screens/Tabs/ProfilePage';
import SinglePoll from '../screens/SinglePoll';
import CommunityTab from '../screens/Tabs/CommunityTab';

const Stack = createNativeStackNavigator();

/**
 * The stack for screens accessible from the profile tab
 */

const CommunityStack = () => {
  
    return (
            <Stack.Navigator initialRouteName='C_CommunityHome'
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
              }}>
                <Stack.Screen name="C_CommunityHome" initialParams={{communityScreen: 'C_Community'}} component={CommunityTab} options={{headerShown: false}}/>
                <Stack.Screen name="C_Profile" initialParams={{ show: false, followScreen: 'C_Follow', pollListScreen: 'C_PollList', communityListScreen: 'C_CommunityList'}} options={({ route }) => ({headerShown: route.params.show ? true: false, contentStyle: {backgroundColor: '#FFF'}})} component={TestingSpace} />
                <Stack.Screen name="C_Follow" initialParams={{profileScreen: 'C_Profile'}} options={({ route }) => ({ title: route.params.title, contentStyle: {backgroundColor: '#FFF'}})} component={FollowersScreen} />
                <Stack.Screen name="C_PollList" initialParams={{pollScreen: 'C_Poll'}} component={PollsScreen}/>
                <Stack.Screen name="C_Poll" initialParams={{commentsScreen: 'C_Comments', profileScreen: 'C_Profile'}} component={SinglePoll}/>
                <Stack.Screen name="C_Comments" initialParams={{profileScreen: 'C_Profile'}} component={CommentSection}/>
                <Stack.Screen name="C_CommunityList" initialParams={{communityScreen: 'C_Community'}} component={CommunityList} />
                <Stack.Screen name="C_Community" initialParams={{pollScreen: 'C_Poll'}} component={CommunitiesScreen} />
            </Stack.Navigator>
    )
}

export default CommunityStack;