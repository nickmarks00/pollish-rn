import {BASE_URL} from '@env';

const base = BASE_URL
const url = `http://${base}/auth/jwt/create`;

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
