import React, {useContext, useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  DevSettings
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {REACT_APP_BASE_URL} from '@env';
import * as ImagePicker from 'expo-image-picker';
import Loader from '../../components/Loader';


import colors from '../../config/colors';
import Icon from '../../components/Icon';
import {ListItem} from '../../components/lists';
import ColoredButton from '../../components/coloredButton';
import PollCard from '../../components/pollCard';
import { updateProfilePic } from '../../network/lib/pollish';
import {
  getFollowers,
  getFollowing,
  getUserPolls,
  checkFollowing,
  followUser,
} from 'endpoints/core';
import { useIsFocused } from '@react-navigation/native';

const dimensions = Dimensions.get('screen');
const url = REACT_APP_BASE_URL;

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

  const isFocused = useIsFocused();

  const {user, logOut} = useAuth();
  const [updatedProfilePic, setUpdatedProfilePic] = React.useState(null);
  const [followers, setFollowers] = React.useState(0);
  const [following, setFollowing] = React.useState(0);
  const [polls, setPolls] = React.useState([]);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [noProfilePic, setError] = React.useState(true);
  const [updating, setUpdating] = React.useState(false);

  React.useEffect(() => {
    if(isFocused) 
      getInitialData();
  }, [isFocused]);

  const getInitialData = () => {
    findFollowers();
    findFollowing();
    findPolls();
    checkFollow();
  }

  const checkFollow = async () => {
    if (route.params?.user) {
      const data = await checkFollowing(user.id, route.params.user.id);
      setIsFollowing(data.data);
    }
  };

  const findFollowers = async () => {
    const data = await getFollowers(
      route.params?.user ? route.params.user.id : user.id,
    );
    setFollowers(data.data.length);
  };

  const findFollowing = async () => {
    const data = await getFollowing(
      route.params?.user ? route.params.user.id : user.id,
    );
    setFollowing(data.data.length);
  };

  const findPolls = async () => {
    const data = await getUserPolls(
      route.params?.user ? route.params.user.id : user.id,
    );
    setPolls(data.data.results);
  };

  const navToFollowers = () => {
    navigation.push(route.params.followScreen, {
      id: route.params?.user ? route.params.user.id : user.id,
      title: route.params?.user ? route.params.user.username : user.username,
    });
  };

  const follow = async () => {
    if (route.params?.user) {
      const follow = await checkFollowing(user.id, route.params.user.id);
      const data = await followUser(user.id, route.params.user.id, follow.data);
      setIsFollowing(!follow.data);
    }
  };

  let openImagePickerAsync = async () => {
    
    if(route.params.user) return;
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    setUpdating(true);

    var formdata = new FormData();
    formdata.append('avatar', {
      uri: pickerResult.uri,
      name: 'image.jpg',
      type: 'image/jpg',
    });

    const data = await updateProfilePic(formdata);
    setUpdatedProfilePic(pickerResult.uri)
    setError(true)
    setUpdating(false);

    if (pickerResult.cancelled === true) {
      return;
    }

    

  };

  return (
    <View style={{alignItems: 'center'}}>
      {/* {!route.params?.user && (
        <Ionicons
          name={'settings-outline'}
          size={30}
          color={'black'}
          style={{
            position: 'absolute',
            top: '8%',
            right: '8%',
          }}
        />
      )} */}
      <Loader visible={updating} />
      <View style={{height: route.params?.user ? '5%' : '15%'}} />

      {/* Profile Image */}
      { noProfilePic ?
        <TouchableOpacity onPress={() => openImagePickerAsync()} style={{height: '30%'}}>
          <Image
            source={{
              uri: updatedProfilePic ? updatedProfilePic :
               route.params?.user
                ? route.params.user.profile.avatar
                : user.profile.avatar,
            }}
            style={Styles.profilePic}
            onError={() => setError(false)}
          />
        </TouchableOpacity>
      :
        <TouchableOpacity onPress={() => openImagePickerAsync()} style={[Styles.profilePic, {height: '30%'}]}>
          <Text style={Styles.noProfileInitial}>
            {route.params?.user ? route.params.user.username.slice(0,1).toUpperCase() : user.username.slice(0,1).toUpperCase()}
          </Text>
        </TouchableOpacity>
      }

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

      {(route.params?.user && (route.params.user.id != user.id)) && (
        <View>
          <ColoredButton
            fill={!isFollowing}
            color={'#00a2ed'}
            text={isFollowing ? 'Following' : 'Follow'}
            whenPressed={follow}
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
              title: route.params?.title ? route.params.title : user.username
            })
          }>
          <PVV_Text num={polls.length} text={'Polls'} />
        </TouchableOpacity>
        

        <TouchableOpacity
          onPress={() =>
            navigation.push(route.params.communityListScreen, {
              id: route.params?.user ? route.params.user.id : user.id,
              title: route.params?.title ? route.params.title : user.username
            })
        }>
          <PVV_Text num={'x'} text={'Communities'} />
        </TouchableOpacity>
        
        <PVV_Text num={'x'} text={'Votes'} />
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
          whenPressed={navToFollowers}
        />
        <ColoredButton
          color={'#907AD6'}
          text={following + ' Following'}
          whenPressed={navToFollowers}
        />
      </View>

      <View style={{height: '6%'}} />

      {!route.params?.user && (
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor={colors.primary} />}
        onPress={() => logOut()}
      />
      )}
    </View>
  );
};
export default ProfilePage;

const Styles = StyleSheet.create({
  profilePic: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 5000,
    resizeMode: 'cover',
    borderColor: '#ffeef7',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noProfileInitial: {
    textAlign: 'center',
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: dimensions.height/10
}
});
