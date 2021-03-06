import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../screens/Tabs/SearchScreen';
import ProfilePage from '../screens/Tabs/ProfilePage';
import CommunitiesScreen from '../screens/Community';
import FollowersScreen from '../screens/Profile/FollowersScreen';
import CommentSection from '../screens/CommentSection';
import PollsScreen from '../screens/Profile/PollsScreen';
import CommunityList from '../screens/Profile/UserCommunities';
import SinglePoll from '../screens/SinglePoll';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeSearch"
        component={SearchScreen}
        screenOptions={{
          transitionSpec: {open: config, close: config},
        }}
      />
      <Stack.Screen
        name="S_Profile"
        initialParams={{
          followScreen: 'S_Follow',
          pollListScreen: 'S_PollList',
          communityListScreen: 'S_CommunityList',
        }}
        options={({route}) => ({
          title: route.params.title,
          contentStyle: {backgroundColor: '#FFF'},
        })}
        component={ProfilePage}
      />
      <Stack.Screen
        name="S_Community"
        initialParams={{pollScreen: 'S_Poll'}}
        component={CommunitiesScreen}
        options={({route}) => ({
          title: route.params.title,
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="S_Follow"
        initialParams={{profileScreen: 'S_Profile'}}
        options={{contentStyle: {backgroundColor: '#FFF'}}}
        component={FollowersScreen}
      />
      <Stack.Screen
        name="S_Comments"
        initialParams={{profileScreen: 'S_Profile'}}
        component={CommentSection}
      />
      <Stack.Screen
        name="S_PollList"
        initialParams={{pollScreen: 'S_Poll'}}
        options={({route}) => ({
          title: route.params.title,
        })}
        component={PollsScreen}
      />
      <Stack.Screen
        name="S_Poll"
        initialParams={{
          commentsScreen: 'S_Comments',
          profileScreen: 'S_Profile',
        }}
        options={{title: ''}}
        component={SinglePoll}
      />
      <Stack.Screen
        name="S_CommunityList"
        initialParams={{communityScreen: 'S_Community'}}
        component={CommunityList}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
