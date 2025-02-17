import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  user_id: string;
  name?: string;
  gender?: string;
  birth_date?: string;
  height?: number;
  current_weight?: number;
  target_weight?: number;
  activity_level?: string;
  dietary_preferences?: string[];
  workout_frequency?: number;
  weight_goal?: string;
  goal_timeline?: string;
  obstacles?: string[];
}

interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  onboardingCompleted: boolean;
  subscriptionStatus: 'free' | 'premium';
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
  onboardingCompleted: false,
  subscriptionStatus: 'free',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.onboardingCompleted = action.payload;
    },
    setSubscriptionStatus: (state, action: PayloadAction<'free' | 'premium'>) => {
      state.subscriptionStatus = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
      state.onboardingCompleted = false;
      state.subscriptionStatus = 'free';
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setLoading,
  setError,
  setOnboardingCompleted,
  setSubscriptionStatus,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer; 