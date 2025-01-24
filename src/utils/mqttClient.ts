import { Dispatch } from '@reduxjs/toolkit';
import mqtt, { MqttClient } from 'precompiled-mqtt';
import { setConnectionStatus } from '../controller/mqttSlice';

let mqttClient: MqttClient | null = null;

export const connectMqttClient = (brokerUrl: string, dispatch: Dispatch): MqttClient => {
  if (!mqttClient) {
    mqttClient = mqtt.connect(brokerUrl);

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      dispatch(setConnectionStatus(true)); 
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT connection error:', err);
      dispatch(setConnectionStatus(false)); 
    });

    mqttClient.on('close', () => {
      console.log('MQTT connection closed');
      dispatch(setConnectionStatus(false)); 
    });
  }
  return mqttClient;
};

export const getMqttClient = (): MqttClient | null => mqttClient;

export const disconnectMqttClient = (dispatch: Dispatch): void => {
  if (mqttClient) {
    mqttClient.end();
    mqttClient = null;
    dispatch(setConnectionStatus(false)); 
  }
};
