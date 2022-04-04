import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from 'react-native';
import MediaContainer from './MediaContainer';
import { Media_Row, Media_HeaderText, Media_Page } from 'style/Create_Style';

const CreateMedia = ({setMedia, media}) => {

    let openImagePickerAsync = async ({num}) => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (pickerResult.cancelled === true) {
          return;
        }
        
        if(num == 1) setMedia({m1: pickerResult.uri, m2: media.m2, m3: media.m3, m4: media.m4});
        if(num == 2) setMedia({m1: media.m1, m2: pickerResult.uri, m3: media.m3, m4: media.m4});
        if(num == 3) setMedia({m1: media.m1, m2: media.m2, m3: pickerResult.uri, m4: media.m4});
        if(num == 4) setMedia({m1: media.m1, m2: media.m2, m3: media.m3, m4: pickerResult.uri});
    };

    return (
        <View style={Media_Page}>
            <Text style={Media_HeaderText}>ADD VISUALS TO YOUR POST!</Text>
            <View style={Media_Row}>
              <MediaContainer openImagePickerAsync={openImagePickerAsync} num={1} media={media.m1}/>
              <MediaContainer openImagePickerAsync={openImagePickerAsync} num={2} media={media.m2}/>
            </View>
            <View style={Media_Row}>
              <MediaContainer openImagePickerAsync={openImagePickerAsync} num={3} media={media.m3}/>
              <MediaContainer openImagePickerAsync={openImagePickerAsync} num={4} media={media.m4}/>
            </View>
        </View>
    )
}

export default CreateMedia;