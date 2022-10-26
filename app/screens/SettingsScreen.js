import React, {useState} from 'react';
import * as Yup from 'yup';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

import useAuth from '../auth/useAuth';

import AppText from '../components/AppText';
import colors from '../config/colors';
import Icon from '../components/Icon';
import {ListItem, ListItemSeparator} from '../components/lists';
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from '../components/forms';

const SettingsScreen = ({navigation}) => {
  const {user, profile, logOut} = useAuth();

  const userValidationSchema = Yup.object().shape({
    firstName: Yup.string().label('First name'),
    lastName: Yup.string().label('Last name'),
    username: Yup.string()
      .min(3, 'A minimum of 3 characters is required')
      .max(25, 'Maximum allowable username length is 25')
      .label('Username'),
    email: Yup.string().email().label('Email'),
  });

  const profileValidationSchema = Yup.object().shape({
    bio: Yup.string().label('Bio'),
  });

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons
              name="ios-arrow-back"
              size={24}
              color="#52575D"></Ionicons>
          </TouchableOpacity>
        </View>
        <View styles={styles.formContainer}>
          <Form
            initialValues={{
              firstName: user['first_name'],
              lastName: user['last_name'],
              username: user.username,
              email: user.email,
            }}
            onSubmit={values => handleUserUpdate(values)}
            validationSchema={userValidationSchema}>
            <View style={styles.nameContainer}>
              <View style={styles.nameColumn}>
                <FormField
                  autoCapitalize="words"
                  autoCorrect={false}
                  icon="account"
                  name="firstName"
                  placeholder={user.first_name}
                />
              </View>
              <View style={styles.nameColumn}>
                <FormField
                  autoCapitalize="words"
                  autoCorrect={false}
                  icon="account"
                  name="lastName"
                  placeholder={user.last_name}
                />
              </View>
            </View>
            <FormField
              autoCorrect={false}
              icon="account"
              name="username"
              placeholder={user.username}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder={user.email}
              textContentType="emailAddress"
            />
            <SubmitButton title="Update user" />
          </Form>
          <Form
            initialValues={{
              bio: profile.bio,
            }}
            onSubmit={values => handleProfileUpdate(values)}
            validationSchema={userValidationSchema}>
            <FormField
              autoCorrect={false}
              icon="bio"
              name="bio"
              placeholder={profile.bio}
            />
            <SubmitButton title="Update profile" />
          </Form>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  formContainer: {
    marginHorizontal: 20,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
});

export default SettingsScreen;
