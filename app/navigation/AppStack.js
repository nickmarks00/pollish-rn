import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PollView from '../screens/PollView';
import CommentSection from '../screens/CommentSection';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const AppStack = ({post}) => {
  console.log("this: " + post)
    return (
      <View style={{flex: 1}}>
        <Text>hi</Text>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal",
          }}
          initialRouteName='Home'
        >
            <Stack.Screen 
            options={{headerShown: false}} name="Home" component={PollView} initialParams = {{ post: post}}
            />
            <Stack.Screen name="Comments" component={CommentSection} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
      <Text>bye</Text>
      </View>
    )
}
export default AppStack;