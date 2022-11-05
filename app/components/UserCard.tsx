import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
// @ts-ignore
import {getFollowers} from 'endpoints/core';
import {checkFollowing} from '../network/lib/core';
import {followUser} from '../network/lib/core';
import Button from './Button';

const dimensions = Dimensions.get('window');
const {height, width} = Dimensions.get('window');

type UserCardProps = {
  oUser: any;
  navToProfile: (user: any) => void;
};

const UserCard = ({oUser, navToProfile}: UserCardProps) => {
  const [numFollower, setNumFollowers] = React.useState(0);
  const [isFollowing, setIsFollowing] = React.useState(false);
  // @ts-ignore
  const {user, logOut} = useAuth();
  const [noProfilePic, setError] = React.useState(false);

  React.useEffect(() => {
    loadFollowerCount();
    checkFollow();
    return () => {
      setNumFollowers(0);
      setIsFollowing(false);
    };
  }, []);

  const loadFollowerCount = async () => {
    const data = await getFollowers(oUser.id);
    setNumFollowers(data.data.length);
  };

  const checkFollow = async () => {
    const data = await checkFollowing(user.id, oUser.id);
    setIsFollowing(data.data);
  };

  const follow = async () => {
    const follow = await checkFollowing(user.id, oUser.id);
    const data = await followUser(user.id, oUser.id, follow.data);
    setIsFollowing(!follow.data);
  };

  return (
    <TouchableOpacity
      style={{
        height: height * 0.071,
        width: Dimensions.get('window').width * 0.9,
      }}
      onPress={() => {
        navToProfile(oUser);
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          width: Dimensions.get('screen').width * 0.9,
        }}>
        {!noProfilePic ? (
          <Image
            source={{uri: oUser.profile.avatar}}
            style={Styles.pollImage}
            onError={() => setError(true)}
          />
        ) : (
          <View style={Styles.pollImage}>
            <Text style={Styles.noImageText}>
              {oUser.username.slice(0, 1).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={{width: width * 0.041}} />
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            {oUser.username}
          </Text>
          <View style={{height: '5%'}} />
          <Text style={{fontSize: 13}}>{numFollower} Followers</Text>
        </View>
        <View style={{flex: 1}} />
        <View style={{width: width * 0.25, justifyContent: 'center'}}>
          <Button
            style={{
              width: width * 0.25,
              height: '50%',
              borderColor: '#00AAA9',
              borderWidth: 1,
              borderRadius: height * 0.01,
              backgroundColor: isFollowing ? '#00AAA9' : 'white',
            }}
            text={isFollowing ? 'Following' : 'Follow'}
            textColor={isFollowing ? 'white' : '#00AAA9'}
            textSize={17}
            action={follow}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: dimensions.width,
    flexDirection: 'row',
    paddingVertical: '4%',
    paddingHorizontal: '6%',
    justifyContent: 'center',
  },
  pollImage: {
    height: '100%',
    aspectRatio: 1,
    backgroundColor: '#907AD6',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    borderRadius: 1000,
  },
  noImageText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  questionText: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    paddingHorizontal: '7%',
  },
  votesText: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    paddingHorizontal: '7%',
    color: '#9c9c9c',
  },
  labelContainer: {
    padding: '1%',
    borderRadius: 1000,
    justifyContent: 'center',
  },
  labelText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: dimensions.width / 30,
    paddingHorizontal: '3%',
  },
});

export default UserCard;
