import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import PollViewSearch from './PollViewSearch';
import SearchScreen from './SearchScreen';
import ProfilePage from '../ProfileScreens/ProfilePage';
import CommunitiesScreen from '../ProfileScreens/CommunitiesScreen';
import FollowersScreen from '../ProfileScreens/FollowersScreen';
import CommentSection from '../CommentScreens/CommentSection';
import PollView from '../PollScreens/PollView';


const Stack = createNativeStackNavigator();

const SearchStack = () => {
    return (
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal"
          }}
        >
          <Stack.Screen 
            options={{headerShown: false}} name="HomeSearch" component={SearchScreen}
            screenOptions={{
              transitionSpec: {
                open: config,
                close: config,
              }
            }}
            />
          <Stack.Screen name="S_Comments" initialParams={{profileScreen: 'S_Profile'}} component={CommentSection}/>
          <Stack.Screen name="PollFromSearch" initialParams={{commentsScreen: 'S_Comments', profileScreen: 'S_Profile'}}  component={PollViewSearch} options={{ headerShown: false}} />
          <Stack.Screen name="S_Profile" initialParams={{followScreen: 'S_Follow'}} options={{headerShown: false, contentStyle: {backgroundColor: '#FFF'}}}  component={ProfilePage} />
          <Stack.Screen name="S_Community" component={CommunitiesScreen}/>
          <Stack.Screen name="S_Follow" initialParams={{profileScreen: 'S_Profile'}}  component={FollowersScreen}/>
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
  }
}