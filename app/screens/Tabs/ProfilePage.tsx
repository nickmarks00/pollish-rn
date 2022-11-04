import React from 'react';
import {View, Dimensions, ScrollView, Text} from 'react-native';
import {useEffect} from 'react';
import Loader from '../../components/Loader';
import Constants from 'expo-constants';
import SectionHeader from '../../components/SectionHeader';

import {
  getFollowers,
  getFollowing,
  getUserPolls,
  checkFollowing,
  followUser,
  getUser,
} from 'endpoints/core';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Poll from '../ProfilePage/subComponents/Poll';
import FollowButtons from '../ProfilePage/subComponents/FollowButtons';
import ProfilePic from '../../components/ProfilePic';
import ProfileButtons from '../ProfilePage/subComponents/ProfileButtons';
import Button from '../../components/Button';
import PVV from '../ProfilePage/subComponents/PVV';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/AppNavigator';
import {SCREEN_NAMES} from '../../constants/keys';

const dimensions = Dimensions.get('screen');
const {height, width} = Dimensions.get('screen');

// type Props = NativeStackScreenProps<RootStackParams, 'Profile'>;

const ProfilePage = ({route}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // @ts-ignore
  const {user, logOut} = useAuth();
  const [followers, setFollowers] = React.useState(0);
  const [following, setFollowing] = React.useState(0);
  const [polls, setPolls] = React.useState([]);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);

  const isMe: boolean = route.params?.user ? false : true;
  const currentUser = route.params?.user ?? user;

  const [newProfilePic, setProfilepic] = React.useState();

  // Load User Information
  useEffect(() => {
    const getInitialData = async () => {
      const profile = await getUser(user.id);
      setProfilepic(profile.data);
      findFollowers();
      findFollowing();
      findPolls();

      if (!isMe) checkFollow();
    };

    if (isFocused) getInitialData();
  }, [isFocused]);

  const checkFollow = async () => {
    const data = await checkFollowing(user.id, currentUser.id);
    setIsFollowing(data.data);
  };

  const findFollowers = async () => {
    const data = await getFollowers(currentUser.id);
    setFollowers(data.data.length);
  };

  const findFollowing = async () => {
    const data = await getFollowing(currentUser.id);
    setFollowing(data.data.length);
  };

  const findPolls = async () => {
    const data = await getUserPolls(currentUser.id);
    setPolls(data.data.results);
  };

  const navToFollowers = (name: string) => {
    navigation.push(SCREEN_NAMES.FOLLOW, {
      id: currentUser.id,
      title: name,
    });
  };

  const navToCommList = () => {
    navigation.push(SCREEN_NAMES.FOCUS_LIST, {
      id: route.params?.user ? route.params.user.id : user.id,
    });
  };

  const navToSettings = () => {
    navigation.push(SCREEN_NAMES.SETTINGS);
  };

  const navToPoll = (id: number) => {
    navigation.push(SCREEN_NAMES.POLL, {
      id: id,
    });
  };

  const follow = async () => {
    if (route.params?.user) {
      const follow = await checkFollowing(user.id, route.params.user.id);
      const data = await followUser(user.id, route.params.user.id, follow.data);
      setIsFollowing(!follow.data);
    }
  };

  const navToScreen = () => {
    navigation.push(SCREEN_NAMES.POLL_LIST, {
      id: currentUser.id,
    });
  };

  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <Loader visible={updating} />

      {isMe && <View style={{height: Constants.statusBarHeight}} />}

      {/* Header */}
      {isMe && (
        <SectionHeader
          name={route.params?.user ? route.params.user.username : 'My Profile'}
        />
      )}

      <View style={{height: height * 0.02}} />

      {/* Profile Image */}
      <View
        style={{
          flexDirection: 'row',
          height: height * 0.167,
          width: width * 0.9,
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <ProfilePic
            profileHeight={null}
            user={newProfilePic ?? currentUser}
          />
        </View>
        <View style={{width: width * 0.042}} />
        <View style={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              height: height * 0.167,
              aspectRatio: 1,
              borderRadius: 10000,
              borderWidth: 5,
              borderColor: '#00AAA9',
            }}
          />
        </View>
      </View>

      <View style={{height: height * 0.02, width}} />

      <Text>
        {route.params?.user ? route.params.user.bio : user.profile.bio}
      </Text>
      <View style={{height: height * 0.02, width}} />

      {/* Follow / Following Buttons */}
      <FollowButtons
        followers={followers}
        following={following}
        navToFollowers={navToFollowers}
      />

      <View style={{height: height * 0.017}} />

      {/* Profile Buttons / Follow User Button */}
      {currentUser.id == user.id ? (
        <ProfileButtons
          navToCommList={navToCommList}
          navToSettings={navToSettings}
        />
      ) : (
        <Button
          style={{
            width: width * 0.9,
            height: height * 0.057,
            borderColor: '#00AAA9',
            borderWidth: 1,
            borderRadius: height * 0.015,
            backgroundColor: isFollowing ? '#00AAA9' : 'white',
          }}
          text={isFollowing ? 'Following' : 'Follow'}
          textColor={isFollowing ? 'white' : '#00AAA9'}
          textSize={17}
          action={follow}
        />
      )}

      <View style={{height: height * 0.017}} />

      {/* Polls / Votes / Voted */}

      <PVV
        votes={0}
        votesOn={currentUser.profile.votes_registered}
        pollNum={polls.length}
        navToScreen={navToScreen}
      />

      <View style={{height: dimensions.height * 0.028, width: '100%'}} />

      <View
        style={{
          borderTopWidth: 1,
          flex: 1,
          borderColor: '#EFEFEF',
          width: '100%',
        }}>
        <View style={{height: dimensions.width * 0.077}} />
        <ScrollView horizontal={true} style={{flex: 1}}>
          {polls?.map((poll, idx) => {
            return <Poll key={idx} poll={poll} navToPoll={navToPoll} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
};
export default ProfilePage;
