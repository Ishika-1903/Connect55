import axios from 'axios';
import store from '../controller/store';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const apiClient = axios.create({
  baseURL: 'http://localhost:9000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const baseURLPhoto = 'http://localhost:9000';

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
  console.log('state.auth.token', state.auth.token);
  return state.auth.token;
};

apiClient.interceptors.request.use(
  async config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log('check',error);
    return Promise.reject(error);
  },
);
apiClient.interceptors.response.use(
  response => {
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response;
  },
  async error => {
    console.log('Error:', JSON.stringify(error, null, 2));
 
    let errorTitle = '';
   
    return Promise.reject(error.response);
  },
);