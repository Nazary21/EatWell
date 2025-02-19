import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import WorkoutFrequencyScreen from '../workout-frequency';
import { onboardingReducer } from '@/store/slices/onboardingSlice';
import { authReducer } from '@/store/slices/authSlice';
import { profileService } from '@/services/profile';
import { analytics } from '@/services/analytics';

// Mock dependencies
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('@/services/profile', () => ({
  profileService: {
    saveOnboardingProgress: jest.fn(),
  },
}));

jest.mock('@/services/analytics', () => ({
  analytics: {
    track: jest.fn(),
  },
}));

// Create a mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      onboarding: onboardingReducer,
      auth: authReducer,
    },
    preloadedState: initialState,
  });
};

describe('WorkoutFrequencyScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all frequency options', () => {
    const store = createMockStore();
    const { getAllByRole, getByText } = render(
      <Provider store={store}>
        <WorkoutFrequencyScreen />
      </Provider>
    );

    // Check title
    expect(getByText('How many workouts do you do per week?')).toBeTruthy();

    // Check all frequency options are rendered (0-7)
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(9); // 8 frequency options + 1 next button
  });

  it('handles frequency selection and tracks analytics', () => {
    const store = createMockStore();
    const { getByText } = render(
      <Provider store={store}>
        <WorkoutFrequencyScreen />
      </Provider>
    );

    // Select frequency 3
    fireEvent.press(getByText('3'));

    // Verify analytics was called
    expect(analytics.track).toHaveBeenCalledWith(
      'workout_frequency_set',
      expect.objectContaining({
        workout_frequency: 3,
      })
    );
  });

  it('saves progress and navigates on next button press', async () => {
    const mockUserId = 'test-user-id';
    const store = createMockStore({
      auth: {
        session: {
          user: { id: mockUserId },
        },
      },
      onboarding: {
        currentStep: 2,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <WorkoutFrequencyScreen />
      </Provider>
    );

    // Select frequency and press next
    fireEvent.press(getByText('3'));
    fireEvent.press(getByText('Next'));

    await waitFor(() => {
      // Verify profile service was called
      expect(profileService.saveOnboardingProgress).toHaveBeenCalledWith(
        mockUserId,
        2,
        expect.objectContaining({
          workout_frequency: 3,
        })
      );
    });
  });

  it('disables next button when no frequency is selected', () => {
    const store = createMockStore();
    const { getByText } = render(
      <Provider store={store}>
        <WorkoutFrequencyScreen />
      </Provider>
    );

    const nextButton = getByText('Next');
    expect(nextButton.props.accessibilityState.disabled).toBe(true);
  });
}); 