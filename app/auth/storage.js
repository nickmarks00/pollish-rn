import * as SecureStore from 'expo-secure-store';

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

  return access;
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
  return access;
};

const getRefresh = async () => {
  const tokens = await getTokens();
  if (!tokens) return null;
  const refresh = JSON.parse(tokens).refresh;

  return refresh;
};

const removeTokens = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Error removing the auth token', error);
  }
};

export default {
  getTokens,
  getAccess,
  getRefresh,
  getProfile,
  removeTokens,
  storeTokens,
};
