import React, { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createTheme } from '@/lib/theme';
import { useColorScheme, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { AppProvider } from '@/features/core/providers/AppProvider';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent auto hiding of splash screen
SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  const theme = createTheme(colorScheme === 'dark');
  const [fontError, setFontError] = useState(false);
  
  // Font definitions for Android
  const fontAssets = Platform.OS === 'android' 
    ? {
        'Inter': require('./assets/fonts/Inter-Regular.ttf'),
        'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
        'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
      } 
    : {};
  
  // Load any required fonts (Inter for Android)
  const [fontsLoaded] = useFonts(fontAssets);
  
  // Hide splash screen when ready
  useEffect(() => {
    async function hideSplash() {
      try {
        // Hide splash screen if fonts loaded or we're on iOS (using system fonts)
        if (fontsLoaded || Platform.OS === 'ios' || fontError) {
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.error('Error hiding splash screen:', e);
        setFontError(true);
        await SplashScreen.hideAsync();
      }
    }
    
    hideSplash();
  }, [fontsLoaded, fontError]);
  
  // If fonts are still loading and we're on Android, wait
  if (!fontsLoaded && Platform.OS === 'android' && !fontError) {
    return null;
  }

  // Provide PaperProvider for the app with our custom theme
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AppProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </AppProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 