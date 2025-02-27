import { View, Text, StyleSheet, Pressable } from 'react-native';
import { storageService } from '@/lib/storage/storage-service';
import { useState, useCallback } from 'react';
import { UserProfile } from '@/features/user/types';

export default function Home() {
  const [testResult, setTestResult] = useState<string>('');

  const testStorage = useCallback(async () => {
    try {
      // Test data
      const testUser: UserProfile = {
        id: '1',
        email: 'test@example.com',
        displayName: 'Test User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        preferences: {
          theme: 'light',
          notifications: true,
          measurementSystem: 'metric',
          language: 'en'
        },
        goals: {
          calories: 2000,
          protein: 150,
          carbs: 200,
          fat: 70
        }
      };

      // Test storage operations
      await storageService.set('testUser', testUser);
      const exists = await storageService.exists('testUser');
      const retrieved = await storageService.get<UserProfile>('testUser');
      await storageService.remove('testUser');
      const afterRemove = await storageService.exists('testUser');

      setTestResult(
        `Storage Test Results:\n` +
        `Set: Success\n` +
        `Exists: ${exists}\n` +
        `Get: ${retrieved.data?.displayName}\n` +
        `Remove: Success\n` +
        `Exists after remove: ${afterRemove}`
      );
    } catch (error) {
      setTestResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>Welcome to EatWell</Text>
        
        <Pressable 
          style={styles.button}
          onPress={testStorage}
        >
          <Text style={styles.buttonText}>Test Storage</Text>
        </Pressable>

        {testResult ? (
          <Text style={styles.result}>{testResult}</Text>
        ) : null}
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
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
}); 