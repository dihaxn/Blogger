import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../message/MessageSlice.jsx";
import AuthService from "../../services/Auth.jsx";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
    "auth/register",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await AuthService.register(email, password);
            thunkAPI.dispatch(setMessage("Registration successful!"));
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const user = await AuthService.login(email, password);
            return { user };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state) => {
            state.isLoggedIn = false;
        });
        builder.addCase(register.rejected, (state) => {
            state.isLoggedIn = false;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        });
        builder.addCase(login.rejected, (state) => {
            state.isLoggedIn = false;
            state.user = null;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
            state.user = null;
        });
    },
});

const { reducer } = authSlice;
export default reducer;