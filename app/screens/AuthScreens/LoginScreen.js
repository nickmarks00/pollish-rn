import React, {useState} from 'react';
import {StyleSheet, Image} from 'react-native';

import * as Yup from 'yup';

import authApi from '../../api/authApi';
import useAuth from '../../auth/useAuth';

import AppScreen from '../AppScreen';
import {AppForm, AppFormField, SubmitButton} from '../../components/forms';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
  password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen({navigation, ...props}) {
  // const {user, setUser} = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  const auth = useAuth();

  const handleUserLogin = async ({username, password}) => {
    const response = await authApi.login(username, password);
    if (response.status === 200) {
      // access token exists and still valid
      setLoginFailed(false);
      const tokens = await response.json();
      // console.log(tokens);
      auth.logIn(tokens);
    } else {
      setLoginFailed(true);
    }
    console.log(loginFailed);
  };

  return (
    <AppScreen style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/pollish-logo-black.png')}
      />

      <AppForm
        initialValues={{username: '', password: ''}}
        onSubmit={handleUserLogin}
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
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
