import React from 'react';
import {View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

type IconProps = {
  name: string;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
};

function Icon({
  name,
  size = 40,
  backgroundColor = '#000',
  iconColor = '#fff',
}: IconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* @ts-ignore */}
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
}

export default Icon;
