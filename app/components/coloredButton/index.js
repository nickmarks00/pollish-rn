import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';

const dimensions = Dimensions.get('screen');

const ColoredButton = ({color, text, navToFollowers, fill}) => {
    return (
        <TouchableOpacity onPress={navToFollowers} style={{backgroundColor: !fill ? color : '#FFF', padding: '2.5%', borderRadius: 1000, borderColor: color, borderWidth: 1}}>
            <Text style={{fontWeight: 'bold', textAlign: 'center', color: !fill ? 'white' : color, fontSize: dimensions.width/24}}>{text}</Text>
        </TouchableOpacity>
    )
}
export default ColoredButton;