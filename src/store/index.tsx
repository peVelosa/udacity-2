import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth.reducer";
import { poolSlice } from "./pool/pool.reducer";
import { usersSlice } from "./users/users.reducer";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  questions: poolSlice.reducer,
  users: usersSlice.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
