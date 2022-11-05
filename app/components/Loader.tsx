import React from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet, Dimensions} from 'react-native';

const dimensions = Dimensions.get('screen');

function Loader({visible = false}) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require('../assets/animations/loader.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'black',
    height: dimensions.height,
    opacity: 0.6,
    width: dimensions.width,
    zIndex: 1,
  },
});

export default Loader;
