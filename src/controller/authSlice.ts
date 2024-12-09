import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    token: string | null; 
    userId: string | null; 
}
const initialState: AuthState = {
    token : null, 
    userId: null,
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
        }
    }
})

export const {setToken, setUserId} = authSlice.actions; 
export default authSlice.reducer; 