import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { useEffect } from 'react';

export default function TabsLayout() {
  const theme = useTheme();

  useEffect(() => {
    console.log('📑 Tab Navigation Initialized');
    console.log('🎨 Theme loaded:', {
      primary: theme.colors.primary,
      mode: theme.dark ? 'dark' : 'light'
    });
  }, [theme]);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: theme.colors.primary,
      }}
      screenListeners={{
        state: (e) => {
          console.log('🔄 Navigation State Changed:', {
            route: e.data.state.routes[e.data.state.index].name,
            timestamp: new Date().toISOString()
          });
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />
    </Tabs>
  );
} 