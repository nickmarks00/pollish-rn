import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';

const dimensions = Dimensions.get('window');
const {height, width} = Dimensions.get('window');

type UserVoteProps = {
  oUser: any;
  navToProfile: (user: any) => void;
  voteText: string;
};

const UserVote = ({oUser, navToProfile, voteText}: UserVoteProps) => {
  const [noProfilePic, setError] = React.useState(false);

  return (
    <TouchableOpacity
      style={{
        height: height * 0.071,
        width: Dimensions.get('window').width * 0.9,
        marginVertical: width * 0.02,
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
          <Text style={{fontSize: 13}}>{voteText}</Text>
        </View>
        <View style={{flex: 1}} />
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
});

export default UserVote;
