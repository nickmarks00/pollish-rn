import client from './client';
import authStorage from '../auth/storage';

const register = async values => {
  const response = await client.post('/auth/users/', values);
  return response;
};

const login = async (username, password) => {
  const response = await client.post('/auth/jwt/create/', {
    username,
    password,
  });
  return response;
};

const getUser = async () => {
  const res = await authStorage.getTokens();
  const tokens = JSON.parse(res);
  console.log(`getUser ${tokens.access}`);
  if (!tokens) return null;

  const response = await client.get('/auth/users/me/', {
    headers: {
      authorization: tokens.access,
    },
  });
  if (response.status === 200) {
    // access token exists and still valid
    return response.data;
  }
};

export default {
  login,
  register,
  getUser,
};
