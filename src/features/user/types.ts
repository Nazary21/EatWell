import { ThemeMode, TimestampFields } from '@/shared/types/common';

/**
 * User preferences
 */
export interface UserPreferences {
  theme: ThemeMode;
  notifications: boolean;
  measurementSystem: 'metric' | 'imperial';
  language: string;
}

/**
 * User nutrition goals
 */
export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

/**
 * User profile base information
 */
export interface UserProfile extends TimestampFields {
  id: string;
  email: string;
  displayName: string;
  preferences: UserPreferences;
  goals: NutritionGoals;
  height?: number;
  weight?: number;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
}

/**
 * User state in Redux
 */
export interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
} 