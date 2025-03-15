import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, useTheme, Divider, List, Switch, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenHeader } from '@/shared/components/ui/ScreenHeader';
import { ProfileCard } from '@/shared/components/ui/ProfileCard';
import { CustomTheme } from '@/lib/theme/types';
import { useUser } from '@/features/user/context/UserContext';

export default function ProfileScreen() {
  const theme = useTheme<CustomTheme>();
  const { user, userProfile, updatePreferences, signOut } = useUser();
  
  const [notifications, setNotifications] = useState(user?.preferences?.notifications || false);
  const [darkMode, setDarkMode] = useState(user?.preferences?.darkMode || false);

  // Toggle notifications
  const handleToggleNotifications = (value: boolean) => {
    setNotifications(value);
    updatePreferences({ notifications: value });
  };

  // Toggle dark mode
  const handleToggleDarkMode = (value: boolean) => {
    setDarkMode(value);
    updatePreferences({ darkMode: value });
  };

  // Handle sign out
  const handleSignOut = () => {
    signOut();
  };

  if (!user || !userProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Profile" />
        <View style={styles.centeredContainer}>
          <Text>Please sign in to view your profile</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScreenHeader title="Profile" rightIcon="cog" onRightIconPress={() => console.log('Settings')} />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <ProfileCard
          name={user.name}
          email={user.email}
          onEdit={() => console.log('Edit profile')}
        />
        
        {/* Personal Details */}
        <View style={styles.sectionContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Personal Details
          </Text>
          
          <List.Section>
            <List.Item
              title="Height"
              description={`${userProfile.height || '--'} cm`}
              left={props => <List.Icon {...props} icon="human-male-height" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log('Edit height')}
            />
            <Divider />
            <List.Item
              title="Weight"
              description={`${userProfile.weight || '--'} kg`}
              left={props => <List.Icon {...props} icon="weight" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log('Edit weight')}
            />
            <Divider />
            <List.Item
              title="Goal Weight"
              description={`${userProfile.goalWeight || '--'} kg`}
              left={props => <List.Icon {...props} icon="target" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log('Edit goal weight')}
            />
            <Divider />
            <List.Item
              title="Age"
              description={userProfile.birthday ? calculateAge(userProfile.birthday) + ' years' : '--'}
              left={props => <List.Icon {...props} icon="calendar" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log('Edit age')}
            />
            <Divider />
            <List.Item
              title="Activity Level"
              description={formatActivityLevel(userProfile.activityLevel)}
              left={props => <List.Icon {...props} icon="run" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log('Edit activity level')}
            />
          </List.Section>
        </View>
        
        {/* App Preferences */}
        <View style={styles.sectionContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            App Preferences
          </Text>
          
          <List.Section>
            <List.Item
              title="Notifications"
              left={props => <List.Icon {...props} icon="bell" />}
              right={() => <Switch value={notifications} onValueChange={handleToggleNotifications} />}
            />
            <Divider />
            <List.Item
              title="Dark Mode"
              left={props => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => <Switch value={darkMode} onValueChange={handleToggleDarkMode} />}
            />
            <Divider />
            <List.Item
              title="Units"
              description={user.preferences?.useMetricSystem ? "Metric (kg, cm)" : "Imperial (lb, in)"}
              left={props => <List.Icon {...props} icon="ruler" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log('Change units')}
            />
          </List.Section>
        </View>
        
        {/* Account Actions */}
        <View style={styles.sectionContainer}>
          <List.Section>
            <List.Item
              title="Privacy Policy"
              left={props => <List.Icon {...props} icon="shield-account" />}
              onPress={() => console.log('Privacy Policy')}
            />
            <Divider />
            <List.Item
              title="Terms of Service"
              left={props => <List.Icon {...props} icon="file-document" />}
              onPress={() => console.log('Terms of Service')}
            />
            <Divider />
            <List.Item
              title="Log Out"
              left={props => <List.Icon {...props} icon="logout" color={theme.colors.error} />}
              titleStyle={{ color: theme.colors.error }}
              onPress={handleSignOut}
            />
          </List.Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper function to calculate age from birthday
const calculateAge = (birthday: string): number => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Helper function to format activity level
const formatActivityLevel = (level?: string): string => {
  if (!level) return '--';
  
  return level.charAt(0).toUpperCase() + level.slice(1);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionContainer: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 