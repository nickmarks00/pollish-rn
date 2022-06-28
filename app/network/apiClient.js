import {REACT_APP_REACT_APP_BASE_URL} from '@env';
import axios from 'axios';
import authStorage from '../auth/storage';

const axiosClient = axios.create({
  baseURL: `${REACT_APP_REACT_APP_BASE_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async config => {
    const accessToken = await authStorage.getAccess();
    if (accessToken) {
      config.headers['Authorization'] = `JWT ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const config = error.config;

    // Already attempted refresh
    if (
      error.response.status === 401 &&
      config.url === client.baseURL + '/auth/jwt/refresh/'
    ) {
      return Promise.reject('Unauthorized request on token refresh');
    }

    // First attempt at refresh
    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      console.log('Refreshing access token...');
      const refresh = await authStorage.getRefresh();
      const {data: newToken} = await client.post('/auth/jwt/refresh/', {
        refresh,
      });
      await authStorage.storeTokens(
        JSON.stringify({
          access: newToken.access,
          refresh: refresh,
        }),
      );

      client.defaults.headers['Authorization'] = `JWT ${newToken.access}`;
      config.headers['Authorization'] = `JWT ${newToken.access}`;

      return client(config);
    }
    console.error(
      'Looks like there was a problem. Status Code: ' + error.response.status,
    );
    return Promise.reject(error);
  },
);

export default axiosClient;
