import React, {useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import {AuthContext} from './app/auth/context';
import authApi from './app/api/authApi';
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
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const tokens = await authStorage.getAccess();
    if (tokens) {
      const user = await authApi.getUser(tokens);
      setUser(user);
    }
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer theme={MyTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
