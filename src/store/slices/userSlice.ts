import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { UserState, CreateUserRequest } from '../../types/user.types.ts';
import { userService } from '../../services/userService.ts';

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

// Async thunk for creating a user
export const createUser = createAsyncThunk(
  'user/create',
  async (userData: CreateUserRequest, { rejectWithValue }) => {
    try {
      const response = await userService.createUser(userData);
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create user');
    }
  }
);

// Async thunk for fetching a user
export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await userService.fetchUser(userId);
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create user
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch user
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser, clearError } = userSlice.actions;
export default userSlice.reducer;
