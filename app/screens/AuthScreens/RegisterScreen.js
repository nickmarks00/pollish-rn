import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import usersApi from '../../api/users';
import authApi from '../../api/authApi';
import useAuth from '../../auth/useAuth';

import {
  validateName,
  validateUsername,
  validateEmail,
  validatePassword,
} from '../../lib/validators';

import Screen from '../AppScreen';
import {
  AppForm as Form,
  AppFormField as FormField,
} from '../../components/forms';

function RegisterScreen({navigation}) {
  const auth = useAuth();
  const [registerFailed, setRegisterFailed] = useState(false);

  const validationSchema = {
    firstName: validateName,
    lastName: validateName,
    username: validateUsername,
    email: validateEmail,
    password: validatePassword,
  };

  const handleUserRegister = async values => {
    // matching field names of UserCreateSerializer

    values['first_name'] = values['firstName'];
    delete values['firstName'];
    values['last_name'] = values['lastName'];
    delete values['lastName'];

    console.log(values);

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
        title="Register"
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
          autoCapitalize="none"
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
