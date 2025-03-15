import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { CustomSurface } from './CustomSurface';
import { CustomTheme } from '@/lib/theme/types';

interface MacroRatioProps {
  carbsPercentage: number;
  proteinPercentage: number;
  fatPercentage: number;
  status?: 'Balanced' | 'Unbalanced' | string;
  statusColor?: string;
}

/**
 * A card component displaying macronutrient ratios with a color-coded progress bar
 */
export const MacroRatioCard: React.FC<MacroRatioProps> = ({
  carbsPercentage,
  proteinPercentage,
  fatPercentage,
  status = 'Balanced',
  statusColor = '#4CAF50', // Default to green for 'Balanced'
}) => {
  const theme = useTheme<CustomTheme>();

  // Ensure percentages add up to 100%
  const total = carbsPercentage + proteinPercentage + fatPercentage;
  const normalizedCarbs = (carbsPercentage / total) * 100;
  const normalizedProtein = (proteinPercentage / total) * 100;
  const normalizedFat = (fatPercentage / total) * 100;

  // Colors from the design
  const carbsColor = '#FF3D7F';  // Pink
  const proteinColor = '#25C0FC'; // Blue
  const fatColor = '#FFC738';    // Yellow

  return (
    <CustomSurface
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.custom.radius.xl, // Using xl (24px) for consistency
        },
      ]}
    >
      <View style={styles.header}>
        <Text variant="bodyMedium" style={styles.title}>
          Macronutrients ratio
        </Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.barContainer}>
        <View 
          style={[
            styles.barSegment, 
            { width: `${normalizedCarbs}%`, backgroundColor: carbsColor }
          ]} 
        />
        <View 
          style={[
            styles.barSegment, 
            { width: `${normalizedProtein}%`, backgroundColor: proteinColor }
          ]} 
        />
        <View 
          style={[
            styles.barSegment, 
            { width: `${normalizedFat}%`, backgroundColor: fatColor }
          ]} 
        />
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: carbsColor }]} />
          <Text variant="titleMedium" style={styles.legendValue}>
            {Math.round(carbsPercentage)}%
          </Text>
          <Text variant="bodySmall" style={styles.legendLabel}>
            Carbs
          </Text>
        </View>
        
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: proteinColor }]} />
          <Text variant="titleMedium" style={styles.legendValue}>
            {Math.round(proteinPercentage)}%
          </Text>
          <Text variant="bodySmall" style={styles.legendLabel}>
            Protein
          </Text>
        </View>
        
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: fatColor }]} />
          <Text variant="titleMedium" style={styles.legendValue}>
            {Math.round(fatPercentage)}%
          </Text>
          <Text variant="bodySmall" style={styles.legendLabel}>
            Fat
          </Text>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#6E6E6E',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  barContainer: {
    height: 12,
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 16,
  },
  barSegment: {
    height: '100%',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  legendItem: {
    alignItems: 'center',
    flex: 1,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  legendValue: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 2,
  },
  legendLabel: {
    color: '#6E6E6E',
    fontSize: 14,
    marginTop: 0,
  },
}); 