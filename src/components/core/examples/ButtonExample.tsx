import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../Button';

export const ButtonExample = () => {
  const [loading, setLoading] = useState(false);

  const handleAsyncAction = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Basic variants */}
      <Button onPress={() => {}}>
        Primary Button
      </Button>

      <Button 
        variant="secondary"
        onPress={() => {}}
      >
        Secondary Button
      </Button>

      <Button 
        variant="danger"
        onPress={() => {}}
      >
        Danger Button
      </Button>

      {/* Sizes */}
      <Button 
        size="small"
        onPress={() => {}}
      >
        Small Button
      </Button>

      <Button 
        size="large"
        onPress={() => {}}
      >
        Large Button
      </Button>

      {/* Loading state */}
      <Button 
        loading={loading}
        onPress={handleAsyncAction}
      >
        Loading Button
      </Button>

      {/* Full width */}
      <Button 
        fullWidth
        onPress={() => {}}
      >
        Full Width Button
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
}); 