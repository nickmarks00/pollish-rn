import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';

import AppButton from '../../components/AppButton';

import colors from '../../config/colors';

const dimensions = Dimensions.get('screen');

function WelcomeScreen({navigation}) {
  return (
    <View>
      <View style={[styles.wave, styles.waveTop]} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: dimensions.height,
        }}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/logos/jpgs/logo1.png')}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <AppButton
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
          <AppButton
            title="Register"
            color="secondary"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
      <View style={[styles.wave, styles.waveBottom]} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    marginTop: -50,
    padding: 20,
    width: '100%',
  },
  logo: {
    width: 400,
    height: 400,
  },
  logoContainer: {
    marginTop: -100,
    alignItems: 'center',
  },
  wave: {
    position: 'absolute',
    height: dimensions.height / 4,
    width: dimensions.width * 3,
    backgroundColor: colors.primary,
    transform: [{rotate: '-10deg'}],
    borderTopRightRadius: 1000,
  },
  waveBottom: {
    bottom: -150,
    marginLeft: -dimensions.width * 1.9,
  },
  waveTop: {
    top: -150,
    marginLeft: -50,
    borderBottomLeftRadius: 1000,
  },
});

export default WelcomeScreen;
