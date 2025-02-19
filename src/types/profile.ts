export type Gender = 'male' | 'female' | 'other';
export type GoalType = 'lose' | 'maintain' | 'gain';
export type GoalTimeline = 'slow' | 'moderate' | 'fast';
export type DietaryPreference = 'classic' | 'pescatarian' | 'vegetarian' | 'vegan';

export interface UserProfile {
  id: string;
  created_at: string;
  updated_at: string;
  
  // Basic Info
  gender?: Gender;
  birth_date?: string;
  height?: number;
  weight?: number;
  
  // Goals & Preferences
  goal_type?: GoalType;
  target_weight?: number;
  goal_timeline?: GoalTimeline;
  workout_frequency?: number;
  dietary_preference?: DietaryPreference;
  
  // Experience & Obstacles
  has_tracking_experience?: boolean;
  obstacles?: string[];
  motivations?: string[];
  
  // Marketing & Engagement
  discovery_source?: string;
  referral_code?: string;
  notifications_enabled?: boolean;
  trial_started_at?: string;
}

// Analytics event names
export enum AnalyticsEvent {
  // Onboarding Events
  GenderSelected = 'gender_selected',
  WorkoutFrequencySet = 'workout_frequency_set',
  DiscoverySourceSelected = 'discovery_source_selected',
  PreviousExperienceIndicated = 'previous_experience_indicated',
  AIIntroViewed = 'ai_intro_viewed',
  MeasurementsEntered = 'measurements_entered',
  BirthDateEntered = 'birth_date_entered',
  GoalTypeSelected = 'goal_type_selected',
  TargetWeightSet = 'target_weight_set',
  GoalTimelineSelected = 'goal_timeline_selected',
  AIProjectionViewed = 'ai_projection_viewed',
  ObstaclesIdentified = 'obstacles_identified',
  DietaryPreferenceSelected = 'dietary_preference_selected',
  MotivationsSelected = 'motivations_selected',
  ProgressVisualizationViewed = 'progress_visualization_viewed',
  RatingPromptViewed = 'rating_prompt_viewed',
  NotificationPreferenceSet = 'notification_preference_set',
  ReferralCodeEntered = 'referral_code_entered',
  SetupProgressStarted = 'setup_progress_started',
  SetupProgressCompleted = 'setup_progress_completed',
  PlanReadyViewed = 'plan_ready_viewed',
  GoalsOverviewCompleted = 'goals_overview_completed',
  TrialOfferViewed = 'trial_offer_viewed',
  TrialStarted = 'trial_started',
  
  // Navigation Events
  OnboardingStarted = 'onboarding_started',
  OnboardingStepViewed = 'onboarding_step_viewed',
  OnboardingStepCompleted = 'onboarding_step_completed',
  OnboardingCompleted = 'onboarding_completed',
  OnboardingAbandoned = 'onboarding_abandoned',
  
  // Profile Events
  ProfileUpdated = 'profile_updated',
  ProfileCreated = 'profile_created'
}

// Analytics event properties
export interface AnalyticsProperties {
  // Common properties
  step_number?: number;
  step_name?: string;
  time_spent?: number;
  total_steps?: number;
  total_time?: number;
  userId?: string;
  
  // Step-specific properties
  gender?: Gender;
  workout_frequency?: number;
  discovery_source?: string;
  has_tracking_experience?: boolean;
  height?: number;
  weight?: number;
  birth_date?: string;
  goal_type?: GoalType;
  target_weight?: number;
  goal_timeline?: GoalTimeline;
  obstacles?: string[];
  dietary_preference?: DietaryPreference;
  motivations?: string[];
  notifications_enabled?: boolean;
  referral_code?: string;
} 