import {BASE_URL} from '@env';

const register = async values => {
  const url = `http://${BASE_URL}/auth/users/`;

  const options = {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log('Something went wrong registering...', e);
  }
};

export default {
  register,
};
