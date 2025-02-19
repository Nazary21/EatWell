import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { startOnboarding } from '@/store/slices/onboardingSlice';
import { analytics } from '@/services/analytics';
import { AnalyticsEvent } from '@/types/profile';

export default function OnboardingLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeOnboarding = async () => {
      try {
        // Initialize analytics first
        await analytics.initialize();
        
        // Initialize onboarding state
        dispatch(startOnboarding());
        
        // Track onboarding start
        analytics.track(AnalyticsEvent.OnboardingStarted);
      } catch (error) {
        console.error('Failed to initialize onboarding:', error);
      }
    };
    
    initializeOnboarding();
  }, [dispatch]);

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: () => null,
        animation: 'slide_from_right',
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerShadowVisible: false,
        headerTitle: '',
      }}
    />
  );
} 