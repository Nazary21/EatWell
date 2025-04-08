import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { CustomSurface } from './CustomSurface';
import { CaloriesWeekChart } from './CaloriesWeekChart';
import { CustomTheme } from '@/lib/theme/types';

interface CaloriesStatsCardProps {
  current: number;
  goal: number;
  changePercentage?: number;
  weekData: {
    day: string;
    date: string;
    calories: number;
    goal: number;
  }[];
  style?: object;
}

/**
 * A card component for displaying calories statistics with a chart
 */
export const CaloriesStatsCard: React.FC<CaloriesStatsCardProps> = ({
  current,
  goal,
  changePercentage,
  weekData,
  style,
}) => {
  const theme = useTheme<CustomTheme>();
  
  // Format the change percentage for display
  const formattedChange = changePercentage !== undefined 
    ? (changePercentage > 0 ? `+${changePercentage}%` : `${changePercentage}%`)
    : null;
  
  // Determine color for change percentage (positive is green, negative is red)
  const changeColor = changePercentage !== undefined
    ? (changePercentage > 0 ? '#00E096' : '#FF3D7F')
    : theme.colors.outline;

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
        <Text variant="titleMedium" style={styles.title}>
          Calories
        </Text>
        
        {formattedChange && (
          <View style={styles.changeContainer}>
            <Text variant="bodyMedium" style={styles.todayText}>Today</Text>
            <Text style={[styles.changeText, { color: changeColor }]}>
              {formattedChange}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.valueContainer}>
        <Text variant="headlineLarge" style={styles.value}>
          {current.toLocaleString()}
        </Text>
        <Text variant="titleMedium" style={styles.separator}>/</Text>
        <Text variant="titleLarge" style={styles.goal}>
          {goal.toLocaleString()}
        </Text>
        <Text variant="bodySmall" style={styles.goalLabel}>goal</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <CaloriesWeekChart data={weekData} />
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
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayText: {
    marginRight: 8,
    color: '#777777',
  },
  changeText: {
    fontWeight: '600',
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  value: {
    fontWeight: '700',
    fontSize: 32,
  },
  separator: {
    marginHorizontal: 4,
    color: '#777777',
  },
  goal: {
    color: '#777777',
  },
  goalLabel: {
    marginLeft: 4,
    color: '#777777',
  },
  chartContainer: {
    marginTop: 8,
  },
}); 