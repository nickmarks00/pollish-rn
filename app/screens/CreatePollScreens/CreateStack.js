import React from 'react';
import QuestionPage from './CreatePoll';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImagePage from './ImagePage';
import ChoicesPage from './ChoicesPage';

const Stack = createNativeStackNavigator();

const CreateStack = () => {
    return (
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal"
          }}
        >
          <Stack.Screen options={{headerShown: false}} name="1" component={QuestionPage}/>
          <Stack.Screen options={{headerShown: false}} name="2" component={ImagePage}/>
          <Stack.Screen options={{headerShown: false}} name="3" component={ChoicesPage}/>
          </Stack.Navigator>
    );
}

export default CreateStack;