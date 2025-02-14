import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="headlineMedium">Profile</Text>
      <Text variant="bodyLarge">Your profile information will appear here</Text>
    </View>
  );
} 