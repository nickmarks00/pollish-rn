import React, {useState, useEffect} from 'react';
import {View, Dimensions, ScrollView, Text} from 'react-native';
import Constants from 'expo-constants';
import SectionHeader from '../../components/SectionHeader';

import {useIsFocused} from '@react-navigation/native';
import ProfilePic from '../../components/ProfilePic';
import Button from '../../components/Button';
import {Poll, FollowButtons, ProfileButtons, PVV} from './subComponents';
import {RootStackParams} from '../../constants/keys';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfilePoll} from '../../types/types';

type User = {
  username: string;
  numFollowers: number;
  numFollowing: number;
  id: number;
  bio: string;
  votesRegistered: number;
  votesRecieved: number;
  avatar: string;
};

type ProfileProps = NativeStackScreenProps<RootStackParams, 'Profile'>;

const dimensions = Dimensions.get('screen');
const {height, width} = Dimensions.get('screen');

const ProfilePage = ({route}: ProfileProps) => {
  const isFocused = useIsFocused();

  const [polls, setPolls] = React.useState<ProfilePoll[]>([]);
  const [isFollowing, setIsFollowing] = React.useState(false);

  const isMe: boolean = route.params?.user ? false : true;
  const [currentUser_, setCurrentUser] = useState<User>();

  useEffect(() => {
    // Load this information from aws endpoint
    setCurrentUser({
      username: 'Cameron',
      numFollowers: 10,
      numFollowing: 7,
      id: 1044,
      bio: 'sample bio',
      votesRegistered: 100,
      votesRecieved: 120,
      avatar: '',
    });

    // Load polls from aws endpoint
    setPolls([]);

    if (!isMe) checkFollow();
  }, [isFocused]);

  const checkFollow = async () => {
    // query database to check if the logged in user follows the viewed user
    setIsFollowing(true);
  };

  const follow = async () => {
    if (!isMe && currentUser_) {
      // check if current user follows logged in user
      // aws call to follow / unfollow user
      setIsFollowing(false);
    }
  };

  if (!currentUser_) return <View />;

  return (
    <View style={{alignItems: 'center', flex: 1}}>
      {isMe && <View style={{height: Constants.statusBarHeight}} />}

      {/* Header */}
      {isMe && (
        <SectionHeader name={isMe ? 'My Profile' : currentUser_.username} />
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
            username={currentUser_.username}
            avatar={currentUser_.avatar}
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

      <Text>{currentUser_.bio}</Text>
      <View style={{height: height * 0.02, width}} />

      {/* Follow / Following Buttons */}
      <FollowButtons
        followers={currentUser_.numFollowers}
        following={currentUser_.numFollowing}
      />

      <View style={{height: height * 0.017}} />

      {/* Profile Buttons / Follow User Button */}
      {isMe ? (
        <ProfileButtons id={currentUser_.id} />
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
        votes={currentUser_.votesRecieved}
        votedOn={currentUser_.votesRegistered}
        pollNum={polls.length}
        id={currentUser_.id}
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
            return <Poll key={idx} poll={poll} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
};
export default ProfilePage;
