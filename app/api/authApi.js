import {BASE_URL} from '@env';

const login = async (username, password) => {
  const base = BASE_URL;
  
  const url = `http://${base}/auth/jwt/create`;
  console.log(url);
  const values = {username, password};
  console.log(values);
  console.log(url);

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
