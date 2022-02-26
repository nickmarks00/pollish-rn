import {useEffect, useState, useRef, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '@env';

export function useAuthData() {
  const user = useRef(null);
  const tokens = useRef(null);
  const didResolveUser = useRef(false);

  useEffect(() => {
    const getSessionState = async () => {
      const storedTokens = await AsyncStorage.getItem('@pollish_user_Token');

      if (storedTokens) {
        tokens.current = await JSON.parse(storedTokens);
        return true;
      }
      return false;
    };

    const getCurrentUser = async () => {
      const url = `http://${BASE_URL}/auth/users/me`;

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${tokens.current.access}`,
        },
      };

      const response = await fetch(url, options);
      if (response.status === 200) {
        // access token exists and still valid
        user.current = await response.json();
        return true;
      }
      return false;
    };

    const fetchUserSession = async () => {
      const isActiveSession = await getSessionState();

      if (isActiveSession && tokens.current) {
        didResolveUser.current = await getCurrentUser();
      }
    };

    fetchUserSession().catch(console.error);
  }, []);

  return user.current;
}
