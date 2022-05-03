import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GetUser } from '../../api/comments';

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

const Followings = ({route}) => {
    console.log(route.params.followList)
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Show Following</Text>
            {route.params.followList?.map((user, idx) => {
                return (
                    <Text>{user.id}</Text>
                )
            })}
        </View>
    )
}

const FollowersScreen = ({route, navigation}) => {

    const [followList, setFollowList] = React.useState()

    React.useEffect(() => {
        LoadUsers();
        console.log(route.params.profileScreen)
      }, []);

    const LoadUsers = async () => {
        const user = await GetUser(route.params.id);
        setFollowList(user.following);
    }

    const Following = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {followList?.map((user, idx) => {
                    return (
                        <TouchableOpacity key={idx} onPress={() => navigation.push(route.params.profileScreen, { user: user}) }>
                            <Text style={{margin: '2%', borderWidth: 2, paddingHorizontal: '30%'}}>{user.username}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    return (
            <Tab.Navigator>
                <Tab.Screen name="Following" component={Following}/>
                <Tab.Screen name="Followers" component={Followers} />
            </Tab.Navigator>
    )
}
export default FollowersScreen;