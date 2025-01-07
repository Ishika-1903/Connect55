import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import SearchScreen from '../../screens/SearchScreen/SearchScreen';
import AnnouncementScreen from '../../screens/AnnouncementScreen/AnnouncementScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import CustomBottomTab from '../../components/bottomTab/CustomBottomTab';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../utils/constants/colors';
import { Icon } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const navigation = useNavigation();
// const tabs = [
//     {icon: 'home', onPress: () => console.log('Home pressed')},
//     {icon: 'search', onPress: () => navigation.navigate('Search')},

//     // {icon: 'add-box', onPress: () => console.log('Home pressed')},
//     {
//       icon: 'email',
//       onPress: () => navigation.navigate('ChatList'),
//       // unreadCount: unreadCount,
//     },
//     {icon: 'campaign', onPress: () => navigation.navigate('Announcement')},
//     {icon: 'person', onPress: () => navigation.navigate('Profile')},
//   ];


  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string = '';

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Search') {
          iconName = 'search';
        } else if (route.name === 'Announcement') {
          iconName = 'campaign';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        }

        // Render tab icon
        return (
          <Icon
            name={iconName}
            size={size || 24}
            color={color || Colors.darkBlue}
          />
        );
      },
      tabBarActiveTintColor: Colors.darkBlue, // Active tab icon color
      tabBarInactiveTintColor: Colors.gray, // Inactive tab icon color
      tabBarStyle: {
        backgroundColor: Colors.darkBlue, // Tab bar background
        height: 60, // Height of the tab bar
        borderTopLeftRadius: 20, // Rounded corners (top left)
        borderTopRightRadius: 20, // Rounded corners (top right)
        paddingVertical: 5, // Adjust padding
      },
      tabBarLabelStyle: {
        fontSize: 12, // Label font size
        fontWeight: 'bold', // Label font weight
      },
    })}
  >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Announcement" component={AnnouncementScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
