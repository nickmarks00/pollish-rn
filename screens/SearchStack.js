import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import HomeScreen from './HomeScreen';
import CommentSection from './CommentScreens/CommentSection';
import FullScreenImage from './FullScreenImage';
import PollViewSearch from './PollViewSearch';
import SearchScreen from './SearchScreen';

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
            options={{headerShown: false}} name="Home" component={SearchScreen}
            screenOptions={{
              transitionSpec: {
                open: config,
                close: config,
              }
            }}
            />
          <Stack.Screen name="PollFromSearch" component={PollViewSearch} options={{ headerShown: false}} />
        </Stack.Navigator>
    );
  };

  export default SearchStack;

const ProfileScreen = ({ navigation, route }) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};

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