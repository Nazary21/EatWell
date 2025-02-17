import React from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setStep('code');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code || code.length < 6) {
      setError('Please enter the 6-digit code from your email');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'recovery'
      });

      if (error) throw error;

      // If verification successful, update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      // Show success message and redirect to sign-in
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
          {step === 'email' 
            ? 'Enter your email to receive a reset code'
            : 'Enter the code from your email and your new password'}
        </Text>
      </View>

      <View style={styles.form}>
        {step === 'email' ? (
          <>
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

            <Button
              mode="contained"
              onPress={handleSendCode}
              loading={loading}
              style={styles.button}
              disabled={!email}
            >
              Send Reset Code
            </Button>
          </>
        ) : (
          <>
            <TextInput
              label="Reset Code"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
              style={styles.input}
            />

            <TextInput
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              style={styles.input}
            />

            {error ? (
              <Text style={[styles.error, { color: theme.colors.error }]}>
                {error}
              </Text>
            ) : null}

            <Button
              mode="contained"
              onPress={handleVerifyCode}
              loading={loading}
              style={styles.button}
              disabled={!code || !newPassword}
            >
              Reset Password
            </Button>

            <Button
              mode="text"
              onPress={() => {
                setStep('email');
                setError('');
                setCode('');
                setNewPassword('');
              }}
            >
              Try Different Email
            </Button>
          </>
        )}

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
  button: {
    marginTop: 8,
  },
}); 