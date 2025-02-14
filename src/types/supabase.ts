export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
          profile_image_url?: string;
          onboarding_completed: boolean;
          subscription_status: 'free' | 'premium';
          subscription_expires_at?: string;
          notification_preferences: Json;
          last_login_at?: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          updated_at?: string;
          profile_image_url?: string;
          onboarding_completed?: boolean;
          subscription_status?: 'free' | 'premium';
          subscription_expires_at?: string;
          notification_preferences?: Json;
          last_login_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
          profile_image_url?: string;
          onboarding_completed?: boolean;
          subscription_status?: 'free' | 'premium';
          subscription_expires_at?: string;
          notification_preferences?: Json;
          last_login_at?: string;
        };
      };
      user_profiles: {
        Row: {
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
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
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
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
          created_at?: string;
          updated_at?: string;
        };
      };
      food_entries: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          calories: number;
          protein?: number;
          carbs?: number;
          fat?: number;
          fiber?: number;
          meal_category: string;
          portion_size?: number;
          portion_unit?: string;
          entry_date: string;
          entry_time: string;
          created_at: string;
          updated_at: string;
          ai_generated: boolean;
          source?: string;
          image_url?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          calories: number;
          protein?: number;
          carbs?: number;
          fat?: number;
          fiber?: number;
          meal_category: string;
          portion_size?: number;
          portion_unit?: string;
          entry_date: string;
          entry_time: string;
          created_at?: string;
          updated_at?: string;
          ai_generated?: boolean;
          source?: string;
          image_url?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          calories?: number;
          protein?: number;
          carbs?: number;
          fat?: number;
          fiber?: number;
          meal_category?: string;
          portion_size?: number;
          portion_unit?: string;
          entry_date?: string;
          entry_time?: string;
          created_at?: string;
          updated_at?: string;
          ai_generated?: boolean;
          source?: string;
          image_url?: string;
        };
      };
      weight_history: {
        Row: {
          id: string;
          user_id: string;
          weight: number;
          recorded_at: string;
          note?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          weight: number;
          recorded_at?: string;
          note?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          weight?: number;
          recorded_at?: string;
          note?: string;
        };
      };
      custom_foods: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          calories: number;
          protein?: number;
          carbs?: number;
          fat?: number;
          fiber?: number;
          portion_size?: number;
          portion_unit?: string;
          barcode?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          calories: number;
          protein?: number;
          carbs?: number;
          fat?: number;
          fiber?: number;
          portion_size?: number;
          portion_unit?: string;
          barcode?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          calories?: number;
          protein?: number;
          carbs?: number;
          fat?: number;
          fiber?: number;
          portion_size?: number;
          portion_unit?: string;
          barcode?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
} 