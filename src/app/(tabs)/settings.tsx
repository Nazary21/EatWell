import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/shared/components/ui/ScreenHeader';

export default function SettingsScreen() {
  const theme = useTheme();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Settings" />
      <ScrollView>
        <View style={styles.section}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            Settings
          </Text>
          <Text>
            This is a placeholder for settings screen.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 8,
  },
  buttonContainer: {
    marginTop: 16,
    gap: 8,
  },
  button: {
    marginVertical: 4,
  },
  jsonContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  jsonLine: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: -0.5,
  },
}); 