import {BASE_URL} from '@env';

const url = `http://${BASE_URL}/auth/jwt/create`;

const options = {
  method: 'POST',
  body: JSON.stringify(values),
  headers: {
    'Content-Type': 'application/json',
  },
};

class ApiClient {
  constructor(url, values) {
    this.url = url;
    this.values = values;
  }

  get() {}

  post() {}
}
