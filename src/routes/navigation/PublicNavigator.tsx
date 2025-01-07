import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen/LoginScreen';
import EmailScreen from '../../screens/EmailScreen/EmailScreen';
import OTPScreen from '../../screens/OTPScreen/OtpScreen';
import PasswordScreen from '../../screens/PasswordScreen/PasswordScreen';
import CreateAccountScreen from '../../screens/CreateAccountScreen/CreateAccountScreen';
import CreateProfileScreen from '../../screens/CreateProfileScreen/CreateProfileScreen';
import DummyChatScreen from '../../screens/DummyChatScreen';
import ChatList from '../../components/chatComponent/ChatList';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import IndividualChatScreen from '../../screens/ChatScreen/IndividualChatScreen';


const PublicStack = createNativeStackNavigator();

const PublicNavigator = () => {
  return ( 
  <PublicStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
    <PublicStack.Screen name="Login" component={LoginScreen} />
      <PublicStack.Screen name="Email" component={EmailScreen} />
      <PublicStack.Screen name="OTP" component={OTPScreen} />
      <PublicStack.Screen name="Password" component={PasswordScreen} />
      <PublicStack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <PublicStack.Screen name="CreateProfile" component={CreateProfileScreen} />
      <PublicStack.Screen name="DummyChat" component={DummyChatScreen} />
  </PublicStack.Navigator>
  );
};
export default PublicNavigator;
