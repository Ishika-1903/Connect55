// const mqttSlice = createSlice ({
//     name : 'mqtt',
//     initialState: {client: null},
//     reducers: {
//         setMqttClient(state, action) {
//             state.client = action.payload;
//             console.log('mqtt is in slice');
//         }},
// })

// export const {setMqttClient} = mqttSlice.actions;
// export default mqttSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MqttClient} from 'precompiled-mqtt';

interface MqttState {
  mqttClient: MqttClient | null;
  isConnected: boolean;
}

const initialState: MqttState = {
  mqttClient: null,
  isConnected: false,
};

const mqttSlice = createSlice({
  name: 'mqtt',
  initialState,
  reducers: {
    setMqttClient(state, action: PayloadAction<MqttClient>) {
      state.mqttClient = action.payload;
    },
    setConnectionStatus(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const {setMqttClient, setConnectionStatus} = mqttSlice.actions;

export default mqttSlice.reducer;
