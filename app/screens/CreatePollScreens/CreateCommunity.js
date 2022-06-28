import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import {View, Text, TextInput, Button} from 'react-native';
import MediaContainer from './MediaContainer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import authStorage from '../../auth/storage';
import {REACT_APP_BASE_URL} from '@env';

const CreateCommunity = ({setCommunity}) => {
  const [title, setTitle] = React.useState('');
  const [media, setMedia] = React.useState(null);

  const createCommunity = async () => {
    const res = await authStorage.getTokens();
    const access = JSON.parse(res).access;
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `JWT ${access}`);

    var formdata = new FormData();
    formdata.append('name', title);
    formdata.append('image', {
      uri: media,
      name: 'image.jpg',
      type: 'image/jpg',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${REACT_APP_BASE_URL}/pollish/communities/`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    setCommunity(false);
  };

  let openImagePickerAsync = async () => {
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

    setMedia(pickerResult.uri);
  };

  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
      <Button onPress={() => setCommunity(false)} title="close" />
      <Text style={{textAlign: 'center'}}>Community Name</Text>
      <TextInput
        onChangeText={newText => setTitle(newText)}
        placeholder="hi"></TextInput>
      <Text style={{textAlign: 'center'}}>Community Image</Text>
      <MediaContainer
        openImagePickerAsync={openImagePickerAsync}
        media={media}
      />
      <TouchableOpacity onPress={() => createCommunity()}>
        <Text>CREATE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateCommunity;
