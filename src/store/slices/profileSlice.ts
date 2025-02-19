import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/types/profile';

interface ProfileState {
  data: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.data = action.payload;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.data) {
        state.data = {
          ...state.data,
          ...action.payload,
        };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearProfile: (state) => {
      state.data = null;
      state.error = null;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setLoading,
  setError,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer; 