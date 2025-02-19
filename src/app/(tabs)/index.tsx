import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useAppSelector } from '@/store';

export default function HomeScreen() {
  const theme = useTheme();
  const profile = useAppSelector((state) => state.profile.data);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium">Welcome{profile?.gender ? ` back` : ''}!</Text>
      <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
        Track your meals and progress here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
}); 