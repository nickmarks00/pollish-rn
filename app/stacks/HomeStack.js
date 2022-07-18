import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Tabs/HomeScreen';
import CommentSection from '../screens/CommentSection';
import FollowersScreen from '../screens/Profile/FollowersScreen'
import PollsScreen from '../screens/Profile/PollsScreen';
import CommunityList from '../screens/Profile/UserCommunities';
import CommunitiesScreen from '../screens/Community';
import TestingSpace from '../screens/Tabs/ProfilePage';
import SinglePoll from '../screens/SinglePoll';
import FeedScreen from '../screens/Tabs/FeedScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {

    return (
        <Stack.Navigator
          name='main'
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal",
          }}
        >
          <Stack.Screen
            initialParams={{commentsScreen: 'H_Comments', profileScreen: 'H_Profile'}}
            options={{headerShown: false}} name="Home" component={FeedScreen}
            screenOptions={{ transitionSpec: { open: config, close: config } }}
          />
          <Stack.Screen name="H_Comments" component={CommentSection} initialParams={{profileScreen: 'H_Profile'}} options={{headerShown: true, title: '', headerBackTitle: 'Poll'}} />
          <Stack.Screen name="H_Poll" component={SinglePoll} initialParams={{commentsScreen: 'H_Comments', profileScreen: 'H_Profile'}} options={{title: '', headerBackTitle: 'Back'}}/>
          <Stack.Screen name="H_Profile" initialParams={{followScreen: 'H_Follow', pollListScreen: 'H_PollList', communityListScreen: 'H_CommunityList'}} component={TestingSpace} 
            options={({route}) => ({
              title: route.params.title,
              headerShown: true,
        })}/>
          <Stack.Screen name="H_Follow" initialParams={{profileScreen: 'H_Profile'}} component={FollowersScreen} options={({route}) => ({
              title: route.params.title,
              headerShown: true,
              contentStyle: {backgroundColor: '#FFF'}
        })} />
          <Stack.Screen name="H_PollList" component={PollsScreen} initialParams={{pollScreen: 'H_Poll'}} options={({route}) => ({
              title: route.params.title,
              headerShown: true,
        })}/>
          <Stack.Screen name="H_CommunityList" component={CommunityList} initialParams={{communityScreen: 'H_Community'}}  />
          <Stack.Screen name="H_Community" component={CommunitiesScreen} initialParams={{pollScreen: 'H_Poll'}} options={({route}) => ({
              title: route.params.title,
              headerShown: true,
        })} />
        </Stack.Navigator>
    );
  };

export default MyStack;

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  }
}