import React from 'react';
import {StyleSheet} from 'react-native';
import * as Yup from 'yup';

import Screen from './AppScreen';
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from '../components/forms';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label('First name'),
  username: Yup.string().required().label('Username'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function RegisterScreen() {
  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{firstName: '', username: '', email: '', password: ''}}
        onSubmit={values => console.log(values)}
        validationSchema={validationSchema}>
        <FormField
          autoCorrect={false}
          icon="account"
          name="firstName"
          placeholder="First name"
        />
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
});

export default RegisterScreen;