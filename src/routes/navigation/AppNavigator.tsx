// import React, {useEffect, useState} from 'react';
// import PrivateNavigator from './PrivateNavigator';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {NavigationContainer} from '@react-navigation/native';
// import PublicNavigator from './PublicNavigator';
// import {AppStackParamList} from './navigators';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import DrawerNavigator from './DrawerNavigator';

// const AppNavigator = () => {
//   const AppStack = createNativeStackNavigator<AppStackParamList>();
//   const Drawer = createDrawerNavigator();
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('authToken');
//         if (token) {
//           setIsLoggedIn(true);
//         } else {
//           setIsLoggedIn(false);
//         }
//       } catch (error) {
//         console.error('Error checking token:', error);
//         setIsLoggedIn(false);
//       }
//     };

//     checkToken();
//   }, []);

//   if (isLoggedIn === null) {
//     return null;
//   }

//   return (
//     <NavigationContainer>
//       <AppStack.Navigator screenOptions={{headerShown: false}}>

//         {isLoggedIn ? (
//           <AppStack.Screen name="Private" component={PrivateNavigator} />

//         ) : (
//           <AppStack.Screen name="Public" component={PublicNavigator} />
//         )}
//       </AppStack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;

import React, {useEffect, useState} from 'react';
import PrivateNavigator from './PrivateNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import PublicNavigator from './PublicNavigator';
import {AppStackParamList} from './navigators';
import Tabs from './BottomTabNavigator';

const AppNavigator = () => {
  const AppStack = createNativeStackNavigator<AppStackParamList>();
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('authToken');
  //       if (token) {
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     } catch (error) {
  //       console.error('Error checking token:', error);
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   checkToken();
  // }, []);

  // if (isLoggedIn === null) {
  //   return null;
  // }

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        {/* {isLoggedIn ? (
          <AppStack.Screen name="Private" component={PrivateNavigator} />
          
        ) : (
          <AppStack.Screen name="Public" component={PublicNavigator} />
        )} */}
        <AppStack.Screen name="Public" component={PublicNavigator} />
        <AppStack.Screen name="Private" component={PrivateNavigator} />
        <AppStack.Screen name="Tabs" component={Tabs} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
