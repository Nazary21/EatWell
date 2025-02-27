import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Switch, Button, useTheme, Divider } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { saveUserProfile, clearUserProfile } from '@/features/user/slice';
import { useState, useCallback, useEffect } from 'react';
import { UserProfile } from '@/features/user/types';

export default function SettingsScreen() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { profile, isLoading } = useAppSelector((state) => state.user);

  // Local state for form
  const [preferences, setPreferences] = useState({
    theme: 'light' as const,
    notifications: true,
    measurementSystem: 'metric' as const,
    language: 'en'
  });

  // Update local state when profile changes
  useEffect(() => {
    if (profile?.preferences) {
      setPreferences(profile.preferences);
    }
  }, [profile]);

  // Handle preference changes
  const handleNotificationsChange = useCallback((value: boolean) => {
    setPreferences(prev => ({ ...prev, notifications: value }));
  }, []);

  const handleMeasurementSystemChange = useCallback((value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      measurementSystem: value ? 'metric' : 'imperial'
    }));
  }, []);

  // Save preferences
  const handleSave = useCallback(async () => {
    const updatedProfile: UserProfile = {
      id: profile?.id || '1', // Use existing or default
      email: profile?.email || 'test@example.com',
      displayName: profile?.displayName || 'Test User',
      preferences,
      goals: profile?.goals || {
        calories: 2000,
        protein: 150,
        carbs: 200,
        fat: 70
      },
      createdAt: profile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await dispatch(saveUserProfile(updatedProfile));
  }, [dispatch, preferences, profile]);

  // Clear profile
  const handleClear = useCallback(async () => {
    await dispatch(clearUserProfile());
  }, [dispatch]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>User Preferences</Text>
        
        <View style={styles.preference}>
          <Text>Notifications</Text>
          <Switch
            value={preferences.notifications}
            onValueChange={handleNotificationsChange}
          />
        </View>

        <Divider style={styles.divider} />

        <View style={styles.preference}>
          <Text>Use Metric System</Text>
          <Switch
            value={preferences.measurementSystem === 'metric'}
            onValueChange={handleMeasurementSystemChange}
          />
        </View>

        <Divider style={styles.divider} />

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSave}
            loading={isLoading}
            style={styles.button}
          >
            Save Preferences
          </Button>

          <Button
            mode="outlined"
            onPress={handleClear}
            loading={isLoading}
            style={styles.button}
          >
            Clear Profile
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Current Profile</Text>
        <Text variant="bodyMedium">
          {profile ? JSON.stringify(profile, null, 2) : 'No profile set'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 8,
  },
  buttonContainer: {
    marginTop: 16,
    gap: 8,
  },
  button: {
    marginVertical: 4,
  },
}); 