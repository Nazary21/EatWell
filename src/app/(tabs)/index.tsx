import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppSelector } from '@/lib/store/hooks';

export default function HomeScreen() {
  const { profile } = useAppSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text variant="displaySmall" style={styles.title}>
          Welcome to EatWell
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          {profile ? `Hello, ${profile.displayName}!` : 'Please set up your profile in Settings'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    marginBottom: 12,
  },
  subtitle: {
    color: '#38434D',
  },
}); 