import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Yup from 'yup';

import {BASE_URL} from '@env';

import usersApi from '../../api/users';
import authApi from '../../api/authApi';
import useAuth from '../../auth/useAuth';

import Screen from '../AppScreen';
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from '../../components/forms';

// TODO Change uniqueness validation to only run after keyboard debounced
// TODO Uniqueness test for username runs when changes to email field and vice-versa

const url = BASE_URL;

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
          fetch(`http://${url}/core/users/?username=${value}`, {
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
          fetch(`http://${url}/core/users/?email=${value}`, {
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
  const auth = useAuth();
  const [registerFailed, setRegisterFailed] = useState(false);

  const handleUserRegister = async values => {
    // matching field names of UserCreateSerializer
    values['first_name'] = values['firstName'];
    delete values['firstName'];
    values['last_name'] = values['lastName'];
    delete values['lastName'];

    const registerApi = await usersApi.register(values);
    console.log(registerApi);
    const loginApi = await authApi.login(values.username, values.password);

    if (loginApi.status === 200) {
      // access token exists and still valid
      setRegisterFailed(false);
      const tokens = await loginApi.json();
      // console.log(tokens);
      auth.logIn(tokens);
    } else {
      setRegisterFailed(true);
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
