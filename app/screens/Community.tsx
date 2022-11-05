import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// @ts-ignore
import {getCommPolls} from 'endpoints/pollish';
import PollCard from '../components/PollCard';
import {getUserComms} from '../network/lib/core';
import {followCommunity} from '../network/lib/pollish';
import CommunityCard from 'components/CommunityCard';
import IconButton from '../components/IconButton';
import Constants from 'expo-constants';
import Button from '../components/Button';

const dimensions = Dimensions.get('window');
const {height, width} = Dimensions.get('window');

/**
 * * Show individual community and polls it contains (requires: id, pollScreen)
 * @param id - The id of the community
 * @param pollScreen - The name of poll stack screen to navigate to
 * TODO: Write a nicer endpoint for checking if following
 */

const Community = ({route, navigation}) => {
  const [polls, setPolls] = React.useState();
  const [isFollowing, setIsFollowing] = React.useState(false);
  const {user, logOut} = useAuth();
  const [noProfilePic, setError] = React.useState(false);

  React.useEffect(() => {
    loadCommPolls();
    checkIfFollowing();
  }, []);

  const checkIfFollowing = async () => {
    const data = await getUserComms(user.id);
    await data.data.results.map(choice => {
      if (choice.id == route.params.comm.id) setIsFollowing(true);
    });
    return false;
  };

  const loadCommPolls = async () => {
    const commPolls = await getCommPolls(route.params.comm.id);
    console.log(commPolls);
    setPolls(commPolls.data.polls);
  };

  const follow = async () => {
    const follow = await checkIfFollowing();
    const data = await followCommunity(route.params.comm.id, user.id);
    checkIfFollowing();
    setIsFollowing(follow.data);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
      }}>
      {/* Back Navigation Button */}
      <View
        style={{
          position: 'absolute',
          height: height * 0.05,
          marginVertical: height * 0.018,
          width: '100%',
          top: 0,
        }}>
        <IconButton
          action={() => navigation.goBack()}
          name={'chevron-back'}
          iconFill={'#FFF'}
          style={{
            position: 'absolute',
            left: 0,
            backgroundColor: '#D9D9D9',
            marginLeft: width * 0.07,
            borderRadius: 1000,
          }}
        />
      </View>

      <View style={{height: '5%'}} />

      {!noProfilePic ? (
        <Image
          source={{uri: route.params.comm.image}}
          style={Styles.pollImage}
          onError={() => setError(true)}
        />
      ) : (
        <View style={Styles.noImage}>
          <Text style={Styles.noImageText}>
            {route.params.comm.name.slice(0, 1)}
          </Text>
        </View>
      )}

      {/* Community Content (Image / Name / Users / Following Button) */}
      <View style={{justifyContent: 'center'}}>
        <Text style={Styles.questionText}>{route.params.comm.name}</Text>
        <View style={{height: '5%'}} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={Styles.votesText}>
            {route.params.comm.num_polls} Polls
          </Text>
          <Text style={Styles.votesText}>
            {route.params.comm.num_users} Users
          </Text>
        </View>
        <View style={{height: '5%'}} />
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
      </View>

      {/* List of polls in community */}
      <ScrollView>
        <View style={{flex: 1}}>
          {polls?.map((poll, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                onPress={() =>
                  navigation.push(route.params.pollScreen, {id: poll.id})
                }>
                <PollCard
                  key={idx}
                  color={'#51E0B8'}
                  qText={poll.question_text}
                  id={poll.id}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
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
    height: dimensions.width / 3,
    width: dimensions.width / 3,
    aspectRatio: 1,
    borderRadius: 15,
    resizeMode: 'cover',
    borderColor: '#ffeef7',
  },
  noImage: {
    height: dimensions.width / 3,
    width: dimensions.width / 3,
    aspectRatio: 1,
    borderRadius: 15,
    resizeMode: 'contain',
    borderColor: '#ffeef7',
    backgroundColor: '#907AD6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    fontWeight: 'bold',
    fontSize: dimensions.width / 12,
    color: 'white',
  },
  questionText: {
    fontSize: 17,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    paddingHorizontal: '7%',
    textAlign: 'center',
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

export default Community;
