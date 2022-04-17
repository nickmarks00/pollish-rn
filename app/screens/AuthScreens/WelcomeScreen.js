import React from 'react';
import {ImageBackground, StyleSheet, View, Image, Text, Dimensions} from 'react-native';

import AppButton from '../../components/AppButton';

const dimensions = Dimensions.get('screen');

function WelcomeScreen({navigation}) {
  return (
    <View>
      <View style={{position: 'absolute', height: dimensions.height/4, width: dimensions.width*3, top: -150, marginLeft: -50, backgroundColor: '#58e4bc', transform: [{rotate: '-10deg'}], borderBottomLeftRadius: 1000}}/>
      <View style={{justifyContent: 'center', alignItems: 'center', height: dimensions.height}}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/logos/jpgs/logo1.png')}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      </View>
      <View style={{position: 'absolute', height: dimensions.height/4, width: dimensions.width*3, bottom: -150, marginLeft: -dimensions.width*1.9, backgroundColor: '#58e4bc', transform: [{rotate: '-10deg'}], borderTopRightRadius: 1000}}/>
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
});

export default WelcomeScreen;
