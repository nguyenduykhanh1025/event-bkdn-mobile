import axios from 'axios';
import { HTTP_STATUS } from '../constants';
// import localStorageHelper from './local-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
export const navigationRef = React.createRef();

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.122:8088/api',
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
      navigationRef.current?.navigate('Login');
    }
    return Promise.reject(error);
  }
);

export { axiosClient };
