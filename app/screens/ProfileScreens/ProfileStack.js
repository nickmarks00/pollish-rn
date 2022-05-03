import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FollowersScreen from './FollowersScreen';
import ProfilePage from './ProfilePage';
import PollsScreen from './PollsScreen';
import PollViewSearch from '../SearchScreens/PollViewSearch';
import CommentSection from '../CommentScreens/CommentSection';
import CommunityList from './CommunityList';
import CommunitiesScreen from './CommunitiesScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
            <Stack.Navigator initialRouteName='P_Profile'
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
              }}>
                <Stack.Screen name="P_Profile" initialParams={{followScreen: 'P_Follow', pollListScreen: 'P_PollList', communityListScreen: 'P_CommunityList'}} options={{headerShown: false, contentStyle: {backgroundColor: '#FFF'}}} component={ProfilePage} />
                <Stack.Screen name="P_Follow" initialParams={{profileScreen: 'P_Profile'}} options={{contentStyle: {backgroundColor: '#FFF'}}} component={FollowersScreen} />
                <Stack.Screen name="P_PollList" initialParams={{pollScreen: 'P_Poll'}} component={PollsScreen}/>
                <Stack.Screen name="P_Poll" initialParams={{commentsScreen: 'P_Comments', profileScreen: 'P_Profile'}} component={PollViewSearch}/>
                <Stack.Screen name="P_Comments" initialParams={{profileScreen: 'P_Profile'}} component={CommentSection}/>
                <Stack.Screen name="P_CommunityList" initialParams={{communityScreen: 'P_Community'}} component={CommunityList} />
                <Stack.Screen name="P_Community" initialParams={{pollScreen: 'P_Poll'}} component={CommunitiesScreen} />
            </Stack.Navigator>
    )
}
export default ProfileStack;