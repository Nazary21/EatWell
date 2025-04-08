import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { CustomSurface } from './CustomSurface';
import { CustomTheme } from '@/lib/theme/types';

interface NutritionalScoreCardProps {
  score: number; // 0-100
  style?: object;
}

/**
 * A card component for displaying the daily nutritional score with a progress bar
 */
export const NutritionalScoreCard: React.FC<NutritionalScoreCardProps> = ({
  score,
  style,
}) => {
  const theme = useTheme<CustomTheme>();
  
  // Ensure the score is between 0-100
  const normalizedScore = Math.min(Math.max(0, score), 100);
  
  // Get the appropriate color based on the score
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#00E096'; // Green for good score
    if (score >= 50) return '#FFC738'; // Yellow for medium score
    return '#FF3D7F'; // Red for low score
  };
  
  const scoreColor = getScoreColor(normalizedScore);

  return (
    <CustomSurface
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.custom.radius.xl,
        },
        style,
      ]}
    >
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.score}>
          {normalizedScore}%
        </Text>
        <Text variant="bodyMedium" style={styles.label}>
          Daily nutritional score
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBackground,
            { backgroundColor: theme.colors.surfaceVariant }
          ]}
        />
        <View 
          style={[
            styles.progressFill,
            { 
              backgroundColor: scoreColor,
              width: `${normalizedScore}%`
            }
          ]}
        />
      </View>
    </CustomSurface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  score: {
    fontWeight: '700',
    marginRight: 12,
  },
  label: {
    color: '#777777',
  },
  progressContainer: {
    height: 12,
    position: 'relative',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  progressFill: {
    position: 'absolute',
    height: '100%',
  },
}); 