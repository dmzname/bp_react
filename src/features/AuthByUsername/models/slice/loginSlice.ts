import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginSchema } from "../types/loginSchema";
import { loginByUsername } from "../services/loginByUsername/loginByUsername";

const initialState: ILoginSchema = {
    isLoading: false,
    username: '',
    password: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(loginByUsername.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        });
        builder.addCase(loginByUsername.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(loginByUsername.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;