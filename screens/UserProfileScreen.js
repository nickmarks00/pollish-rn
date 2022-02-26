import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {AuthUserContext} from '../lib/context';

import Screen from './AppScreen';

const UserProfileScreen = props => {
  const user = useContext(AuthUserContext);
  console.log(user);

  return (
    <Screen style={styles.container}>
      <View>
        <Text>Welcome {user.username}</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default UserProfileScreen;
