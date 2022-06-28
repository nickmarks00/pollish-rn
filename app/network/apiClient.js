import {BASE_URL} from '@env';
import axios from 'axios';
import authStorage from '../auth/storage'

const base = BASE_URL

const axiosClient = axios.create({
    baseURL: `http://${base}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

axiosClient.interceptors.request.use(
    async (config) => {
      config.headers.authorization = 'JWT ' + await authStorage.getAccess();
      return config;
    },
    error => Promise.reject(error)
  );

axiosClient.interceptors.response.use(
    function (response) {
      return response;
    }, 
    function (error) {
      let res = error.response;
      if (res.status == 401) {
        console.log('Error 401')
      }
      console.error("Looks like there was a problem. Status Code: " + res.status);
      return Promise.reject(error);
    }
);




export default axiosClient;

