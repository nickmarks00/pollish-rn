import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';

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

function RegisterScreen() {
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
    values['email'] = values['email'].toLowerCase();

    // TODO - handle logic better here; what should happen when registerApi fails?
    const registerApi = await authApi.register(values);
    const loginApi = await authApi.login(values.username, values.password);

    if (loginApi.status === 200 && registerApi.status === 201) {
      // access token exists and still valid
      setRegisterFailed(false);
      auth.loginWithTokens(loginApi.data);
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
              first_name: '',
              last_name: '',
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
                  name="first_name"
                  placeholder="First name"
                />
              </View>
              <View style={styles.nameColumn}>
                <FormField
                  autoCapitalize="words"
                  autoCorrect={false}
                  icon="account"
                  name="last_name"
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
