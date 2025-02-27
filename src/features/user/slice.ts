import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserState, UserProfile } from './types';
import { storageService } from '@/lib/storage/storage-service';

const USER_STORAGE_KEY = 'user_profile';

// Async thunks
export const loadUserProfile = createAsyncThunk(
  'user/loadProfile',
  async () => {
    const response = await storageService.get<UserProfile>(USER_STORAGE_KEY);
    if (response.error) throw new Error(response.error);
    return response.data;
  }
);

export const saveUserProfile = createAsyncThunk(
  'user/saveProfile',
  async (profile: UserProfile) => {
    const response = await storageService.set(USER_STORAGE_KEY, profile);
    if (response.error) throw new Error(response.error);
    return profile;
  }
);

export const clearUserProfile = createAsyncThunk(
  'user/clearProfile',
  async () => {
    const response = await storageService.remove(USER_STORAGE_KEY);
    if (response.error) throw new Error(response.error);
    return null;
  }
);

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Load Profile
    builder.addCase(loadUserProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loadUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });
    builder.addCase(loadUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to load profile';
    });

    // Save Profile
    builder.addCase(saveUserProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(saveUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });
    builder.addCase(saveUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to save profile';
    });

    // Clear Profile
    builder.addCase(clearUserProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(clearUserProfile.fulfilled, (state) => {
      state.isLoading = false;
      state.profile = null;
    });
    builder.addCase(clearUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to clear profile';
    });
  },
});

export const { setError, clearError } = userSlice.actions;
export default userSlice.reducer; 