import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createTheme } from '@/lib/theme';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { AppProvider } from '@/features/core/providers/AppProvider';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent auto hiding of splash screen
SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  const theme = createTheme(colorScheme === 'dark');
  
  // Load any required fonts
  const [fontsLoaded] = useFonts({
    // No custom fonts for now, but we still want to wait for system fonts
  });
  
  // Hide splash screen when ready
  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    
    hideSplash();
  }, [fontsLoaded]);
  
  // Keep showing splash screen until fonts are loaded
  if (!fontsLoaded) {
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