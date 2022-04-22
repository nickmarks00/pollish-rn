import React from 'react';
import { View, Text, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

/*
    * This component should be a tabbed view displaying followers in one tab and following in the other
    * Users should be able to click on a profile and view it in a new screen
    ! This is unimplemented
*/

const Tab = createMaterialTopTabNavigator();

const Followers = () => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Show Followers</Text></View>
    )
}

const Following = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Show Following</Text></View>
    )
}

const FollowersScreen = ({setFollowers}) => {
    return (
        <View style={{flex: 1, marginTop: 40}}>
            <Button onPress={() => setFollowers(false)} title={"CLOSE"}/>
            <Tab.Navigator>
                <Tab.Screen name="Following" component={Following} />
                <Tab.Screen name="Followers" component={Followers} />
            </Tab.Navigator>
        </View>
    )
}
export default FollowersScreen;