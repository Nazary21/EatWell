import { Stack } from 'expo-router';
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';
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
import theme from '@/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    PlusJakartaSans_700Bold,
  });

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

  if (!fontsLoaded) {
    // You might want to render a loading screen here
    return null;
  }

  return (
    <PaperProvider theme={colorScheme === 'dark' ? theme.dark : theme.light}>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }}
        />
      </Stack>
    </PaperProvider>
  );
} 