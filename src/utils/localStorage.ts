import AsyncStorage from '@react-native-async-storage/async-storage';
import {storageKey} from './constants/authKey';
import store from '../controller/store';

// export const saveToken = async (token: string) => {
//   try {
//     await AsyncStorage.setItem('authToken', token);
//     //    await AsyncStorage.setItem(storageKey.auth, token);
//     console.log('Token saved successfully');
//     checkSavedToken();
//   } catch (error) {
//     console.error('Error saving token to AsyncStorage:', error);
//   }
// };

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(storageKey.authToken, token);
    console.log('Token saved successfully');
    checkSavedToken();
  } catch (error) {
    console.error('Error saving token to AsyncStorage:', error);
  }
};

const checkSavedToken = async () => {
  try {
    const token = await AsyncStorage.getItem(storageKey.authToken);
    if (token !== null) {
      console.log('Saved Token:', token);
    } else {
      console.log('No token found');
    }
  } catch (error) {
    console.error('Error retrieving token from AsyncStorage:', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(storageKey.authToken);
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// export const getToken = () => {
//   const state = store.getState();
//   return state.auth.token;
// };
