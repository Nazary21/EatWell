import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, List, Switch, Divider, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/shared/components/ui/ScreenHeader';
import { useUser } from '@/features/user/context/UserContext';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const theme = useTheme();
  const { user, updatePreferences, signOut } = useUser();
  
  const handleToggleNotifications = (value: boolean) => {
    updatePreferences({ notifications: value });
  };
  
  const handleToggleDarkMode = (value: boolean) => {
    updatePreferences({ darkMode: value });
  };
  
  const handleToggleMetricSystem = (value: boolean) => {
    updatePreferences({ useMetricSystem: value });
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScreenHeader 
        title="Settings" 
        showBackButton 
        onBackPress={() => router.back()}
      />
      <ScrollView>
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            App Preferences
          </Text>
          
          <List.Item
            title="Notifications"
            description="Receive alerts and reminders"
            left={props => <List.Icon {...props} icon="bell" />}
            right={props => (
              <Switch
                value={user?.preferences?.notifications || false}
                onValueChange={handleToggleNotifications}
              />
            )}
          />
          <Divider />
          
          <List.Item
            title="Dark Mode"
            description="Use dark theme"
            left={props => <List.Icon {...props} icon="moon-waning-crescent" />}
            right={props => (
              <Switch
                value={user?.preferences?.darkMode || false}
                onValueChange={handleToggleDarkMode}
              />
            )}
          />
          <Divider />
          
          <List.Item
            title="Metric System"
            description="Use kg, cm instead of lb, in"
            left={props => <List.Icon {...props} icon="scale" />}
            right={props => (
              <Switch
                value={user?.preferences?.useMetricSystem || false}
                onValueChange={handleToggleMetricSystem}
              />
            )}
          />
        </View>
        
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Account
          </Text>
          
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield-account" />}
            onPress={() => {}}
          />
          <Divider />
          
          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="file-document" />}
            onPress={() => {}}
          />
          <Divider />
          
          <List.Item
            title="About"
            left={props => <List.Icon {...props} icon="information" />}
            onPress={() => {}}
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            mode="outlined" 
            onPress={signOut} 
            style={styles.button}
            textColor={theme.colors.error}
          >
            Sign Out
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  button: {
    marginVertical: 4,
  },
}); 