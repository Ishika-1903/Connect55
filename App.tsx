import React, {useEffect, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {Provider, useDispatch} from 'react-redux';
import store from './src/controller/store';
import AppNavigator from './src/routes/navigation/AppNavigator';
import {connectMqttClient, disconnectMqttClient} from './src/utils/mqttClient';
import {Alert, PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';

const MQTT_BROKER_URL = 'ws://broker.emqx.io:8083/mqtt';
// const MQTT_BROKER_URL ='mqtt://localhost:1883'

function App(): React.JSX.Element {

  const requestUserPermission = async() => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if(granted === PermissionsAndroid.RESULTS.GRANTED) {
      //Alert.alert('Permission Granted'); 
      getFCMToken();
    }
    else{
      //Alert.alert('permission Denied');
    }
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      onDisplayNotification(remoteMessage)
    });

    return unsubscribe;
  }, []);


const onDisplayNotification = async remoteMessage => {
  try {
    const notifeePermission = await notifee.requestPermission();
    if (!notifeePermission) {
      console.error('Notification permission denied');
      return;
    }

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: 4, 
    });
    const title = remoteMessage.notification?.title || remoteMessage.data?.title || 'Default Title';
    const body = remoteMessage.notification?.body || remoteMessage.data?.body || 'Default Body';

    console.log('Remote message:', remoteMessage);

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', 
        pressAction: {
          id: 'default',
        },
      },
    });
    console.log('Notification displayed');
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
};

  const dispatch = useDispatch();

  useEffect(() => {
    requestUserPermission();

  }, []);

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('My FCM Token:', token);
      if (token) {
        await AsyncStorage.setItem('fcmToken', token);
        console.log('FCM Token stored in AsyncStorage');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  useEffect(() => {
    ReadContacts();
  });

  const ReadContacts = async () => {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      },
    );
    console.log('Requested Permission Result:', result);
  };

  useEffect(() => {
    const client = connectMqttClient(MQTT_BROKER_URL, dispatch);
    return () => {
      console.log('Disconnecting MQTT client...');
      disconnectMqttClient(dispatch);
    };
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider>
        <AppNavigator />
        {/* <Screen/> */}
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
