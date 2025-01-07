import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import mqtt from 'precompiled-mqtt';
import 'react-native-url-polyfill/auto';

const MQTTBrokerUrl = 'mqtt://test.mosquitto.org';

// ping 192.168.178.17

const MQTTApp = () => {
  console.log('Ishikssddaaa');
  useEffect(() => {
    const client = mqtt.connect(MQTTBrokerUrl);

    client.on('connect', () => {
      console.log('Connected to MQTT broker');

      client.subscribe('chat/messages', err => {
        if (err) {
          console.error('Subscription error:', err);
        } else {
          console.log('Subscribed to chat/messages');
        }
      });
    });

    client.on('message', (topic, message) => {
      if (topic === 'chat/messages') {
        const msg = message.toString();
        console.log('New message received:', msg);
      }
    });

    // Handle errors
    client.on('error', err => {
      console.error('MQTT Error:', err);
    });

    // Clean up when the component is unmounted
    return () => {
      client.end();
    };
  }, []);

  return (
    <View>
      <Text>Welcome to the Chat!</Text>
    </View>
  );
};

export default MQTTApp;
