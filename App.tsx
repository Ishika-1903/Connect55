import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { Provider, useDispatch } from 'react-redux';
import store from './src/controller/store';
import AppNavigator from './src/routes/navigation/AppNavigator';
import { connectMqttClient, disconnectMqttClient } from './src/utils/mqttClient';
import messaging from '@react-native-firebase/messaging';
const MQTT_BROKER_URL = 'ws://broker.emqx.io:8083/mqtt';

function App(): React.JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    getFCMToken();
  }, []);

    const getFCMToken = async () => {
    const token = await messaging().getToken();
    console.log('my push notifications token', token);
  };

  useEffect(() => {
    
    const client = connectMqttClient(MQTT_BROKER_URL, dispatch);

    return () => {
      console.log('Disconnecting MQTT client...');
      disconnectMqttClient(dispatch); 
    };
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <AppNavigator /> 
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

// Wrap your App component with the Provider at the root level
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);


// import React, {useEffect, useState} from 'react';
// import {Provider} from 'react-redux';
// import store from './src/controller/store';
// import {PaperProvider} from 'react-native-paper';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import mqtt from 'precompiled-mqtt';
// import {USERS} from './src/utils/constants/mqttConstants';
// import AppNavigator from './src/routes/navigation/AppNavigator';

// function App(): React.JSX.Element {
//   const [client, setClient] = useState<any>(null);
//   const [currentUser, setCurrentUser] = useState<'user1' | 'user2'>('user1');
//   const [message, setMessage] = useState('');
//   const [chatMessages, setChatMessages] = useState<
//     {sender: string; message: string; timestamp: string}[]
//   >([]);

//   // const getFCMToken = async () => {
//   //   const token = await messaging().getToken();
//   //   console.log('my token', token);
//   // };

//   // useEffect(() => {
//   //   console.log('ishika');
//   //   const unsubscribe = messaging().onMessage(async remoteMessage => {
//   //     console.log('ishika2222');
//   //     const {title, body} = remoteMessage.notification;
//   //     console.log('message received', title);

//   //     displayNotification(title, body);
//   //   });
//   //   return unsubscribe;
//   // }, []);

//   // const displayNotification = async (title: string, body: string) => {
//   //   try {
//   //     await notifee.requestPermission();

//   //     const channelId = await notifee.createChannel({
//   //       id: 'default',
//   //       name: 'Default Channel',
//   //       vibration: true,
//   //       importance: AndroidImportance.HIGH,
//   //       vibrationPattern: [300, 500],
//   //     });

//   //     await notifee.displayNotification({
//   //       title: title,
//   //       body: body,
//   //       android: {
//   //         channelId,
//   //         importance: AndroidImportance.HIGH,
//   //         pressAction: {
//   //           id: 'default',
//   //         },
//   //       },
//   //     });
//   //   } catch (error) {
//   //     console.error('Error displaying notification:', error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   getFCMToken();
//   // }, []);

//   useEffect(() => {
//     const mqttClient = mqtt.connect('ws://broker.emqx.io:8083/mqtt');
//     mqttClient.on('connect', () => {
//       console.log('Connected to MQTT broker');
//       mqttClient.subscribe('chat/+/messages', err => {
//         if (err) {
//           console.error('Subscription error:', err);
//         } else {
//           console.log('Subscribed to topic');
//         }
//       });
//     });

//     mqttClient.on('message', (topic, payload) => {
//       if (topic === 'chat/+/messages') {
//         const parsedMessage = JSON.parse(payload.toString());
//         console.log(`Message received on topic ${topic}:`, parsedMessage);
//         setChatMessages(prev => [
//           ...prev,
//           {
//             sender: parsedMessage.senderId,
//             message: parsedMessage.message,
//             timestamp: parsedMessage.timestamp,
//           },
//         ]);
//       }
//     });

//     mqttClient.on('error', err => {
//       console.error('MQTT Connection error:', err);
//     });

//     setClient(mqttClient);

//     return () => {
//       mqttClient.end();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (client && message.trim()) {
//       const senderId = currentUser === 'user1' ? USERS.userId1 : USERS.userId2;
//       const recipientId =
//         currentUser === 'user1' ? USERS.userId2 : USERS.userId1;

//       const chatMessage = {
//         senderId,
//         recipientId,
//         message,
//         timestamp: new Date().toISOString(),
//       };

//       client.publish(
//         'chat/+/messages',
//         JSON.stringify(chatMessage),
//         {qos: 0},
//         err => {
//           if (err) {
//             console.error('Message publish error:', err);
//           } else {
//             console.log('Message published successfully:', chatMessage);
//             setMessage('');
//           }
//         },
//       );
//     }
//   };

//   return (
//     <Provider store={store}>
//       <GestureHandlerRootView style={{flex: 1}}>
//         <PaperProvider>

//           <AppNavigator />
//         </PaperProvider>
//       </GestureHandlerRootView>
//     </Provider>
//   );
// }

// export default App;
