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
  const access = JSON.parse(tokens).access;

  return access;
};

const removeTokens = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Error removing the auth token', error);
  }
};

export default {getTokens, removeTokens, storeTokens, getAccess};
