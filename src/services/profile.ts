import { supabase } from '@/lib/supabase';
import { UserProfile, AnalyticsEvent } from '@/types/profile';
import { analytics } from './analytics';

class ProfileService {
  /**
   * Get user profile from Supabase
   */
  async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }

  /**
   * Update user profile in Supabase
   */
  async updateProfile(
    userId: string,
    updates: Partial<UserProfile>
  ): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      // Track profile update analytics
      analytics.track(AnalyticsEvent.ProfileUpdated, {
        ...updates,
        userId,
      });

      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      return null;
    }
  }

  /**
   * Create initial profile for new user
   */
  async createProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([{ id: userId }])
        .select()
        .single();

      if (error) throw error;

      // Track profile creation
      analytics.track(AnalyticsEvent.ProfileCreated, { userId });

      return data;
    } catch (error) {
      console.error('Error creating profile:', error);
      return null;
    }
  }

  /**
   * Save onboarding progress
   */
  async saveOnboardingProgress(
    userId: string,
    step: number,
    updates: Partial<UserProfile>
  ): Promise<UserProfile | null> {
    try {
      // First, try to update existing profile
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        // If profile doesn't exist, create it
        if (error.code === '23503') { // Foreign key violation
          return this.createProfile(userId);
        }
        throw error;
      }

      // Track progress in analytics
      analytics.trackStepComplete(step, Object.keys(updates)[0], updates);

      return data;
    } catch (error) {
      console.error('Error saving onboarding progress:', error);
      return null;
    }
  }

  /**
   * Complete onboarding
   */
  async completeOnboarding(
    userId: string,
    finalUpdates: Partial<UserProfile>
  ): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...finalUpdates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      // Track onboarding completion
      analytics.trackOnboardingComplete(26, 0); // TODO: Calculate actual time spent

      return data;
    } catch (error) {
      console.error('Error completing onboarding:', error);
      return null;
    }
  }
}

export const profileService = new ProfileService(); 