import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.ts';
import fabricReducer from './slices/fabricSlice.ts';
import issuedReducer from './slices/issuedSlice.ts';

export const store = configureStore({
  reducer: {
    user: userReducer,
    fabric: fabricReducer,
    issued: issuedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
