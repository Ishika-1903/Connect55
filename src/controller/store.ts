import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import mqttSlice from "./mqttSlice";

const store = configureStore ({
    reducer:{
        auth: authSlice,
        mqtt: mqttSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 

export default store; 
