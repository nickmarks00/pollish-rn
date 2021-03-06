import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { getFollowers, getFollowing } from 'endpoints/core';
import UserCard from '../../components/userCard';
/*
    * This component should be a tabbed view displaying followers in one tab and following in the other
    * Users should be able to click on a profile and view it in a new screen
    ! This is unimplemented
*/

const Tab = createMaterialTopTabNavigator();

const Followers = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Show Followers</Text>
    </View>
  );
};

const Followings = ({route}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Show Following</Text>
      {route.params.followList?.map((user, idx) => {
        return <Text>{user.id}</Text>;
      })}
    </View>
  );
};

const FollowersScreen = ({route, navigation}) => {
  const [followList, setFollowList] = React.useState();
  const [followerList, setFollowerList] = React.useState();

  React.useEffect(() => {
    LoadUsers();
    LoadFollowers();
  }, []);

  const LoadUsers = async () => {
    const following = await getFollowing(route.params.id);
    setFollowList(following.data);
  };

  const LoadFollowers = async () => {
    const data = await getFollowers(route.params.id);
    setFollowerList(data.data);
  };

  const Following = ({route, navigation}) => {

    const navToProfile = (user) => {
      navigation.push(route.params.profileScreen, {user: user, show: true, title: user.username})
    }

    if(route.params.fers)
      return (
        <View style={{flex: 1, marginTop: '3%', alignItems: 'center'}}>
          {followList?.map((user, idx) => {
            return (
              <UserCard key={idx} oUser={user} navToProfile={navToProfile}/>
            );
          })}
        </View>
      );
    else
      return (
        <View style={{flex: 1, marginTop: '3%', alignItems: 'center'}}>
          {followerList?.map((user, idx) => {
            return (
              <UserCard key={idx} oUser={user} navToProfile={navToProfile}/>
            );
          })}
        </View>
      );

  };

  return (
    <Tab.Navigator>
      <Tab.Screen name="Following" component={Following} initialParams={{fers: true, profileScreen: route.params.profileScreen}}/>
      <Tab.Screen name="Followers" component={Following} initialParams={{fers: false, profileScreen: route.params.profileScreen}}/>
    </Tab.Navigator>
  );
};
export default FollowersScreen;
