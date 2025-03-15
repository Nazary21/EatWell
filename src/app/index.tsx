import { Redirect } from 'expo-router';

export default function Index() {
  // Immediately redirect to tabs/home screen
  return <Redirect href="/(tabs)" />;
} 