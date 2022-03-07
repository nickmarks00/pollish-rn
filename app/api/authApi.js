import {BASE_URL} from '@env';

const login = async (username, password) => {
  const url = `http://${BASE_URL}/auth/jwt/create`;

  const values = {username, password};
  console.log(values);

  const options = {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, options);

  return response;
};

export default {
  login,
};
