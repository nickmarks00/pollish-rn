import React, {useState} from 'react';
import {StyleSheet, Image, View, Dimensions} from 'react-native';

import authApi from '../../api/authApi';
import useAuth from '../../auth/useAuth';

import {
  AppForm as Form,
  AppFormField as FormField,
} from '../../components/forms';
import {ErrorMessage} from '../../components/forms';
import Screen from '../AppScreen';
import Wave from '../../components/Wave';

const dimensions = Dimensions.get('screen');

function LoginScreen({navigation, ...props}) {
  // const {user, setUser} = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  const auth = useAuth();

  const handleUserLogin = async ({username, password}) => {
    const result = await authApi.login(username, password);
    if (!result.status === 200) return setLoginFailed(true);
    setLoginFailed(false);
    auth.loginWithTokens(result.data);
  };

  return (
    <Screen style={styles.container}>
      <Wave>
        <View
          style={{
            alignItems: 'center',
            height: dimensions.height,
            padding: 15,
          }}>
          <Image
            style={styles.logo}
            source={require('../../assets/logos/jpgs/logo1.png')}
          />
          <Form
            initialValues={{username: '', password: ''}}
            onSubmit={handleUserLogin}
            title="Login">
            <ErrorMessage
              error="Something went wrong logging in. Try again."
              visible={loginFailed}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              name="username"
              placeholder="Username"
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
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
