import { store } from '../index';
import { setSession } from '../slices/authSlice';
import { setEntries } from '../slices/foodSlice';
import { setProfile } from '../slices/profileSlice';

describe('Redux Store', () => {
  it('should have the correct initial state', () => {
    const state = store.getState();
    
    // Auth slice initial state
    expect(state.auth).toEqual({
      session: null,
      isLoading: true,
      error: null,
    });

    // Food slice initial state
    expect(state.food).toMatchObject({
      entries: [],
      isLoading: false,
      error: null,
    });

    // Profile slice initial state
    expect(state.profile).toEqual({
      profile: null,
      isLoading: false,
      error: null,
      onboardingCompleted: false,
      subscriptionStatus: 'free',
    });
  });

  it('should handle dispatched actions correctly', () => {
    // Test auth action
    store.dispatch(setSession({ user: { id: '123' } } as any));
    expect(store.getState().auth.session).toEqual({ user: { id: '123' } });

    // Test food action
    const foodEntry = {
      id: '1',
      name: 'Test Food',
      calories: 100,
      meal_category: 'lunch',
      entry_date: '2024-02-14',
      entry_time: '12:00',
      ai_generated: false,
    };
    store.dispatch(setEntries([foodEntry]));
    expect(store.getState().food.entries).toEqual([foodEntry]);

    // Test profile action
    const profile = {
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
    store.dispatch(setProfile(profile));
    expect(store.getState().profile.profile).toEqual(profile);
  });
}); 