import React from 'react';
import {StyleSheet, Image, View, Dimensions} from 'react-native';

import {
  AppForm as Form,
  AppFormField as FormField,
} from '../../components/forms';
import AppText from '../../components/AppText';
import {ErrorMessage} from '../../components/forms';
import Screen from '../AppScreen';
import Wave from '../../components/Wave';

import {validateAccountExistsWithEmail} from '../../lib/validators';

import authApi from '../../api/authApi';

const dimensions = Dimensions.get('screen');

const SendResetEmailScreen = ({navigation}) => {
  const validationSchema = {
    email: validateAccountExistsWithEmail,
  };

  const handleSubmit = async (values, navigation) => {
    const {email} = values;
    await authApi.emailUserWithEmail(email);
    navigation.navigate('Sent Email');
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
            initialValues={{email: ''}}
            title="recover my password"
            validationSchema={validationSchema}
            onSubmit={values => handleSubmit(values, navigation)}>
            <AppText style={styles.instructionText}>
              Drop your email below...
            </AppText>
            <ErrorMessage
              error="Hmmm...an account with that email doesn't exist 😬"
              visible={false}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              name="email"
              placeholder="Email"
            />
          </Form>
        </View>
      </Wave>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  forgotButton: {
    width: '100%',
  },
  forgotButtonText: {
    textTransform: 'none',
    fontSize: 15,
  },
  instructionText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});

export default SendResetEmailScreen;
