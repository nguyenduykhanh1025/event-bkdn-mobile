import axios from 'axios';
import { HTTP_STATUS } from '../constants';
// import localStorageHelper from './local-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.3:8088/api',
  headers: {
    'content-type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem('@token');
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    console.log('response', response);
    return response;
  },
  function (error) {
    if (error.response && error.response.status === HTTP_STATUS.HTTP_FORBIDDEN) {
      // console.log('error.response', error.response.status);
      // if (navigationRef.isReady()) {
      //   navigationRef.navigate('Login');
      // }
    }
    return Promise.reject(error);
  }
);

export { axiosClient };
