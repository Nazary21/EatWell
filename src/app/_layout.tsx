import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { useAppDispatch } from '@/lib/store/hooks';
import { lightTheme } from '@/lib/theme';

// Separate component for app initialization logic
function AppInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('🚀 App Initialized');
    console.log('📱 React Native Paper Provider mounted');
    console.log('🧭 Navigation system ready');
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider theme={lightTheme}>
        <AppInitializer />
        <Stack>
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }}
          />
        </Stack>
      </PaperProvider>
    </Provider>
  );
} 