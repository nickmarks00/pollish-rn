import React from 'react';
import {View, Text, Dimensions} from 'react-native';

const dimensions = Dimensions.get('window');

export interface SectionHeaderProps {
  name: string;
}

const SectionHeader = ({name}: SectionHeaderProps) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: dimensions.height * 0.048,
        borderColor: '#CCCCCC',
        borderBottomWidth: 1,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          textAlign: 'center',
        }}>
        {name}
      </Text>
    </View>
  );
};

export default SectionHeader;
