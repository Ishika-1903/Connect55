import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import SearchScreen from '../../screens/SearchScreen/SearchScreen';
import AnnouncementScreen from '../../screens/AnnouncementScreen/AnnouncementScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import {Colors} from '../../utils/constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatList from '../../components/chatComponent/ChatList';
import {StyleSheet, Text, View} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color}) => {
          let iconName: string = '';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'ChatList') iconName = 'email';
          else if (route.name === 'Announcement') iconName = 'campaign';
          else if (route.name === 'Profile') iconName = 'person';

          return (
            <View
              style={{
                marginTop: 7,
              }}>
              <MaterialIcons name={iconName} size={25} color={color} />
              {route.name === 'ChatList' && unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.white,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          backgroundColor: Colors.darkBlue,
          height: 55,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="ChatList" component={ChatList} />
      <Tab.Screen name="Announcement" component={AnnouncementScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 7,
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 18,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BottomTabNavigator;
