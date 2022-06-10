import axios from 'axios';
import {BASE_URL} from '@env';
import authStorage from '../auth/storage';

const client = axios.create({
  baseURL: `${BASE_URL}`,
});

// client.interceptors.request.use(async config => {
//   const authToken = await authStorage.getTokens();
//   if (authToken) {
//     config.headers['Authorization'] = `JWT ${authToken.access}`;
//   }
//   return config;
// });

client.interceptors.response.use(
  response => response,
  error => {
    throw error;
  },
);

/*  
TO-DO for Axios:
- Add global axios defaults e.g. authorization tokens
- 


*/

export default client;
