import React, {useContext, useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {BASE_URL} from '@env';

import colors from '../config/colors';

import Singer from './../assets/Harlow.jpg';
import ColoredButton from '../components/coloredButton';
import Icon from '../components/Icon';
import {ListItem} from '../components/lists';
import PollCard from '../components/pollCard';
import {
  GetFollowers,
  GetFollowing,
  GetUserPolls,
  CheckFollowing,
  FollowUser,
} from '../api/comments';

const dimensions = Dimensions.get('screen');
const url = BASE_URL;

const PVV_Text = ({num, text}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{fontWeight: 'bold', fontSize: dimensions.width / 20}}>
        {num}
      </Text>
      <View style={{height: '5%'}} />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: dimensions.width / 24,
          color: '#9c9c9c',
        }}>
        {text}
      </Text>
    </View>
  );
};

const ProfilePage = ({route, navigation}) => {
  const {user, logOut} = useAuth();
  const [followers, setFollowers] = React.useState(0);
  const [following, setFollowing] = React.useState(0);
  const [polls, setPolls] = React.useState([]);
  const [isFollowing, setIsFollowing] = React.useState(false);

  useEffect(() => {
    findFollowers();
    findFollowing();
    findPolls();
    checkFollowing();
  }, []);

  const checkFollowing = async () => {
    if (route.params?.user) {
      const data = await CheckFollowing(user.id, route.params.user.id);
      setIsFollowing(data);
    }
  };

  const findFollowers = async () => {
    const data = await GetFollowers(
      route.params?.user ? route.params.user.id : user.id,
    );
    setFollowers(data.length);
  };

  const findFollowing = async () => {
    const data = await GetFollowing(
      route.params?.user ? route.params.user.id : user.id,
    );
    setFollowing(data.length);
  };

  const findPolls = async () => {
    const data = await GetUserPolls(
      route.params?.user ? route.params.user.id : user.id,
    );
    setPolls(data.results);
  };

  const navToFollowers = () => {
    navigation.push(route.params.followScreen, {
      id: route.params?.user ? route.params.user.id : user.id,
      title: route.params?.user ? route.params.user.username : user.username,
    });
  };

  const followUser = async () => {
    if (route.params?.user) {
      const follow = await CheckFollowing(user.id, route.params.user.id);
      const data = await FollowUser(user.id, route.params.user.id, follow);
      setIsFollowing(!follow);
    }
  };

  return (
    <View style={{alignItems: 'center'}}>
      {!route.params?.user && (
        <Ionicons
          name={'settings-outline'}
          size={30}
          color={'black'}
          style={{
            borderTopWidth: 1,
            borderTopColor: 'red',
            position: 'absolute',
            top: '8%',
            right: '8%',
          }}
        />
      )}

      <View style={{height: route.params?.user ? '5%' : '10%'}} />

      {/* Profile Image */}
      <Image
        source={{
          uri: route.params?.user
            ? `http://${url}${route.params.user.profile.avatar}`
            : user.profile.avatar,
        }}
        style={Styles.profilePic}
      />

      {/* Profile Name */}
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: dimensions.width / 18,
          padding: '3%',
          textAlign: 'center',
        }}>
        {route.params?.user ? route.params.user.username : user.username}
      </Text>

      {route.params?.user && (
        <View>
          <ColoredButton
            fill={!isFollowing}
            color={'#00a2ed'}
            text={isFollowing ? 'Following' : 'Follow'}
            navToFollowers={followUser}
          />
          <View style={{height: '2%'}} />
        </View>
      )}
      {!route.params?.user && <View style={{height: '5%'}} />}

      {/* Polls / Votes / Voted */}

      <View
        style={{
          flexDirection: 'row',
          width: dimensions.width,
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.push(route.params.pollListScreen, {
              id: route.params?.user ? route.params.user.id : user.id,
            })
          }>
          <PVV_Text num={polls.length} text={'Polls'} />
        </TouchableOpacity>

        <PVV_Text num={'3,620'} text={'Votes'} />
        <PVV_Text num={'2000'} text={'Voted'} />
      </View>

      {/* Followers / Following buttons */}

      <View
        style={{
          flexDirection: 'row',
          width: dimensions.width,
          justifyContent: 'space-evenly',
        }}>
        <ColoredButton
          color={'#51E0B8'}
          text={followers + ' Followers'}
          navToFollowers={navToFollowers}
        />
        <ColoredButton
          color={'#907AD6'}
          text={following + ' Following'}
          navToFollowers={navToFollowers}
        />
      </View>

      <View style={{height: '6%'}} />

      {/* Popular Polls header */}
      <View style={{width: dimensions.width}}>
        <Text
          style={{
            paddingHorizontal: '5%',
            fontWeight: 'bold',
            fontSize: dimensions.width / 18,
          }}>
          Popular Polls
        </Text>
      </View>

      <View style={{height: '2%'}} />

      {/* Poll display section */}
      {polls.length > 0 && (
        <TouchableOpacity>
          <PollCard
            color={'#51E0B8'}
            qText={polls[0].question_text}
            id={polls[0].id}
          />
        </TouchableOpacity>
      )}
      {polls.length > 1 && (
        <PollCard color={'#907AD6'} qText={polls[1].question_text} />
      )}

      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor={colors.primary} />}
        onPress={() => logOut()}
      />
    </View>
  );
};
export default ProfilePage;

const Styles = StyleSheet.create({
  profilePic: {
    height: '20%',
    aspectRatio: 1,
    borderRadius: 5000,
    resizeMode: 'contain',
    borderColor: '#ffeef7',
    borderWidth: 5,
  },
});
