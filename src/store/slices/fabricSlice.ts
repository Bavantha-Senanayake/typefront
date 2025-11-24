import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { FabricState, CreateFabricRequest, UpdateFabricRequest } from '../../types/fabric.types';
import { fabricService } from '../../services/fabricService';

const initialState: FabricState = {
  fabrics: [],
  selectedFabric: null,
  loading: false,
  error: null,
};

export const fetchFabrics = createAsyncThunk(
  'fabric/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fabricService.getAllFabrics();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch fabrics');
    }
  }
);

export const createFabric = createAsyncThunk(
  'fabric/create',
  async (data: CreateFabricRequest, { rejectWithValue }) => {
    try {
      return await fabricService.createFabric(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create fabric');
    }
  }
);

export const updateFabric = createAsyncThunk(
  'fabric/update',
  async ({ name, data }: { name: string; data: UpdateFabricRequest }, { rejectWithValue }) => {
    try {
      return await fabricService.updateFabric(name, data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update fabric');
    }
  }
);

export const deleteFabric = createAsyncThunk(
  'fabric/delete',
  async (name: string, { rejectWithValue }) => {
    try {
      await fabricService.deleteFabric(name);
      return name;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete fabric');
    }
  }
);

export const issueFabric = createAsyncThunk(
  'fabric/issue',
  async ({ name, length }: { name: string; length: number }, { rejectWithValue }) => {
    try {
      const response = await fabricService.issueFabric(name, length);
      return { name, ...response };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to issue fabric');
    }
  }
);

export const fabricSlice = createSlice({
  name: 'fabric',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedFabric: (state, action) => {
      state.selectedFabric = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch fabrics
    builder
      .addCase(fetchFabrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFabrics.fulfilled, (state, action) => {
        state.loading = false;
        state.fabrics = action.payload;
      })
      .addCase(fetchFabrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create fabric
    builder
      .addCase(createFabric.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFabric.fulfilled, (state, action) => {
        state.loading = false;
        state.fabrics.push(action.payload);
      })
      .addCase(createFabric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update fabric
    builder
      .addCase(updateFabric.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFabric.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.fabrics.findIndex(f => f.name === action.payload.name);
        if (index !== -1) {
          state.fabrics[index] = action.payload;
        }
      })
      .addCase(updateFabric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete fabric
    builder
      .addCase(deleteFabric.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFabric.fulfilled, (state, action) => {
        state.loading = false;
        state.fabrics = state.fabrics.filter(f => f.name !== action.payload);
      })
      .addCase(deleteFabric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Issue fabric
    builder
      .addCase(issueFabric.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(issueFabric.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.fabrics.findIndex(f => f.name === action.payload.name);
        if (index !== -1) {
          state.fabrics[index].length = action.payload.remainingLength;
        }
      })
      .addCase(issueFabric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedFabric } = fabricSlice.actions;
export default fabricSlice.reducer;
