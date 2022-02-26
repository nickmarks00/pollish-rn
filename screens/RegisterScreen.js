import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '@env';

import Screen from './AppScreen';
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from '../components/forms';
import {AuthUserContext} from '../lib/context';
import {useAuthData} from '../lib/hooks';

// TODO Change uniqueness validation to only run after keyboard debounced
// TODO Uniqueness test for username runs when changes to email field and vice-versa

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label('First name'),
  lastName: Yup.string().required().label('Last name'),
  username: Yup.string()
    .min(3, 'A minimum of 3 characters is required')
    .max(25, 'Maximum allowable username length is 25')
    .test(
      'isUsernameUnique',
      'An account with that username already exists',
      value => {
        if (value) {
          fetch(`http://${BASE_URL}/core/users/?username=${value}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(async res => {
              const data = await res.json();
              return data.length === 0;
            })
            .catch(error => console.log(error));
        }
        return true;
      },
    )
    .required()
    .label('Username'),
  email: Yup.string()
    .required()
    .email()
    .test(
      'isEmailUnique',
      'An account with that email already exists',
      value => {
        if (value) {
          fetch(`http://${BASE_URL}/core/users/?email=${value}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(async res => {
              const data = await res.json();
              return data.length == 0;
            })
            .catch(error => console.log(error));
        }
        return true;
      },
    )
    .label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function RegisterScreen({navigation}) {
  const handleUserRegister = async values => {
    const url = `http://${BASE_URL}/auth/users/`;

    // matching field names of UserCreateSerializer
    values['first_name'] = values['firstName'];
    delete values['firstName'];
    values['last_name'] = values['lastName'];
    delete values['lastName'];

    const options = {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const request = await fetch(url, options);
    const response = await request.json();

    // TODO - consolidate logic here and in login screen into a hook because it's fairly identical
    const loginUrl = `http://${BASE_URL}/auth/jwt/create`;

    const loginOptions = {
      method: 'POST',
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const loginRequest = await fetch(loginUrl, loginOptions);
      if (loginRequest.status === 200) {
        const loginResponse = await loginRequest.json();
        await AsyncStorage.setItem(
          'pollish_user_Token',
          JSON.stringify(loginResponse),
        );

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
    <Screen style={styles.container}>
      <Form
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
        }}
        onSubmit={values => handleUserRegister(values)}
        validationSchema={validationSchema}>
        <View style={styles.nameContainer}>
          <View style={styles.nameColumn}>
            <FormField
              autoCapitalize="words"
              autoCorrect={false}
              icon="account"
              name="firstName"
              placeholder="First name"
            />
          </View>
          <View style={styles.nameColumn}>
            <FormField
              autoCapitalize="words"
              autoCorrect={false}
              icon="account"
              name="lastName"
              placeholder="Last name"
            />
          </View>
        </View>
        <FormField
          autoCorrect={false}
          icon="account"
          name="username"
          placeholder="Username"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  nameColumn: {
    width: '50%',
  },
  nameContainer: {
    flexDirection: 'row',
  },
});

export default RegisterScreen;
