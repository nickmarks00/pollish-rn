import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Styles from './styles';

const ColoredButton = ({color, text, whenPressed, fill}) => {
    return (
        <TouchableOpacity 
            onPress={whenPressed} 
            style={[Styles.container, {backgroundColor: !fill ? color : '#FFF', borderColor: color}]}
        >
            <Text style={[ Styles.content, {color: !fill ? 'white' : color}]}>{text}</Text>
        </TouchableOpacity>
    )
}
export default ColoredButton;