import { configureStore } from '@reduxjs/toolkit';
import coreReducer from '@/features/core/slice';
import userReducer from '@/features/user/slice';

export const store = configureStore({
  reducer: {
    core: coreReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable for now, enable when needed with proper configuration
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 