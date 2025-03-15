import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from '@/lib/theme';
import { AppProvider } from '@/features/core/providers/AppProvider';

export default function RootLayout() {
  return (
    <PaperProvider theme={lightTheme}>
      <AppProvider>
        <Stack>
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }}
          />
        </Stack>
      </AppProvider>
    </PaperProvider>
  );
} 