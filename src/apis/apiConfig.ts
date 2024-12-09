import axios from 'axios';
import store from '../controller/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiClient = axios.create({
  baseURL: 'https://3c39-2401-4900-883e-6931-4d9e-1115-b990-ba42.ngrok-free.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

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