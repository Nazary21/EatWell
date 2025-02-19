import { useEffect } from 'react';
import { router } from 'expo-router';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useAppSelector } from '@/store';

export default function Index() {
  const session = useAppSelector(state => state.auth.session);
  const profile = useAppSelector(state => state.profile.data);

  useEffect(() => {
    // Wait for next tick to ensure layout is mounted
    const timer = setTimeout(() => {
      // First, check authentication
      if (!session) {
        router.replace('/(auth)/sign-in');
        return;
      }

      // Only check onboarding if we have a session
      if (session) {
        const isOnboardingComplete = profile && (
          profile.gender &&
          profile.workout_frequency &&
          profile.goal_type
        );

        router.replace(isOnboardingComplete ? '/(tabs)' : '/(onboarding)/gender');
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [session, profile]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
} 