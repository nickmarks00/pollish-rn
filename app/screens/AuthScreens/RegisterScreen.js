import React, {useState, useContext} from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';

import authApi from '../../api/authApi';
import Loader from '../../components/Loader';
import useApi from '../../hooks/useApi';
import useAuth from '../../auth/useAuth';

import {
  validateName,
  validateUsername,
  validateEmail,
  validatePassword,
} from '../../lib/validators';

import {
  AppForm as Form,
  AppFormField as FormField,
} from '../../components/forms';
import {ErrorMessage} from '../../components/forms';
import Screen from '../AppScreen';
import Wave from '../../components/Wave';

const dimensions = Dimensions.get('screen');

function RegisterScreen() {
  const [registerFailed, setRegisterFailed] = useState(false);
  const auth = useAuth();
  const registerApi = useApi(authApi.register);
  const loginApi = useApi(authApi.login);

  const validationSchema = {
    firstName: validateName,
    lastName: validateName,
    username: validateUsername,
    email: validateEmail,
    password: validatePassword,
  };

  const handleUserRegister = async values => {
    /*
      #TODO on submit fail, if register was successful we need to DELETE the created user profile from the database
    */
    values['email'] = values['email'].toLowerCase();

    const registerResult = await registerApi.request(values);
    const loginResult = await loginApi.request(
      values.username,
      values.password,
    );

    if (loginResult.status === 200 && registerResult.status === 201) {
      // access token exists and still valid
      setRegisterFailed(false);
      await auth.loginWithTokens(loginResult.data);
    } else {
      setRegisterFailed(true);
    }
  };

  return (
    <>
      <Loader visible={registerApi.loading || loginApi.loading} />
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
              <ErrorMessage
                error="Something went wrong registering"
                visible={registerFailed}
              />
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
    </>
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
