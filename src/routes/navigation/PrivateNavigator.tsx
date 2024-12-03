import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import SearchScreen from '../../screens/SearchScreen/SearchScreen';
import AnnouncementScreen from '../../screens/AnnouncementScreen/AnnouncementScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import DummyScreen from '../../screens/DummyScreen';
import CreateProfileScreen from '../../screens/CreateProfileScreen/CreateProfileScreen';
import CreatePostScreen from '../../screens/CreatePostScreen/CreatePostScreen';
import NewChatScreen from '../../screens/NewMessageScreen/NewMessageScreen';
import NewGroupChatScreen from '../../screens/NewGroupChatScreen/NewGroupChatScreen';
import GroupChatScreen from '../../screens/ChatScreen/GroupChatScreen';
import ChatList from '../../components/chatComponent/ChatList';
import IndividualChatScreen from '../../screens/ChatScreen/IndividualChatScreen';
import NewMessageScreen from '../../screens/NewMessageScreen/NewMessageScreen';

const PrivateStack = createNativeStackNavigator();

const PrivateNavigator = () => {
  return (
    <PrivateStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <PrivateStack.Screen name="Home" component={HomeScreen} />
      <PrivateStack.Screen name="Search" component={SearchScreen} />
      <PrivateStack.Screen name="Announcement" component={AnnouncementScreen} />
      <PrivateStack.Screen name="Profile" component={ProfileScreen} />
      <PrivateStack.Screen name="Dummy" component={DummyScreen} />
      <PrivateStack.Screen name="CreatePost" component={CreatePostScreen} />
      <PrivateStack.Screen name="ChatList" component={ChatList} />
      <PrivateStack.Screen name="IndividualChatScreen" component={IndividualChatScreen}  />
      <PrivateStack.Screen name="NewMessage" component={NewMessageScreen}  />
      <PrivateStack.Screen name="GroupChatScreen" component={GroupChatScreen}  />
      <PrivateStack.Screen name="NewGroupChat" component={NewGroupChatScreen}  /> 
    </PrivateStack.Navigator>
  );
};

export default PrivateNavigator;
