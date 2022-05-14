import {BASE_URL} from '@env';

const register = async values => {
  const url = `http://${BASE_URL}/auth/users/`;

  console.log(values);
  console.log(url);

  const options = {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error('Bad network request');
    }
  } catch (e) {
    console.log('Something went wrong registering...', e);
  }
};

export default {
  register,
};
