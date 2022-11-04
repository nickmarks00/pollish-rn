import React from 'react';
import {View} from 'react-native';
import Icon from '../components/Icon';
import {ListItem} from 'components/lists';
import * as ImagePicker from 'expo-image-picker';
import {updateProfilePic} from '../network/lib/pollish';
import Loader from '../components/Loader';

const Settings = () => {
  const {user, logOut} = useAuth();
  const [updating, setUpdating] = React.useState(false);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
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
    // setUpdatedProfilePic(pickerResult.uri)
    // setError(true)
    setUpdating(false);

    if (pickerResult.cancelled === true) {
      return;
    }
  };

  return (
    <View>
      <Loader visible={updating} />
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor={'green'} />}
        onPress={() => logOut()}
      />
      <ListItem
        title="Change Profile Picture"
        IconComponent={<Icon name="camera" backgroundColor={'green'} />}
        onPress={() => openImagePickerAsync()}
      />
    </View>
  );
};
export default Settings;
