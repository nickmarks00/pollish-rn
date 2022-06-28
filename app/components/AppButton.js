import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import colors from '../config/colors';

function AppButton({
  title,
  onPress,
  color = 'primary',
  buttonStyle,
  textStyle,
  ...otherProps
}) {
  console;
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, {backgroundColor: colors[color]}]}
      onPress={onPress}
      {...otherProps}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    // width: '100%',
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default AppButton;
