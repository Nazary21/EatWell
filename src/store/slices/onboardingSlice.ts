import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/types/profile';

interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  startTime: string | null;
  profile: Partial<UserProfile>;
  isCompleted: boolean;
}

const initialState: OnboardingState = {
  currentStep: 1,
  totalSteps: 26, // Total number of onboarding steps
  startTime: null,
  profile: {},
  isCompleted: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    startOnboarding: (state) => {
      state.startTime = new Date().toISOString();
      state.currentStep = 1;
      state.isCompleted = false;
    },
    
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },
    
    completeOnboarding: (state) => {
      state.isCompleted = true;
    },
    
    resetOnboarding: (state) => {
      return initialState;
    },
  },
});

export const {
  startOnboarding,
  setCurrentStep,
  updateProfile,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer; 