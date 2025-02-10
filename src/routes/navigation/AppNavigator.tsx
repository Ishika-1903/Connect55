import React, {useEffect, useState} from 'react';
import PrivateNavigator from './PrivateNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import PublicNavigator from './PublicNavigator';
import {AppStackParamList} from './navigators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';
import { Colors } from '../../utils/constants/colors';

const AppNavigator = () => {
  const AppStack = createNativeStackNavigator<AppStackParamList>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          console.log('tokeeennnn', token);
          setIsLoggedIn(true);
          console.log('setIsLoggedIn', token);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking token:', error);
        setIsLoggedIn(false);
      }
    };
    checkToken();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.darkBlue} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={isLoggedIn ? 'Private' : 'Public'}>
        <AppStack.Screen name="Public" component={PublicNavigator} />
        <AppStack.Screen name="Private" component={PrivateNavigator} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
