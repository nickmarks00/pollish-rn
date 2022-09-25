import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import FollowersScreen from '../screens/FollowersScreen';
import PollsScreen from '../screens/Profile/PollsScreen';
import CommentSection from '../screens/CommentSection';
import CommunityList from '../screens/Profile/UserCommunities';
import CommunitiesScreen from '../screens/Community';
import TestingSpace from '../screens/Tabs/ProfilePage';
import SinglePoll from '../screens/SinglePoll';

const Stack = createNativeStackNavigator();

/**
 * The stack for screens accessible from the profile tab
 */

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="P_Profile"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name="P_Profile"
        initialParams={{
          show: false,
          followScreen: 'P_Follow',
          singlePollScreen: 'P_Poll',
          pollListScreen: 'P_PollList',
          communityListScreen: 'P_CommunityList',
        }}
        options={({route}) => ({
          headerShown: route.params.show ? true : false,
          contentStyle: {backgroundColor: '#FFF'},
          title: route.params.title
        })}
        component={TestingSpace}
      />
      <Stack.Screen
        name="P_Follow"
        initialParams={{profileScreen: 'P_Profile'}}
        options={({route}) => ({
          title: route.params.title,
          contentStyle: {backgroundColor: '#FFF'},
        })}
        component={FollowersScreen}
      />
      <Stack.Screen
        name="P_PollList"
        initialParams={{pollScreen: 'P_Poll'}}
        component={PollsScreen}
        options={({route}) => ({
          title: 'Polls',
          headerShown: true,
    })}
      />
      <Stack.Screen
        name="P_Poll"
        initialParams={{
          commentsScreen: 'P_Comments',
          profileScreen: 'P_Profile',
        }}
        options={{title: '', headerBackTitle: 'Back'}}
        component={SinglePoll}
      />
      <Stack.Screen
        name="P_Comments"
        initialParams={{profileScreen: 'P_Profile'}}
        component={CommentSection}
        options={({route}) => ({
          title: '',
          headerShown: true,
    })}
      />
      <Stack.Screen
        name="P_CommunityList"
        initialParams={{communityScreen: 'P_Community'}}
        component={CommunityList}
        options={({route}) => ({
          title: route.params.title,
          headerShown: true,
    })}
      />
      <Stack.Screen
        name="P_Community"
        initialParams={{pollScreen: 'P_Poll'}}
        component={CommunitiesScreen}
        options={({route}) => ({
          title: route.params.title,
          headerShown: true,
    })}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
