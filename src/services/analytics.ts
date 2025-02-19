import { AnalyticsEvent, AnalyticsProperties } from '@/types/profile';

/**
 * Analytics service that will be integrated with Amplitude later.
 * For now, it just logs events to the console in development.
 */
class AnalyticsService {
  private isInitialized = false;
  private userId: string | null = null;
  private sessionId: string | null = null;

  /**
   * Initialize analytics service
   * This will be used to initialize Amplitude later
   */
  async initialize() {
    if (this.isInitialized) return;
    
    // TODO: Initialize Amplitude here
    this.isInitialized = true;
    this.sessionId = new Date().getTime().toString();
    
    if (__DEV__) {
      console.log('Analytics initialized', { sessionId: this.sessionId });
    }
  }

  /**
   * Set the user ID for analytics
   */
  setUserId(userId: string) {
    this.userId = userId;
    // TODO: Set Amplitude user ID
    
    if (__DEV__) {
      console.log('Analytics user ID set', { userId });
    }
  }

  /**
   * Track an analytics event
   */
  track(event: AnalyticsEvent, properties?: AnalyticsProperties) {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized');
      return;
    }

    const eventData = {
      event,
      properties: {
        ...properties,
        userId: this.userId,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
        environment: __DEV__ ? 'development' : 'production'
      }
    };

    // TODO: Track with Amplitude
    if (__DEV__) {
      console.log('Analytics event:', eventData);
    }
  }

  /**
   * Track onboarding step view
   */
  trackOnboardingStep(stepNumber: number, stepName: string) {
    this.track(AnalyticsEvent.OnboardingStepViewed, {
      step_number: stepNumber,
      step_name: stepName
    });
  }

  /**
   * Track onboarding step completion
   */
  trackStepComplete(stepNumber: number, stepName: string, properties?: AnalyticsProperties) {
    this.track(AnalyticsEvent.OnboardingStepCompleted, {
      step_number: stepNumber,
      step_name: stepName,
      ...properties
    });
  }

  /**
   * Track onboarding completion
   */
  trackOnboardingComplete(totalSteps: number, totalTime: number) {
    this.track(AnalyticsEvent.OnboardingCompleted, {
      total_steps: totalSteps,
      total_time: totalTime
    });
  }

  /**
   * Track onboarding abandonment
   */
  trackOnboardingAbandoned(lastStep: number, lastStepName: string, timeSpent: number) {
    this.track(AnalyticsEvent.OnboardingAbandoned, {
      step_number: lastStep,
      step_name: lastStepName,
      time_spent: timeSpent
    });
  }
}

export const analytics = new AnalyticsService(); 