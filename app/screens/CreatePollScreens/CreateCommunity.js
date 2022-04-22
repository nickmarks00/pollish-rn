import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, TextInput, Button } from 'react-native';
import MediaContainer from './MediaContainer';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CreateCommunity = ({setCommunity}) => {

    const [title, setTitle] = React.useState('');
    const [media, setMedia] = React.useState(null);

    const createCommunity = () => {
        setCommunity(false)
    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (pickerResult.cancelled === true) {
          return;
        }

        setMedia(pickerResult.uri);
    };

    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
            <Button onPress={() => setCommunity(false)} title="close"/>
            <Text style={{textAlign: 'center'}}>Community Name</Text>
            <TextInput placeholder='hi'></TextInput>
            <Text onChangeText={newText => setTitle(newText)} style={{textAlign: 'center'}}>Community Image</Text>
            <MediaContainer openImagePickerAsync={openImagePickerAsync} media={media}/>
            <TouchableOpacity onPress={() => createCommunity()}>
                <Text>CREATE</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateCommunity;