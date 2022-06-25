import client from './client';

const register = async values => {
  try {
    const response = await client.post('/auth/users/', values);
    return response;
  } catch (e) {
    console.error(e);
  }
};

const login = async (username, password) => {
  try {
    const response = await client.post('/auth/jwt/create/', {
      username,
      password,
    });

    if (response.status === 200) {
      return response;
    }
  } catch (e) {
    Promise.resolve('Incorrect username or password');
  }
};

const getUser = async tokens => {
  if (!tokens) return null;

  const response = await client.get('/auth/users/me/', {
    headers: {
      Authorization: `JWT ${tokens.access}`,
    },
  });
  if (response.status === 200) {
    // access token exists and still valid
    return response.data;
  }
  return Promise.reject(response.status);
};

export default {
  login,
  register,
  getUser,
};
