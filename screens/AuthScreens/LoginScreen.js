import React, {useContext} from 'react';
import {StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';

import {AuthUserContext} from '../lib/context';

import {BASE_URL} from '@env';

import AppScreen from './AppScreen';
import {AppForm, AppFormField, SubmitButton} from '../components/forms';
import {useAuthData} from '../lib/hooks';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
  password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen({navigation, ...props}) {
  const handleUserLogin = async values => {
    const url = `http://${BASE_URL}/auth/jwt/create`;

    const options = {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const request = await fetch(url, options);
      if (request.status === 200) {
        const response = await request.json();
        await AsyncStorage.setItem(
          '@pollish_user_Token',
          JSON.stringify(response),
        );
        console.log(response);

        const user = useContext(AuthUserContext);

        if (!user) {
          user = useAuthData();
        }

        navigation.navigate('Profile');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppScreen style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/pollish-logo-black.png')}
      />

      <AppForm
        initialValues={{username: '', password: ''}}
        onSubmit={values => handleUserLogin(values)}
        validationSchema={validationSchema}>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          name="username"
          placeholder="Username"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </AppForm>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
