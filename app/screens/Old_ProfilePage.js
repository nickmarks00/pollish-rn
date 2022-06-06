import * as React from 'react';
import {Text, View, StyleSheet, Image, Dimensions, Modal} from 'react-native';
import {ListItem} from '../components/lists';
import Icon from '../components/Icon';
import * as ImagePicker from 'expo-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import authStorage from '../auth/storage';
import {PrimaryPollish} from 'style/App_Styles';
import FollowersScreen from './FollowersScreen';
import CommunitiesScreen from './CommunitiesScreen';
import PollsScreen from './PollsScreen';

const dimensions = Dimensions.get('screen');

const ProfilePage = ({route, navigation}) => {
  const {user, logOut} = useAuth();
  const [profile, setProfile] = React.useState('');
  const [profilePic, setProfilePic] = React.useState('');
  const [followers, setFollowers] = React.useState(false);
  const [communities, setCommunity] = React.useState(false);
  const [polls, setPolls] = React.useState(false);

  React.useEffect(() => {
    findAvatar();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: route.params?.user ? true : false,
    });
  }, [navigation]);

  const findAvatar = async () => {
    const tokens = await authStorage.getTokens();
    const access = JSON.parse(tokens).access;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data; ',
        Authorization: `JWT ${access}`,
      },
    };

    const response = await fetch(
      `http://192.168.1.140:8000/pollish/profiles/me/`,
      options,
    )
      .then(response => response.json())
      .then(response => {
        setProfilePic(response.avatar);
      });
  };

  let openImagePickerAsync = async () => {
    const tokens = await authStorage.getTokens();
    const access = JSON.parse(tokens).access;
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    const data = new FormData();
    data.append('avatar', {
      uri: pickerResult.uri,
      name: 'image.png',
      type: 'image/png',
    });

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `JWT ${access}`,
      },
      body: data,
    };

    const response = await fetch(
      `http://192.168.1.140:8000/pollish/profiles/me/`,
      options,
    );
    findAvatar();
  };

  const ShowFollowers = () => {
    setFollowers(true);
    setModal(true);
  };

  return (
    <View style={styles.container}>
      <Modal visible={followers} animationType={'slide'}>
        <FollowersScreen setFollowers={setFollowers} id={user.id} />
      </Modal>
      <Modal visible={communities} animationType={'slide'}>
        <CommunitiesScreen setCommunity={setCommunity} />
      </Modal>
      <Modal visible={polls} animationType={'slide'}>
        <PollsScreen setPolls={setPolls} />
      </Modal>

      {/* // * Profile Picture Display and change functionality */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: PrimaryPollish,
          width: dimensions.width,
          height: dimensions.height / 4.5,
        }}>
        <TouchableOpacity onPress={() => openImagePickerAsync()}>
          <Image
            source={{
              uri: user?.profile?.avatar ? user.profile.avatar : undefined,
            }}
            style={{
              backgroundColor: '#FFF',
              marginTop: dimensions.height / 4.5 - dimensions.width / 3,
              width: dimensions.width / 2,
              height: dimensions.width / 2,
              borderRadius: dimensions.width / 16,
              borderColor: '#00A6A6',
              borderWidth: 3,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* // ! Display Username */}
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: dimensions.width / 5,
          fontSize: 15,
        }}>
        {route.params?.user ? route.params.user.username : user.username}
      </Text>

      {/* // ! Navigate to followers page */}
      <TouchableOpacity
        onPress={() =>
          navigation.push(route.params.followScreen, {
            id: route.params?.user ? route.params.user.id : user.id,
          })
        }
        style={{margin: '5%'}}>
        <Text style={{color: 'blue'}}>Following: ????</Text>
      </TouchableOpacity>

      {/* // ! Navigate to list of polls created by user */}
      <TouchableOpacity
        onPress={() =>
          navigation.push(route.params.pollListScreen, {
            id: route.params?.user ? route.params.user.id : user.id,
          })
        }
        style={{margin: '5%'}}>
        <Text style={{color: 'blue'}}>POLLS</Text>
      </TouchableOpacity>

      {/* // ! Navigate to list of communities followed by user */}
      <TouchableOpacity
        onPress={() =>
          navigation.push(route.params.communityListScreen, {
            id: route.params?.user ? route.params.user.id : user.id,
          })
        }
        style={{margin: '5%'}}>
        <Text style={{color: 'blue'}}>COMMUNITIES</Text>
      </TouchableOpacity>

      <View style={{alignItems: 'center', marginTop: 100}}>
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => logOut()}
        />
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
