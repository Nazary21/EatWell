import { Slot, Redirect, Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { useEffect, useState, useCallback } from 'react';
import { useColorScheme, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans';
import { Provider } from 'react-redux';
import theme from '@/theme';
import { supabase } from '@/lib/supabase';
import { store } from '@/store';
import { setSession } from '@/store/slices/authSlice';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          Inter_400Regular,
          Inter_500Medium,
          Inter_700Bold,
          PlusJakartaSans_700Bold,
        });
        setFontsLoaded(true);
      } catch (e) {
        console.warn('Failed to load fonts:', e);
        // Continue without custom fonts if loading fails
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        console.log('🚀 Preparing app...');
        // Pre-load fonts, make any API calls you need to do here
        const { data: { session } } = await supabase.auth.getSession();
        console.log('👤 Auth state:', session ? 'Authenticated' : 'Not authenticated');
        store.dispatch(setSession(session));
        
        // Set initial route based on auth state
        const route = session ? '/(tabs)' : '/(auth)/sign-in';
        console.log('🔄 Setting initial route:', route);
        setInitialRoute(route);

        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          console.log('🔄 Auth state changed:', session ? 'Authenticated' : 'Not authenticated');
          store.dispatch(setSession(session));
          setInitialRoute(session ? '/(tabs)' : '/(auth)/sign-in');
        });

        return () => subscription.unsubscribe();
      } catch (e) {
        console.warn('❌ Error during preparation:', e);
        setInitialRoute('/(auth)/sign-in');
      } finally {
        console.log('✅ App is ready');
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      console.log('📱 App state:', {
        appIsReady,
        fontsLoaded,
        initialRoute,
        colorScheme
      });
    }
  }, [appIsReady, fontsLoaded, initialRoute, colorScheme]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      console.log('🎨 Layout ready, hiding splash screen');
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded || !initialRoute) {
    console.log('⏳ Loading...', { appIsReady, fontsLoaded, initialRoute });
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={colorScheme === 'dark' ? theme.dark : theme.light}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade',
            }}
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="index" />
          </Stack>
        </View>
      </PaperProvider>
    </Provider>
  );
} 