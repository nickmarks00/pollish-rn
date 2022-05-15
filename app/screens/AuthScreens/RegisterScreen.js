import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';

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
import Wave from '../../components/Wave';

const dimensions = Dimensions.get('screen');

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

    const registerApi = await usersApi.register(values);
    const loginApi = await authApi.login(values.username, values.password);

    if (loginApi.status === 200) {
      // access token exists and still valid
      setRegisterFailed(false);
      const tokens = await loginApi.json();
      auth.logIn(tokens);
    } else {
      setRegisterFailed(true);
    }
  };

  return (
    <Screen style={styles.container}>
      <Wave>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: dimensions.height,
            padding: 15,
          }}>
          <Image
            style={styles.logo}
            source={require('../../assets/logos/jpgs/logo1.png')}
          />
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
        </View>
      </Wave>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 60,
    position: 'absolute',
    top: 0,
  },
  nameColumn: {
    width: '48%',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RegisterScreen;
