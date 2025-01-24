import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import SearchScreen from '../../screens/SearchScreen/SearchScreen';
import AnnouncementScreen from '../../screens/AnnouncementScreen/AnnouncementScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import DummyScreen from '../../screens/DummyScreen';
import CreatePostScreen from '../../screens/CreatePostScreen/CreatePostScreen';
import NewGroupChatScreen from '../../screens/NewGroupChatScreen/NewGroupChatScreen';
import GroupChatScreen from '../../screens/ChatScreen/GroupChatScreen';
import ChatList from '../../components/chatComponent/ChatList';
import IndividualChatScreen from '../../screens/ChatScreen/IndividualChatScreen';
import NewMessageScreen from '../../screens/NewMessageScreen/NewMessageScreen';
import PublicNavigator from './PublicNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabStackParamList} from './navigators';
import {useNavigation} from '@react-navigation/native';
import InviteScreen from '../../screens/InviteScreen/InviteScreen';
import AboutGroupScreen from '../../screens/AboutGroupScreen/AboutGroupScreen';
import EditAboutGroupScreen from '../../screens/EditAboutGroupScreen/EditAboutGroupScreen';
import AddGroupMembers from '../../screens/AddGroupMembers/AddGroupMembers';
import BottomTabNavigator from './BottomTabNavigator';

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

const PrivateStack = createNativeStackNavigator();

const PrivateNavigator = () => {
  return (
    <PrivateStack.Navigator screenOptions={{headerShown: false}}>
      <PrivateStack.Screen
        name="HomeTabs"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <PrivateStack.Screen name="Home" component={HomeScreen} />
      <PrivateStack.Screen name="Search" component={SearchScreen} />
      <PrivateStack.Screen name="Announcement" component={AnnouncementScreen} />
      <PrivateStack.Screen name="Profile" component={ProfileScreen} />
      <PrivateStack.Screen name="Dummy" component={DummyScreen} />
      <PrivateStack.Screen name="CreatePost" component={CreatePostScreen} />
      <PrivateStack.Screen name="ChatList" component={ChatList} />
      <PrivateStack.Screen
        name="IndividualChatScreen"
        component={IndividualChatScreen}
      />
      <PrivateStack.Screen name="NewMessage" component={NewMessageScreen} />
      <PrivateStack.Screen name="GroupChatScreen" component={GroupChatScreen} />
      <PrivateStack.Screen name="NewGroupChat" component={NewGroupChatScreen} />
      <PrivateStack.Screen name="Invite" component={InviteScreen} />
      <PrivateStack.Screen name="AboutGroup" component={AboutGroupScreen} />
      <PrivateStack.Screen
        name="EditAboutGroup"
        component={EditAboutGroupScreen}
      />
      <PrivateStack.Screen name="AddGroupMembers" component={AddGroupMembers} />
      <PrivateStack.Screen name="Public" component={PublicNavigator} />
    </PrivateStack.Navigator>
  );
};

export default PrivateNavigator;
