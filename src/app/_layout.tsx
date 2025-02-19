import { Slot, useRouter, useSegments } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useColorScheme, View, ActivityIndicator, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import theme from '@/theme';
import { supabase } from '@/lib/supabase';
import { store } from '@/store';
import { setSession } from '@/store/slices/authSlice';

// Keep splash screen visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  // Initialize app
  useEffect(() => {
    async function initialize() {
      try {
        // Load fonts
        await Font.loadAsync({
          'MaterialCommunityIcons': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
        });

        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        store.dispatch(setSession(session));

        // Hide splash screen
        await SplashScreen.hideAsync();
        
        // Mark as ready
        setIsReady(true);

        // Handle initial navigation after layout is mounted
        if (!session && segments[0] !== '(auth)') {
          router.replace('/(auth)/sign-in');
        }
      } catch (error) {
        console.error('Initialization error:', error);
        setIsReady(true); // Still mark as ready to prevent infinite loading
      }
    }

    initialize();
  }, [router, segments]);

  // Set up auth listener
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      store.dispatch(setSession(session));
      if (!session && segments[0] !== '(auth)') {
        router.replace('/(auth)/sign-in');
      }
    });

    return () => authListener?.subscription.unsubscribe();
  }, [router, segments]);

  // Show loading screen
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#8b5cf6" />
        <Text style={{ marginTop: 16, textAlign: 'center' }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={colorScheme === 'dark' ? theme.dark : theme.light}>
        <View style={{ flex: 1 }}>
          <Slot />
        </View>
      </PaperProvider>
    </Provider>
  );
} 