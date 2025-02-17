import { View, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useState } from 'react';
import { testSupabaseConnection } from '@/lib/supabase-test';

export default function TestScreen() {
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async () => {
    setIsLoading(true);
    try {
      const result = await testSupabaseConnection();
      setTestResult(result);
      console.log('Test result:', result);
    } catch (error) {
      setTestResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      console.error('Test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView 
      style={{ flex: 1 }} 
      contentContainerStyle={{ padding: 16 }}
    >
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Supabase Connection Test
      </Text>
      
      <Button 
        mode="contained" 
        onPress={runTest}
        loading={isLoading}
        style={{ marginBottom: 16 }}
      >
        Run Connection Test
      </Button>

      {testResult && (
        <View style={{ marginTop: 16 }}>
          <Text variant="titleMedium" style={{ marginBottom: 8 }}>
            Test Result:
          </Text>
          <Text variant="bodyMedium" style={{ 
            color: testResult.success ? '#22c55e' : '#ef4444'
          }}>
            Status: {testResult.success ? 'Success' : 'Failed'}
          </Text>
          {testResult.message && (
            <Text variant="bodyMedium" style={{ marginTop: 8 }}>
              Message: {testResult.message}
            </Text>
          )}
          {testResult.error && (
            <Text variant="bodyMedium" style={{ marginTop: 8, color: '#ef4444' }}>
              Error: {testResult.error}
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
} 