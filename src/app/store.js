import { configureStore } from '@reduxjs/toolkit'
import apiSlice from '../features/api/apiSlice';
import authSlice from '../features/auth/authSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducer]: apiSlice.reducer,
        auth: authSlice,
    },
})

export default store;