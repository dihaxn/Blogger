import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/AuthSlice.jsx";
import messageReducer from "../features/message/MessageSlice.jsx";

const reducer = {
    auth: authReducer,
    message: messageReducer
}

export const store = configureStore({
    reducer: reducer,
    devTools: true,
});
