import {BASE_URL} from '@env';

const register = async values => {
  const base = BASE_URL;
  const url = `http://${base}/auth/users/`;

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
    console.log(data);
    return data;
  } catch (e) {
    console.log('Something went wrong registering...', e);
  }
};

export default {
  register,
};
