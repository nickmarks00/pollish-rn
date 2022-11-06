import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {NavProps, SCREEN_NAMES} from '../../../constants/keys';

const {height, width} = Dimensions.get('window');

type FollowButtonProps = {
  followers: number;
  following: number;
};

type FollowerProps = {
  number: number;
  name: string;
  action: () => void;
};

const Follower = ({number, name, action}: FollowerProps) => {
  return (
    <TouchableOpacity
      onPress={() => action()}
      style={{
        flex: 1,
        borderColor: '#ECEEEE',
        borderWidth: 2,
        borderRadius: height * 0.015,
        justifyContent: 'center',
      }}>
      <Text
        style={{fontSize: 17, fontWeight: 'bold', marginLeft: width * 0.028}}>
        {number}
      </Text>
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          marginLeft: width * 0.028,
          color: '#CCCCCC',
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const FollowButtons = ({followers, following}: FollowButtonProps) => {
  const navigation = useNavigation<NavProps>();

  const followingNav = () => {
    navigation.push(SCREEN_NAMES.FOLLOW, {
      id: 1044,
      title: 'Following',
    });
  };
  const followersNav = () => {
    navigation.push(SCREEN_NAMES.FOLLOW, {
      id: 1044,
      title: 'Followers',
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        height: height * 0.057,
        width: width * 0.9,
        justifyContent: 'center',
      }}>
      <Follower name={'Followers'} number={followers} action={followersNav} />
      <View style={{width: width * 0.042}} />
      <Follower name={'Following'} number={following} action={followingNav} />
    </View>
  );
};

export default FollowButtons;
