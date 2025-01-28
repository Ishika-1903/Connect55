import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  userId: string | null;
  chatId: string | null;
  chatUserId: string | null;
  FCMToken: (string | null)[];
};
const initialState: AuthState = {
  token: null,
  userId: null,
  chatId: null,
  chatUserId: null,
  FCMToken: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
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
    setChatUserId: (state, action: PayloadAction<string>) => {
      state.chatUserId = action.payload;
      console.log('ChatUserId saved in Redux slice:', state.chatUserId);
    },
    setFCMToken: (state, action: PayloadAction<string>) => {
      state.FCMToken.push(action.payload);
      console.log('FCMToken saved in Redux slice:', state.FCMToken);
    },
  },
});

export const {setToken, setUserId, setChatId, setChatUserId, setFCMToken} =
  authSlice.actions;
export default authSlice.reducer;
