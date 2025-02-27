import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoreState } from './types';

const initialState: CoreState = {
  isLoading: false,
  error: null,
  isInitialized: false,
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { setLoading, setError, setInitialized } = coreSlice.actions;
export default coreSlice.reducer; 