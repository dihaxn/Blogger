import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../message/MessageSlice.jsx";
import AuthService from "../../services/Auth.jsx";

export const register = createAsyncThunk(
    "auth/register",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await AuthService.register(email, password);
            thunkAPI.dispatch(setMessage("Registration successful!"));
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Registration failed";
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const user = await AuthService.login(email, password);
            localStorage.setItem("user", JSON.stringify(user));
            return { user };
        } catch (error) {
            const message = error.message || "Login failed";
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state) => {
                state.isLoggedIn = false;
            })
            .addCase(register.rejected, (state) => {
                state.isLoggedIn = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            });
    },
});

const { reducer } = authSlice;
export default reducer;