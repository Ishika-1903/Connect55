import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogoutScreen from '../../screens/LogoutScreen/LogoutScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfilePage from '../../screens/ProfileScreen/ProfileScreen';

const DrawerStack = createDrawerNavigator();

const DrawerNavigator = () => {
  return ( 
    <DrawerStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Profile">
        <DrawerStack.Screen name="Profile" component={ProfilePage} />
    <DrawerStack.Screen name="Logout" component={LogoutScreen} />

    </DrawerStack.Navigator>
  );
};

export default DrawerNavigator;