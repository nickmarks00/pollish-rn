import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import HomeScreen from './HomeScreen';
import CommentSection from './CommentSection';

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
          <Stack.Screen name="Comments" component={CommentSection} />
        </Stack.Navigator>
    );
  };

  export default MyStack;

const ProfileScreen = ({ navigation, route }) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};