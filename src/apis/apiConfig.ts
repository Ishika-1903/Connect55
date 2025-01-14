import axios from 'axios';
import store from '../controller/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiClient = axios.create({
  baseURL: 'https://c1ea-14-98-138-141.ngrok-free.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const baseURLPhoto =
'https://c1ea-14-98-138-141.ngrok-free.app';

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('authToken', token); 
    console.log('Token saved successfully');

    checkSavedToken();
    
  } catch (error) {
    console.error('Error saving token to AsyncStorage:', error);
  }
};

const checkSavedToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token !== null) {
      console.log('Saved Token:', token);
    } else {
      console.log('No token found');
    }
  } catch (error) {
    console.error('Error retrieving token from AsyncStorage:', error);
  }
};

const getToken = () => {
  const state = store.getState(); 
  console.log('state.auth.token', state.auth.token) 
  return state.auth.token;        
};

apiClient.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);