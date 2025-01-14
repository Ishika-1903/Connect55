import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {Provider, useDispatch} from 'react-redux';
import store from './src/controller/store';
import AppNavigator from './src/routes/navigation/AppNavigator';
import {connectMqttClient, disconnectMqttClient} from './src/utils/mqttClient';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

const MQTT_BROKER_URL = 'ws://broker.emqx.io:8083/mqtt';

function App(): React.JSX.Element {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   getFCMToken();
  // }, []);

  // const getFCMToken = async () => {
  //   const token = await messaging().getToken();
  //   console.log('my push notifications token', token);
  // };

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

    // .then(res => {
    //   if (res === 'granted') {
    //     Contacts.getAll()
    //       .then(contacts => {
    //         const filteredContacts = contacts.filter(contact =>
    //           contact.emailAddresses?.some(email =>
    //             email.email.endsWith('@fiftyfivetech.io'),
    //           ),
    //         );

    //         console.log(
    //           'Filtered Contacts:',
    //           JSON.stringify(filteredContacts),
    //         );
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    //   }
    // })
    // .catch(err => console.log(err));
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
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
