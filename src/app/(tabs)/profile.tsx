import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useAppSelector } from '@/store';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const theme = useTheme();
  const profile = useAppSelector((state) => state.profile.data);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/(auth)/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium">Profile</Text>
      {profile && (
        <View style={styles.info}>
          <Text variant="bodyLarge">Gender: {profile.gender}</Text>
          <Text variant="bodyLarge">Workout Frequency: {profile.workout_frequency} times/week</Text>
          <Text variant="bodyLarge">Goal: {profile.goal_type}</Text>
        </View>
      )}
      <Button 
        mode="outlined" 
        onPress={handleSignOut}
        style={styles.signOutButton}
      >
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  info: {
    marginTop: 24,
    gap: 8,
  },
  signOutButton: {
    marginTop: 32,
  },
}); 