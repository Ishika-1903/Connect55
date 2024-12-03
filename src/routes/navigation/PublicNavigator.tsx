import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen/LoginScreen';
import EmailScreen from '../../screens/EmailScreen/EmailScreen';
import OTPScreen from '../../screens/OTPScreen/OtpScreen';
import PasswordScreen from '../../screens/PasswordScreen/PasswordScreen';
import CreateAccountScreen from '../../screens/CreateAccountScreen/CreateAccountScreen';
import CreateProfileScreen from '../../screens/CreateProfileScreen/CreateProfileScreen';
import ProfilePage from '../../screens/ProfileScreen/ProfileScreen';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import ChatList from '../../components/chatComponent/ChatList';
import NewMessageScreen from '../../screens/NewMessageScreen/NewMessageScreen';
import IndividualChatScreen from '../../screens/ChatScreen/IndividualChatScreen';
import GroupChatScreen from '../../screens/ChatScreen/GroupChatScreen';
import NewGroupChatScreen from '../../screens/NewGroupChatScreen/NewGroupChatScreen';


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
      {/* <PublicStack.Screen name="Profile" component={ProfilePage} />
      <PublicStack.Screen name="Home" component={HomeScreen} />
      <PublicStack.Screen name="ChatList" component={ChatList} />
      <PublicStack.Screen name="IndividualChatScreen" component={IndividualChatScreen}  />
      <PublicStack.Screen name="NewMessage" component={NewMessageScreen}  />
      <PublicStack.Screen name="GroupChatScreen" component={GroupChatScreen}  />
      <PublicStack.Screen name="NewGroupChat" component={NewGroupChatScreen}  /> */}
  </PublicStack.Navigator>
  );
};
export default PublicNavigator;
