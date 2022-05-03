import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import CommentSection from './CommentScreens/CommentSection';
import PollView from './PollScreens/PollView';
import ProfilePage from './ProfileScreens/ProfilePage';
import FollowersScreen from '../screens/ProfileScreens/FollowersScreen'
import PollsScreen from './ProfileScreens/PollsScreen';
import CommunityList from './ProfileScreens/CommunityList';
import PollViewSearch from './SearchScreens/PollViewSearch';
import CommunitiesScreen from './ProfileScreens/CommunitiesScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {

    const navComments = ({post}) => {
      const navigation = useNavigation();
      navigation.navigate('Comments', { post: post})
    }

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
            options={{headerShown: false}} name="Home" component={HomeScreen}
            screenOptions={{
              transitionSpec: {
                open: config,
                close: config,
              }
            }}
            />
          <Stack.Screen name="H_Comments" component={CommentSection} initialParams={{profileScreen: 'H_Profile'}} options={{headerShown: false}} />
          <Stack.Screen name="H_Poll" initialParams={{commentsScreen: 'H_Comments', profileScreen: 'H_Profile'}} component={PollViewSearch}/>
          <Stack.Screen name="H_Profile" initialParams={{followScreen: 'H_Follow', pollListScreen: 'H_PollList', communityListScreen: 'H_CommunityList'}} component={ProfilePage} options={{ headerShown: true}}/>
          <Stack.Screen name="H_Follow" initialParams={{profileScreen: 'H_Profile'}} options={{contentStyle: {backgroundColor: '#FFF'}}} component={FollowersScreen} />
          <Stack.Screen name="H_PollList" initialParams={{pollScreen: 'H_Poll'}} component={PollsScreen}/>
          <Stack.Screen name="H_CommunityList" initialParams={{communityScreen: 'H_Community'}} component={CommunityList} />
          <Stack.Screen name="H_Community" initialParams={{pollScreen: 'H_Poll'}} component={CommunitiesScreen} />
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