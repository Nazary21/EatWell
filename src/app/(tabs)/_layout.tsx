import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { SvgIcon } from '@/shared/components/ui/SvgIcon';
import { HOME_ICON, CHAT_ICON, INSIGHTS_ICON, PROFILE_ICON } from '@/shared/components/ui/TabIcons';
import { CustomTheme } from '@/lib/theme/types';

export default function TabsLayout() {
  const theme = useTheme<CustomTheme>();
  
  // Add extra padding for iOS devices with home indicator
  const bottomPadding = Platform.OS === 'ios' ? 32 : 16;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.backdrop,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { 
          height: 60 + bottomPadding, 
          paddingBottom: bottomPadding, 
          paddingTop: 4 
        },
        headerShown: false, // Hide the header as per the design
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <SvgIcon xml={HOME_ICON} width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <SvgIcon xml={CHAT_ICON} width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <SvgIcon xml={INSIGHTS_ICON} width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <SvgIcon xml={PROFILE_ICON} width={size} height={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 