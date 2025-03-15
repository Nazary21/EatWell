/**
 * API Service types for backend integration
 * These types define the data structures for communicating with backend services
 */

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  darkMode: boolean;
  useMetricSystem: boolean;
}

export interface UserProfile {
  height?: number; // cm
  weight?: number; // kg
  goalWeight?: number; // kg
  birthday?: string; // ISO date string
  gender?: 'male' | 'female' | 'other';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

// Meal related types
export interface Meal {
  id: string;
  userId: string;
  name: string;
  dateTime: string; // ISO date string
  totalCalories: number;
  foods: FoodItem[];
  notes?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  servingSize: number;
  servingUnit: string;
  nutrients?: Record<string, number>;
}

// Nutrition insights types
export interface DailyNutrition {
  date: string; // ISO date string
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  meals: string[]; // Meal IDs
  nutrients: Record<string, number>;
}

export interface NutritionInsight {
  id: string;
  userId: string;
  type: 'deficiency' | 'excess' | 'recommendation';
  nutrient: string;
  value: number;
  recommendation: string;
}

// Chat related types
export interface ChatMessage {
  id: string;
  userId: string;
  isUser: boolean;
  text: string;
  timestamp: string; // ISO date string
  relatedEntities?: {
    type: 'food' | 'meal' | 'insight';
    id: string;
  }[];
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
} 