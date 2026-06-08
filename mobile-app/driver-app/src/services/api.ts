import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// In development with Android emulator, localhost is 10.0.2.2
// For a physical device, this needs to be the LAN IP of the dev machine.
export const BASE_URL = __DEV__ 
  ? Platform.OS === 'android' ? 'http://10.0.2.2:5000/api' : 'http://localhost:5000/api'
  : 'https://api.cargohub.com/api'; // Production URL

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 5 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'X-Platform': Platform.OS,
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('@cargohub_driver_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('Error getting token from AsyncStorage', e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
