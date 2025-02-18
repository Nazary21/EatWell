import 'react-native-url-polyfill/auto';
import { Platform } from 'react-native';
import { supabase } from './supabase';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { store } from '@/store';
import { setSession } from '@/store/slices/authSlice';
import { setProfile } from '@/store/slices/profileSlice';

export type SignInProvider = 'google' | 'apple' | 'email';

export interface EmailSignInCredentials {
  email: string;
  password: string;
}

// Check if we're in Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

// Only import and initialize Google Sign-In if not in Expo Go
let GoogleSignin: any;
if (!isExpoGo) {
  GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin;
  GoogleSignin.configure({
    webClientId: Platform.select({
      android: '963420431336-et5t2rtngh7a74pfchl5jckj7kpvbiu6.apps.googleusercontent.com',
      ios: '963420431336-5fj4ri1jsqoveensf9bf619f14o4qun8.apps.googleusercontent.com',
    }),
    iosClientId: '963420431336-5fj4ri1jsqoveensf9bf619f14o4qun8.apps.googleusercontent.com',
  });
}

export const checkAuthState = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  store.dispatch(setSession(session));

  if (!session) {
    router.replace('/(auth)/sign-in');
    return;
  }

  try {
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) throw error;

    store.dispatch(setProfile(profile));
    
    // Check if onboarding is complete
    const isOnboardingComplete = profile && (
      profile.gender &&
      profile.workout_frequency &&
      profile.goal_type
    );

    router.replace(isOnboardingComplete ? '/(tabs)' : '/(onboarding)/gender');
  } catch (error) {
    console.error('Error checking profile:', error);
    router.replace('/(auth)/sign-in');
  }
};

// Initialize auth state listener
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('🔄 Auth state changed:', event, session ? 'Authenticated' : 'Not authenticated');
  store.dispatch(setSession(session));

  if (event === 'SIGNED_OUT' || !session) {
    router.replace('/(auth)/sign-in');
    return;
  }

  // On sign in or token refresh, check profile and navigate
  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    await checkAuthState();
  }
});

export const signInWithEmail = async ({ email, password }: EmailSignInCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signUpWithEmail = async ({ email, password }: EmailSignInCredentials) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signInWithProvider = async (provider: SignInProvider) => {
  if (provider === 'email') {
    throw new Error('Use signInWithEmail for email authentication');
  }

  if (isExpoGo) {
    throw new Error('Social sign-in is not available in Expo Go. Please use email authentication.');
  }

  // This code will only run in development builds or production
  if (provider === 'google') {
    throw new Error('Google Sign-In requires a development build. Please use email authentication in Expo Go.');
  }

  // For other providers (like Apple), use the default OAuth flow
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${Platform.OS === 'ios' ? 'caltrackerreact://' : 'caltrackerreact'}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  if (!isExpoGo && GoogleSignin && await GoogleSignin.isSignedIn()) {
    await GoogleSignin.signOut();
  }
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  router.replace('/(auth)/sign-in');
};

export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({
    password,
  });
  if (error) throw error;
} 