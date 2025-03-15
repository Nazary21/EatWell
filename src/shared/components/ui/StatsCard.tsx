import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { CustomSurface } from './CustomSurface';
import { CustomTheme } from '@/lib/theme/types';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badgeText?: string;
  badgeColor?: string;
  style?: object;
}

/**
 * A card component for displaying stats information like calories and scores
 */
export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  badgeText,
  badgeColor,
  style,
}) => {
  const theme = useTheme<CustomTheme>();

  // Format the value if it's a number (for calories)
  const displayValue = typeof value === 'number' ? 
    `${value}` : // Numbers displayed as is
    value; // Strings (like percentages) kept as is
  
  // Format the unit based on the type of value
  const unitText = typeof value === 'number' ? 'kcal' : '';

  return (
    <CustomSurface
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.custom.radius.xl, // Using xl (24px) for consistency
       //   ...theme.custom.elevation.none,
        },
        style,
      ]}
    >
      <Text variant="bodyMedium" style={styles.title}>
        {title}
      </Text>
      
      <View style={styles.valueContainer}>
        <Text variant="headlineLarge" style={styles.value}>
          {displayValue}
        </Text>
        
        {unitText && (
          <Text variant="bodyMedium" style={[styles.unit, { color: theme.colors.outline }]}>
            {unitText}
          </Text>
        )}
      </View>
      
      {subtitle && (
        <Text 
          variant="bodySmall" 
          style={[styles.subtitle, { color: theme.colors.outline }]}
        >
          {subtitle}
        </Text>
      )}
      
      {badgeText && (
        <View 
          style={[
            styles.badge, 
            { backgroundColor: badgeColor || theme.colors.primary }
          ]}
        >
          <Text style={styles.badgeText}>
            {badgeText}
          </Text>
        </View>
      )}
    </CustomSurface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    minHeight: 120,
  },
  title: {
    marginBottom: 8,
    color: '#6E6E6E',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 40,
    marginRight: 4,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 14,
  },
  unit: {
    fontSize: 16,
    marginLeft: 4,
  },
  badge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
}); 