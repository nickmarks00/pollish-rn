import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Media_Container, Media_PlusButton, Media_Object, Media_PlusButton_Text } from 'style/Create_Style';

/*
    * Component for each square containing media on media creation page
*/

const MediaContainer = ({openImagePickerAsync, num, media}) => {
    return(
        <TouchableOpacity style={Media_Container} onPress={() => openImagePickerAsync({num: num})}>
            {media ? 
                <Image source={{ uri: media }} style={Media_Object} /> :
                <View style={Media_PlusButton}>
                    <Text style={Media_PlusButton_Text}>+</Text>
                </View>
            }
        </TouchableOpacity>
    )
}

export default MediaContainer;
