import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

import colors from '../config/colors';

const dimensions = Dimensions.get('screen');

export default function Wave({children}) {
  return (
    <>
      <View style={[styles.wave, styles.waveTop]} />
      {children}
      <View style={[styles.wave, styles.waveBottom]} />
    </>
  );
}

const styles = StyleSheet.create({
  wave: {
    position: 'absolute',
    height: dimensions.height / 4,
    width: dimensions.width * 3,
    backgroundColor: colors.primary,
    transform: [{rotate: '-10deg'}],
    borderTopRightRadius: 1000,
  },
  waveBottom: {
    bottom: -100,
    marginLeft: -dimensions.width * 1.9,
  },
  waveTop: {
    top: -180,
    marginLeft: -50,
    borderBottomLeftRadius: 1000,
  },
});
