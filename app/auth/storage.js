import * as SecureStore from 'expo-secure-store';
import {BASE_URL} from '@env';
import { computeWindowedRenderLimits } from 'react-native/Libraries/Lists/VirtualizeUtils';

// TODO Change to a .env secret
const key = 'pollish_User';
const base = BASE_URL;

const storeTokens = async authTokens => {
  try {
    await SecureStore.setItemAsync(key, authTokens);
  } catch (error) {
    console.log('Error storing the auth token', error);
  }
};

const getTokens = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log('Error getting the auth token', error);
  }
};

const getUser = async () => {
  const res = await getTokens();
  const tokens = JSON.parse(res);
  if (!tokens) return null;

  const url = `http://${base}/auth/users/me/`;
  console.log(tokens.access);

  const options = {
    payload: {},
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${tokens.access}`,
    },
  };
  console.log(url);
  const response = await fetch(url, options);
  if (response.status === 200) {
    // access token exists and still valid
    return await response.json();
  }
};

const removeTokens = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('Error removing the auth token', error);
  }
};

export default {getTokens, getUser, removeTokens, storeTokens};
