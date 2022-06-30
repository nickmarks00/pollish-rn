import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Styles from './styles';

/*
    * color: appearance of the background of the button (color-code)
    * fill: should the button have a solid color background (bool)
    * text: message to be shown in the button (string)
    * whenPressed: function to be called when the button is pressed
*/

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