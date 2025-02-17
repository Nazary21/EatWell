import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { signUpWithEmail, signInWithProvider } from '@/lib/auth';
import type { SignInProvider } from '@/lib/auth';

const SignUpScreen = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      await signUpWithEmail({ email, password });
      router.replace('/(tabs)');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: SignInProvider) => {
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
          Create Account
        </Text>
        <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
          Sign up to get started
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
          testID="email-input"
        />
        
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password-new"
          style={styles.input}
          testID="password-input"
        />

        {error ? (
          <Text style={[styles.error, { color: theme.colors.error }]}>
            {error}
          </Text>
        ) : null}

        <Button
          mode="contained"
          onPress={handleEmailSignUp}
          loading={loading}
          style={styles.button}
        >
          Sign Up
        </Button>
      </View>

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

      <View style={styles.footer}>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Already have an account?{' '}
        </Text>
        <Link href="/sign-in" asChild>
          <Button mode="text" compact>Sign In</Button>
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

export default SignUpScreen; 