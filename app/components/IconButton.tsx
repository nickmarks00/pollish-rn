import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const {height, width} = Dimensions.get('window');

type IconButtonProps = {
  action: () => any;
  name: string;
  backgroundColor: string;
  outlineColor: string;
  outlineWidth: number;
  style: any;
  iconFill: string;
};

const IconButton = ({
  action,
  name,
  backgroundColor,
  outlineColor,
  outlineWidth,
  style,
  iconFill,
}: IconButtonProps) => {
  const fill = backgroundColor ? backgroundColor : 'white';
  const borderFill = outlineColor ? outlineColor : '#ECEEEE';
  const borderWidth = outlineWidth ? outlineWidth : 0;

  return (
    <TouchableOpacity
      onPress={action}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          aspectRatio: 1,
          borderWidth: borderWidth,
          backgroundColor: fill,
          borderColor: borderFill,
          borderRadius: height * 0.015,
        },
        {...style},
      ]}>
      {/* @ts-ignore */}
      <Ionicons name={name} size={height * 0.03} color={iconFill} />
    </TouchableOpacity>
  );
};

export default IconButton;
