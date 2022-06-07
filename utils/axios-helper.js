import axios from 'axios';
import { HTTP_STATUS } from '../constants';
// import localStorageHelper from './local-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
  baseURL: 'http://192.168.2.141:8083/api',
  headers: {
    'content-type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async function (config) {
    const token  = await AsyncStorage.getItem('@token');
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === HTTP_STATUS.HTTP_FORBIDDEN) {
      // Router.replace('/pages/login');
    }
    return Promise.reject(error);
  }
);

export { axiosClient };
