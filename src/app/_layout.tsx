import { Slot, Stack } from 'expo-router';
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { Redirect } from 'expo-router';
import theme from '@/theme';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    PlusJakartaSans_700Bold,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      console.log('🎨 Fonts loaded successfully');
    }
  }, [fontsLoaded]);

  useEffect(() => {
    console.log('🚀 App Initialized');
    console.log('📱 React Native Paper Provider mounted');
    console.log('🧭 Navigation system ready');
    console.log('🌓 Color scheme:', colorScheme);
  }, [colorScheme]);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  return (
    <PaperProvider theme={colorScheme === 'dark' ? theme.dark : theme.light}>
      <Slot />
      {!session && <Redirect href="/(auth)/sign-in" />}
    </PaperProvider>
  );
} 