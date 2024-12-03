import React from 'react';
import PrivateNavigator from './PrivateNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PublicNavigator from './PublicNavigator';
import { AppStackParamList } from './navigators';
import DrawerNavigator from './DrawerNavigator';


const AppNavigator = () => {
  const AppStack = createNativeStackNavigator<AppStackParamList>();
  return (
    <NavigationContainer>
    <AppStack.Navigator screenOptions={{headerShown:false}} initialRouteName='Public'>
        <AppStack.Screen name="Private" component={PrivateNavigator} />
        <AppStack.Screen name="Public" component={PublicNavigator} />
        <AppStack.Screen name="Drawer" component={DrawerNavigator} />
      </AppStack.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigator;
