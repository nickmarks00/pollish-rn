import React from 'react';
import { View, Dimensions } from 'react-native';
import {Ionicons} from '@expo/vector-icons';


const { height, width } = Dimensions.get('window');

const IconButton = ({name, backgroundColor, outlineColor, outlineWidth, style, iconFill}) => {

    const fill = backgroundColor ? backgroundColor : 'white';
    const borderFill = outlineColor ? outlineColor : '#ECEEEE';
    const borderWidth = outlineWidth ? outlineWidth : 0;

    return (
        <View style={[{
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%', 
            aspectRatio: 1, 
            borderWidth: borderWidth,
            backgroundColor: fill,
            borderColor: borderFill, 
            borderRadius: height*0.015
        }, {...style}]}>
          <Ionicons name={name} size={height*0.03} color={iconFill} />
        </View>
    )
}

export default IconButton;