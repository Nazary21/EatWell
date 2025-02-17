import profileReducer, {
  setProfile,
  updateProfile,
  setLoading,
  setError,
  setOnboardingCompleted,
  setSubscriptionStatus,
  clearProfile,
  UserProfile,
} from '../profileSlice';

describe('profile slice', () => {
  const mockProfile: UserProfile = {
    id: '123',
    user_id: 'user123',
    name: 'John Doe',
    gender: 'male',
    birth_date: '1990-01-01',
    height: 180,
    current_weight: 75,
    target_weight: 70,
    activity_level: 'moderate',
    dietary_preferences: ['vegetarian'],
    workout_frequency: 3,
    weight_goal: 'lose',
    goal_timeline: '3 months',
    obstacles: ['time', 'motivation'],
  };

  const initialState = {
    profile: null,
    isLoading: false,
    error: null,
    onboardingCompleted: false,
    subscriptionStatus: 'free',
  };

  it('should handle initial state', () => {
    expect(profileReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setProfile', () => {
    const actual = profileReducer(initialState, setProfile(mockProfile));
    expect(actual.profile).toEqual(mockProfile);
    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBeNull();
  });

  it('should handle updateProfile', () => {
    const state = {
      ...initialState,
      profile: mockProfile,
    };

    const updatedProfile = {
      ...mockProfile,
      name: 'Jane Doe',
      current_weight: 73,
    };

    const actual = profileReducer(state, updateProfile(updatedProfile));
    expect(actual.profile).toEqual(updatedProfile);
  });

  it('should handle setLoading', () => {
    const actual = profileReducer(initialState, setLoading(true));
    expect(actual.isLoading).toBe(true);
  });

  it('should handle setError', () => {
    const errorMessage = 'Test error';
    const actual = profileReducer(initialState, setError(errorMessage));
    expect(actual.error).toBe(errorMessage);
    expect(actual.isLoading).toBe(false);
  });

  it('should handle setOnboardingCompleted', () => {
    const actual = profileReducer(initialState, setOnboardingCompleted(true));
    expect(actual.onboardingCompleted).toBe(true);
  });

  it('should handle setSubscriptionStatus', () => {
    const actual = profileReducer(initialState, setSubscriptionStatus('premium'));
    expect(actual.subscriptionStatus).toBe('premium');
  });

  it('should handle clearProfile', () => {
    const state = {
      ...initialState,
      profile: mockProfile,
      onboardingCompleted: true,
      subscriptionStatus: 'premium',
      error: 'Previous error',
      isLoading: true,
    };

    const actual = profileReducer(state, clearProfile());
    expect(actual).toEqual(initialState);
  });
}); 