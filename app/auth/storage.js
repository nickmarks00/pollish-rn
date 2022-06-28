import * as SecureStore from 'expo-secure-store';
<<<<<<< HEAD
import {BASE_URL} from '@env';
import {computeWindowedRenderLimits} from 'react-native/Libraries/Lists/VirtualizeUtils';
=======
>>>>>>> main

// TODO Change to a .env secret
const key = 'pollish_User';

const storeTokens = async authTokens => {
  try {
    await SecureStore.setItemAsync(key, authTokens);
  } catch (error) {
    console.error('Error storing the auth token', error);
  }
};

const getTokens = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('Error getting the auth token', error);
  }
};

const getAccess = async () => {
  const tokens = await getTokens();
  if (!tokens) return null;
  const access = JSON.parse(tokens).access;

<<<<<<< HEAD
  const userUrl = `http://${base}/auth/users/me/`;

  const userOptions = {
    payload: {},
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${tokens.access}`,
    },
  };
  const response = await fetch(userUrl, userOptions);
  if (response.status === 200) {
    // access token exists and still valid
    return await response.json();
  }
};

const getProfile = async () => {
  const res = await getTokens();
  const tokens = JSON.parse(res);
  if (!tokens) return null;

  const profileUrl = `http://${base}/pollish/profiles/me/`;

  const profileOptions = {
    payload: {},
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${tokens.access}`,
    },
  };
  const response = await fetch(profileUrl, profileOptions);
  if (response.status === 200) {
    // access token exists and still valid
    return await response.json();
  }
=======
  return access;
};

const getRefresh = async () => {
  const tokens = await getTokens();
  if (!tokens) return null;
  const refresh = JSON.parse(tokens).refresh;

  return refresh;
>>>>>>> main
};

const removeTokens = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Error removing the auth token', error);
  }
};

<<<<<<< HEAD
export default {getTokens, getUser, getProfile, removeTokens, storeTokens};
=======
export default {getTokens, removeTokens, storeTokens, getAccess, getRefresh};
>>>>>>> main
