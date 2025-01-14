export type PrivateNavigatorParamList = {
  Home: undefined;
  Search: undefined;
  Announcement: undefined;
  Profile: undefined;
  Dummy: undefined;
  CreatePost: undefined;
  IndividualChatScreen: undefined;
  ChatList: undefined;
  NewMessage: undefined;
  NewGroupChat: undefined;
  GroupChatScreen: undefined;
  Invite:undefined;
  AboutGroup:undefined;
  Public: {screen: keyof PublicNavigatorParamList; params?: any};
};

export type PublicNavigatorParamList = {
  Login: undefined;
  Email: undefined;
  OTP: undefined;
  Password: undefined;
  SignUp: undefined;
  CreateProfile: undefined;
  DummyChat: undefined;
};

export type DrawerNavigatorParamList = {
  Logout: undefined;
};

export type AppStackParamList = {
  //Private: {count: number};
  Private: undefined;
  Public: undefined;
  Tabs: undefined;
};

export type BottomTabStackParamList = {
    Home: undefined;
    Search: undefined;
    Announcement: undefined;
    Profile: undefined;
  };