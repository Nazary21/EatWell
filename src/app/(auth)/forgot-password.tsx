import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${Platform.OS === 'ios' ? 'caltrackerreact://' : 'caltrackerreact'}/password-reset`,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
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
          Reset Password
        </Text>
        <Text 
          variant="bodyLarge" 
          style={{ 
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          Enter your email address and we'll send you instructions to reset your password
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          style={styles.input}
        />

        {error ? (
          <Text style={[styles.error, { color: theme.colors.error }]}>
            {error}
          </Text>
        ) : null}

        {success ? (
          <Text style={[styles.success, { color: theme.colors.primary }]}>
            Check your email for reset instructions
          </Text>
        ) : null}

        <Button
          mode="contained"
          onPress={handleResetPassword}
          loading={loading}
          style={styles.button}
          disabled={!email || success}
        >
          Send Reset Instructions
        </Button>

        <Link href="/sign-in" asChild>
          <Button mode="text">Back to Sign In</Button>
        </Link>
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
  success: {
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
  },
}); 