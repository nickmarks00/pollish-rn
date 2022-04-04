import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Media_Container, Media_PlusButton, Media_Object } from 'style/Create_Style';

const MediaContainer = ({openImagePickerAsync, num, media}) => {

    return(
        <TouchableOpacity style={Media_Container} onPress={() => openImagePickerAsync({num: num})}>
            {media ? 
                <Image source={{ uri: media }} style={Media_Object} /> :
                <View style={Media_PlusButton}>
                    <Text style={{fontSize: 25, color: '#FFF', textAlign: 'center'}}>+</Text>
                </View>
            }
        </TouchableOpacity>
    )
}

export default MediaContainer;
