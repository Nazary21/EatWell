import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { signInWithEmail, signInWithProvider } from '@/lib/auth';
import type { SignInProvider } from '@/lib/auth';
import Constants from 'expo-constants';

const SignInScreen = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Check if we're in Expo Go
  const isExpoGo = Constants.appOwnership === 'expo';

  const handleEmailSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithEmail({ email, password });
      router.replace('/(tabs)');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: SignInProvider) => {
    if (isExpoGo) {
      setError('Social sign-in is not available in Expo Go. Please use email authentication.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await signInWithProvider(provider);
      // OAuth redirect will handle navigation
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
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
          Welcome Back
        </Text>
        <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
          Sign in to continue
        </Text>
        {isExpoGo && (
          <Text 
            variant="bodyMedium" 
            style={{ 
              color: theme.colors.error,
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            Note: Running in Expo Go. Social sign-in is disabled.
          </Text>
        )}
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
        
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
          style={styles.input}
        />

        {error ? (
          <Text style={[styles.error, { color: theme.colors.error }]}>
            {error}
          </Text>
        ) : null}

        <Button
          mode="contained"
          onPress={handleEmailSignIn}
          loading={loading}
          style={styles.button}
        >
          Sign In with Email
        </Button>

        <Link href="/forgot-password" asChild>
          <Button mode="text">Forgot Password?</Button>
        </Link>
      </View>

      {!isExpoGo && (
        <>
          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.outline }]} />
            <Text style={[styles.dividerText, { color: theme.colors.onSurfaceVariant }]}>
              or continue with
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.outline }]} />
          </View>

          <View style={styles.socialButtons}>
            <Button
              mode="outlined"
              onPress={() => handleSocialSignIn('google')}
              icon="google"
              style={[styles.socialButton, { marginRight: 8 }]}
            >
              Google
            </Button>
            {Platform.OS === 'ios' && (
              <Button
                mode="outlined"
                onPress={() => handleSocialSignIn('apple')}
                icon="apple"
                style={styles.socialButton}
              >
                Apple
              </Button>
            )}
          </View>
        </>
      )}

      <View style={styles.footer}>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Don't have an account?{' '}
        </Text>
        <Link href="/sign-up" asChild>
          <Button mode="text" compact>Sign Up</Button>
        </Link>
      </View>
    </ScrollView>
  );
};

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
    marginBottom: 24,
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen; 