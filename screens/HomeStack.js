import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import CommentSection from './CommentScreens/CommentSection';
import FullScreenImage from './PollScreens/FullScreenImage';
import PollView from './PollScreens/PollView';

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal"
          }}
        >
          <Stack.Screen 
            options={{headerShown: false}} name="Home" component={HomeScreen}
            screenOptions={{
              transitionSpec: {
                open: config,
                close: config,
              }
            }}
            />
          <Stack.Screen name="Comments" component={CommentSection} />
          <Stack.Screen name="FullScreen" component={FullScreenImage} options={{ headerShown: false}} />
          <Stack.Screen name="PollFromSearch" component={PollView} options={{ headerShown: false}} />
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