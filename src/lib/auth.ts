import { supabase } from './supabase';
import { Platform } from 'react-native';

export type SignInProvider = 'google' | 'apple' | 'email';

export interface EmailSignInCredentials {
  email: string;
  password: string;
}

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
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
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