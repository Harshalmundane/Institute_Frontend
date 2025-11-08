// slices/branchSlice.js - Updated with featured branches handling
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance'; // Updated import

// Async thunks for CRUD operations
export const createBranch = createAsyncThunk(
  'branches/createBranch',
  async (branchData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('branchName', branchData.branchName);
      formData.append('officeType', branchData.officeType);
      formData.append('address', branchData.address);
      formData.append('mobile', branchData.mobile);
      formData.append('email', branchData.email);
      if (branchData.branchImage) {
        formData.append('branchImage', branchData.branchImage);
      }

      const response = await axiosInstance.post('/api/branch', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create branch');
    }
  }
);

export const getAllBranches = createAsyncThunk(
  'branches/getAllBranches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/branches');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch branches');
    }
  }
);

export const getBranchById = createAsyncThunk(
  'branches/getBranchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/branch/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch branch');
    }
  }
);

export const updateBranch = createAsyncThunk(
  'branches/updateBranch',
  async ({ id, branchData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('branchName', branchData.branchName);
      formData.append('officeType', branchData.officeType);
      formData.append('address', branchData.address);
      formData.append('mobile', branchData.mobile);
      formData.append('email', branchData.email);
      if (branchData.branchImage) {
        formData.append('branchImage', branchData.branchImage);
      }

      const response = await axiosInstance.put(`/api/branch/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update branch');
    }
  }
);

export const deleteBranch = createAsyncThunk(
  'branches/deleteBranch',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/branch/${id}`);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete branch');
    }
  }
);

// Async thunks for featured branches (exported separately as requested)
export const getFeaturedBranches = createAsyncThunk(
  'branches/getFeaturedBranches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/branch/featured');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch featured branches');
    }
  }
);

export const setFeaturedBranches = createAsyncThunk(
  'branches/setFeaturedBranches',
  async (branchIds, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/branch/set-featured', { branchIds });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to set featured branches');
    }
  }
);

// Main branch slice (with featured logic integrated)
const branchSlice = createSlice({
  name: 'branches',
  initialState: {
    branches: [],
    featuredBranches: [], // Added for featured branches
    currentBranch: null,
    loading: false,
    error: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBranch: (state) => {
      state.currentBranch = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create branch
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.branches.push(action.payload.branch);
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get all branches
      .addCase(getAllBranches.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.branches = action.payload;
      })
      .addCase(getAllBranches.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get branch by ID
      .addCase(getBranchById.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getBranchById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.currentBranch = action.payload;
      })
      .addCase(getBranchById.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update branch
      .addCase(updateBranch.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        const index = state.branches.findIndex((branch) => branch._id === action.payload._id);
        if (index !== -1) {
          state.branches[index] = action.payload;
        }
        state.currentBranch = action.payload;
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete branch
      .addCase(deleteBranch.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.branches = state.branches.filter((branch) => branch._id !== action.payload.id);
        if (state.currentBranch?._id === action.payload.id) {
          state.currentBranch = null;
        }
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get featured branches
      .addCase(getFeaturedBranches.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getFeaturedBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.featuredBranches = action.payload;
      })
      .addCase(getFeaturedBranches.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Set featured branches
      .addCase(setFeaturedBranches.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(setFeaturedBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        // Optionally refetch featured branches or update local state
        state.featuredBranches = action.payload; // Assuming API returns updated list
      })
      .addCase(setFeaturedBranches.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export reducers/actions
export const { clearError, clearCurrentBranch } = branchSlice.actions;
export default branchSlice.reducer;