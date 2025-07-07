import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/AuthSlice.jsx";
import messageReducer from "../features/message/MessageSlice.jsx";
import { postApi } from '../features/post/postApiSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer,
        [postApi.reducerPath]: postApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApi.middleware),
    devTools: true,
});