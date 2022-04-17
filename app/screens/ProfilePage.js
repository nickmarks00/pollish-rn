import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import {ListItem} from '../components/lists';
import Icon from '../components/Icon';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import authStorage from '../auth/storage'
import { PrimaryPollish } from './Styling/App_Styles';



const dimensions = Dimensions.get("screen")

const img = 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'

const ProfilePage = () => {

  const {user, logOut} = useAuth();
  const [profilePic, setProfilePic] = React.useState('')

  React.useEffect(() => {
    findAvatar();
  }, []);

  const findAvatar = async () => {
    const tokens = await authStorage.getTokens();
    const access = JSON.parse(tokens).access;

    const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'multipart/form-data; ',
          Authorization: `JWT ${access}`,
      },
  }

  const response = await fetch(`http://192.168.1.140:8000/pollish/profiles/me/`, options)
  .then(response => response.json())
        .then(response => {
          console.log("Av " + response.avatar)
            setProfilePic(response.avatar)
        })

  }

  let openImagePickerAsync = async () => {
    const tokens = await authStorage.getTokens();
    const access = JSON.parse(tokens).access;
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if (pickerResult.cancelled === true) {
      return;
    }
    const data = new FormData();
    data.append("avatar", {uri: pickerResult.uri, name: 'image.png', type: 'image/png'});

    const options = {
        method: 'PATCH',
        headers: {
            Authorization: `JWT ${access}`,
        },
        body: data
    }

    const response = await fetch(`http://192.168.1.140:8000/pollish/profiles/me/`, options)
    findAvatar()
};

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', backgroundColor: PrimaryPollish, width: dimensions.width, height: dimensions.height/4.5}}>
        <TouchableOpacity onPress={() => openImagePickerAsync()}>
        <Image source={{uri: profilePic ? `http://192.168.1.140:8000${profilePic}` : undefined}}
        style={{
          backgroundColor: '#FFF',
          marginTop: (dimensions.height/4.5)-(dimensions.width/3), 
          width: dimensions.width/2, 
          height: dimensions.width/2,
          borderRadius: dimensions.width/16,
          borderColor: '#00A6A6',
          borderWidth: 3}}
        />
        </TouchableOpacity>
      </View>

      <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: dimensions.width/5, fontSize: 15}}>
      USERNAME00
      </Text>
      <View style={{borderRadius: 10, backgroundColor: 'rgba(204, 204, 204, 0.26)', width: dimensions.width*0.92, height: dimensions.height/18, alignContent: 'center', marginLeft: dimensions.width*0.04, marginTop: dimensions.height/80, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', opacity: '50%'}}>
      <View style={{width: dimensions.width/6}}>
      <Text style={[styles.text, {fontSize: 15}]}>30</Text>
      <Text style={[styles.text, {fontSize: 10}]}>POLLS</Text>
      </View>
      <View/>
      <View style={{width: dimensions.width/6}}>
      <Text style={[styles.text, {fontSize: 15}]}>389,450</Text>
      <Text style={[styles.text, {fontSize: 10}]}>VOTES</Text>
      </View>
      <View/>
      <View style={{width: dimensions.width/6}}>
      <Text style={[styles.text, {fontSize: 15}]}>100,000</Text>
      <Text style={[styles.text, {fontSize: 10}]}>VOTED</Text>
      </View>

      </View>
      <View style={{marginLeft: dimensions.width*0.115, width: dimensions.width*0.77, height: dimensions.height/22, backgroundColor: 'rgba(204, 204, 204, 0.15)', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flexDirection: 'row'
    , textAlign: 'center', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Text style={{fontSize: dimensions.width/30, fontFamily: 'SFRound'}}>FOLLOWERS</Text>
        <Text style={{fontSize: dimensions.width/30, fontFamily: 'SFRound'}}>30M</Text>
        <View/>
        <Text style={{fontSize: dimensions.width/30, fontFamily: 'SFRound'}}>FOLLOWERS</Text>
        <Text style={{fontSize: dimensions.width/30, fontFamily: 'SFRound'}}>300K</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 100}}>
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => logOut()}
        />
      </View>

      {/* <View style={{marginLeft: dimensions.width*0.08, width: dimensions.width*0.84, height: dimensions.height/6, backgroundColor: 'rgba(204, 204, 204, 0.15)', borderRadius: 10,
       textAlign: 'left', justifyContent: 'space-evenly', marginTop: 30}}>
         <Text style={{fontFamily: 'SFRound'}}>RECENT</Text>
      </View>

      <View style={{marginLeft: dimensions.width*0.08, width: dimensions.width*0.84, height: dimensions.height/6, backgroundColor: 'rgba(204, 204, 204, 0.15)', borderRadius: 10,
       textAlign: 'left', justifyContent: 'space-evenly', marginTop: 30}}>
         <Text style={{fontFamily: 'SFRound'}}>POPULAR</Text>
      </View> */}
      
    </View>
  );  
}

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
});