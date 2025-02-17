import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function PasswordResetScreen() {
  const theme = useTheme();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      // Password updated successfully
      router.replace('/(auth)/sign-in');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background }
      ]}
    >
      <View style={styles.header}>
        <Text variant="displaySmall" style={{ color: theme.colors.primary }}>
          Set New Password
        </Text>
        <Text 
          variant="bodyLarge" 
          style={{ 
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          Enter and confirm your new password
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          autoComplete="password-new"
          style={styles.input}
        />

        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoComplete="password-new"
          style={styles.input}
        />

        {error ? (
          <Text style={[styles.error, { color: theme.colors.error }]}>
            {error}
          </Text>
        ) : null}

        <Button
          mode="contained"
          onPress={handlePasswordReset}
          loading={loading}
          style={styles.button}
          disabled={!newPassword || !confirmPassword}
        >
          Update Password
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  input: {
    marginBottom: 8,
  },
  error: {
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
  },
}); 