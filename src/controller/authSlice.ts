import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  userId: string | null;
  chatId: string | null;
  chatUserId: string | null;
  FCMToken: (string | null)[];
  isLoggedIn: boolean;
};
const initialState: AuthState = {
  token: null,
  userId: null,
  chatId: null,
  chatUserId: null,
  FCMToken: [],
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setChatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
    setChatUserId: (state, action: PayloadAction<string>) => {
      state.chatUserId = action.payload;
    },
    setFCMToken: (state, action: PayloadAction<string>) => {
      state.FCMToken.push(action.payload);
    },
  },
});

export const {setToken, setUserId, setChatId, setChatUserId, setFCMToken} =
  authSlice.actions;
export default authSlice.reducer;
