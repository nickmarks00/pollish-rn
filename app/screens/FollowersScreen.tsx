import React from 'react';
import {View, FlatList, Dimensions, TextInput} from 'react-native';
// @ts-ignore
import {getFollowers, getFollowing} from 'endpoints/core';
import UserCard from '../components/UserCard';
import {NavProps, SCREEN_NAMES, RootStackParams} from '../constants/keys';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');
/*
    * This component should be a tabbed view displaying followers in one tab and following in the other
    * Users should be able to click on a profile and view it in a new screen
    ! This is unimplemented
*/

import {NativeStackScreenProps} from '@react-navigation/native-stack';

type FollowerProps = NativeStackScreenProps<RootStackParams, 'Followers'>;

const FollowersScreen = ({route}: FollowerProps) => {
  const navigation = useNavigation<NavProps>();
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

  const navToProfile = (user: any) => {
    navigation.push(SCREEN_NAMES.PROFILE, {
      user: user,
      show: true,
      title: user.username,
    });
  };

  const userList = route.params.title ? followList : followerList;

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: height * 0.041,
          width: width * 0.9,
          marginVertical: height * 0.019,
          borderColor: '#CCCCCC',
          borderWidth: 1,
          borderRadius: height * 0.012,
        }}>
        <TextInput
          style={{width: '90%', fontSize: 13, textAlign: 'center'}}
          placeholder="Search your followers..."
        />
      </View>
      <FlatList
        ItemSeparatorComponent={() => {
          return <View style={{height: height * 0.021}} />;
        }}
        data={userList}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <UserCard oUser={item} navToProfile={navToProfile} />
        )}
      />
    </View>
  );
};
export default FollowersScreen;
