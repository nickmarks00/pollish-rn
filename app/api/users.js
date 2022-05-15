import {BASE_URL} from '@env';

const register = async values => {
  const url = `${BASE_URL}/auth/users/`;

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
      return data;
    } else {
      console.error('Bad network request');
    }
  } catch (e) {
    console.error('Something went wrong registering...', e);
  }
};

export default {
  register,
};
