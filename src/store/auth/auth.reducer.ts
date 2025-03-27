import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { AuthState } from "./auth.types";
import { User } from "@/@types";
import { _getQuestions, _getUsers } from "@/server/_DATA";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const fetchUserById = async (id: string): Promise<User | null> =>
  (Object.values(await _getUsers()) as User[])?.find(
    (user) => user?.id === id
  ) as User | null;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
