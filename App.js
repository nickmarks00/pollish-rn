import React, {useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import {AuthContext} from './app/auth/context';
import authStorage from './app/auth/storage';

import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUserProfile = async () => {
    const user = await authStorage.getUser();
    const profile = await authStorage.getProfile();
    if (user) setUser(user);
    if (profile) setProfile(profile);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUserProfile}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthContext.Provider value={{user, setUser, profile, setProfile}}>
      <NavigationContainer theme={MyTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
