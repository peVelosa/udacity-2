import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { User } from "@/@types";
import { _getQuestions, _getUsers } from "@/server/_DATA";
import { UsersState } from "./users.types";

export const fetchUsers = createAsyncThunk(
  "pool/fetchUsers",
  async (): Promise<User[]> => Object.values(await _getUsers()) as User[]
);

const initialState: UsersState = {
  error: null,
  isLoading: false,
  users: [],
};

export const usersSlice = createSlice({
  name: "pool",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isLoading = false;
      state.error = "Failed to fetch users";
    });
  },
});

export const {} = usersSlice.actions;
