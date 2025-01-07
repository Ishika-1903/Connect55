import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    token: string | null; 
    userId: string | null; 
    chatId: string | null; 
    chatUserId: string | null;
}
const initialState: AuthState = {
    token : null, 
    userId: null,
    chatId: null,
    chatUserId: null,
}

const authSlice = createSlice ({
    name : 'auth', 
    initialState, 
    reducers: {
        setToken: ( state, action: PayloadAction<string>) =>{
            state.token = action.payload; 
            console.log('Token saved in Redux slice:', state.token);
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload; 
            console.log('UserId saved in Redux slice:', state.userId);
        },
        setChatId: (state, action: PayloadAction<string>) => {
            state.chatId = action.payload; 
            console.log('ChatId saved in Redux slice:', state.chatId);
        },
        setChatUserId: (state, action: PayloadAction<string>) => { // Added setChatUserId
            state.chatUserId = action.payload; 
            console.log('ChatUserId saved in Redux slice:', state.chatUserId);
        }
    }
})

export const {setToken, setUserId, setChatId, setChatUserId} = authSlice.actions; 
export default authSlice.reducer; 