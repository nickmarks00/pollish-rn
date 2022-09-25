import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';

import Screen from '../AppScreen';
import Wave from '../../components/Wave';
import * as SecureStore from 'expo-secure-store';
import Button from '../../components/Button';
import colors from '../../config/colors';

// TODO Change to a .env secret
const key = 'pollish_User';

const dimensions = Dimensions.get('screen');

function WelcomeScreen({navigation}) {
  return (
    <Screen>
      <Wave>
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
            <Button
              text={'LOGIN'}
              textSize={18}
              textColor={'white'}
              style={{
                height: dimensions.height*0.06,
                backgroundColor: colors.primary,
                borderRadius: '5%'
              }}
              action={() => {
                SecureStore.deleteItemAsync(key)
                navigation.navigate('Login')
              }}
            />
            <View style={{height: dimensions.height*0.01}}/>
            <Button
              text={'REGISTER'}
              textSize={18}
              textColor={'white'}
              style={{
                height: dimensions.height*0.06,
                backgroundColor: colors.secondary,
                borderRadius: '5%'
              }}
              action={() => {
                SecureStore.deleteItemAsync(key)
                navigation.navigate('Register')
              }}
            />
          </View>
        </View>
      </Wave>
    </Screen>
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
