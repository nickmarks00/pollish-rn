import axios from 'axios';
import authStorage from '../auth/storage';

import settings from '../config/settings';

import logger from '../utilities/logger';

const client = axios.create({
  baseURL: settings.apiUrl,
});

client.interceptors.request.use(async config => {
  const accessToken = await authStorage.getAccess();
  if (accessToken) {
    config.headers['Authorization'] = `JWT ${accessToken}`;
  }
  return config;
});

client.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const config = error.config;

    logger.log(new Error(error.response));
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
    logger.log(new Error(error));
    return Promise.reject(error);
  },
);

export default client;
