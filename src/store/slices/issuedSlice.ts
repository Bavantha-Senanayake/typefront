import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IssuedFabricState, AddTypeRequest } from '../../types/issued.types';
import { issuedService } from '../../services/issuedService';

const initialState: IssuedFabricState = {
  issuedFabrics: [],
  loading: false,
  error: null,
};

export const fetchIssuedFabrics = createAsyncThunk(
  'issued/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await issuedService.getAllIssuedFabrics();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch issued fabrics');
    }
  }
);

export const addTypeToIssued = createAsyncThunk(
  'issued/addType',
  async ({ fabricName, type }: { fabricName: string; type: string }, { rejectWithValue }) => {
    try {
      return await issuedService.addTypeToIssued(fabricName, { type });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add type');
    }
  }
);

export const issuedSlice = createSlice({
  name: 'issued',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch issued fabrics
    builder
      .addCase(fetchIssuedFabrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuedFabrics.fulfilled, (state, action) => {
        state.loading = false;
        state.issuedFabrics = action.payload;
      })
      .addCase(fetchIssuedFabrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add type to issued
    builder
      .addCase(addTypeToIssued.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTypeToIssued.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.issuedFabrics.findIndex(
          f => f.fabricName === action.payload.fabricName
        );
        if (index !== -1) {
          state.issuedFabrics[index] = action.payload;
        }
      })
      .addCase(addTypeToIssued.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = issuedSlice.actions;
export default issuedSlice.reducer;
