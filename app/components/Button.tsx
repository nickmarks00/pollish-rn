import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

/*
 * color: appearance of the background of the button (color-code)
 * fill: should the button have a solid color background (bool)
 * text: message to be shown in the button (string)
 * whenPressed: function to be called when the button is pressed
 */

type ButtonProps = {
  textColor: string;
  text: string;
  action: () => void;
  style: any;
  textSize: number;
};

const Button = ({textColor, text, action, style, textSize}: ButtonProps) => {
  const size = textSize ? textSize : 13;

  return (
    <TouchableOpacity
      onPress={action}
      style={{alignItems: 'center', justifyContent: 'center', ...style}}>
      <Text style={{color: textColor, fontWeight: 'bold', fontSize: size}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
