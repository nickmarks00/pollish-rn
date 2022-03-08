import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import useAuth from '../auth/useAuth';

import colors from '../config/colors';
import Icon from '../components/Icon';
import {ListItem, ListItemSeparator} from '../components/lists';
import Screen from './AppScreen';

const UserProfileScreen = () => {
  const {user, logOut} = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          // image={require('../assets/mosh.jpg')}
        />
      </View>

      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default UserProfileScreen;
