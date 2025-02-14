import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    console.log('🚀 App Initialized');
    console.log('📱 React Native Paper Provider mounted');
    console.log('🧭 Navigation system ready');
  }, []);

  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }}
        />
      </Stack>
    </PaperProvider>
  );
} 