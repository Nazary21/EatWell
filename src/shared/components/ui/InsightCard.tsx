import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, useTheme, IconButton } from 'react-native-paper';
import { CustomTheme } from '@/lib/theme/types';

interface InsightCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: string;
  color?: string;
  onPress?: () => void;
}

/**
 * A card component for displaying insights and statistics
 */
export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  unit,
  icon,
  color,
  onPress,
}) => {
  const theme = useTheme<CustomTheme>();
  const cardColor = color || theme.colors.primary;

  return (
    <Surface
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.custom.radius.md,
          ...theme.custom.elevation.md,
        },
      ]}
      onTouchEnd={onPress}
    >
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: cardColor + '20' }]}>
            <IconButton
              icon={icon}
              size={20}
              iconColor={cardColor}
              onPress={onPress}
            />
          </View>
        )}
      </View>
      
      <View style={styles.valueContainer}>
        <Text variant="headlineLarge" style={styles.value}>
          {value}
        </Text>
        {unit && (
          <Text variant="bodyLarge" style={styles.unit}>
            {unit}
          </Text>
        )}
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 8,
    flex: 1,
    minHeight: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontWeight: '600',
  },
  iconContainer: {
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontWeight: 'bold',
  },
  unit: {
    marginLeft: 4,
    opacity: 0.7,
  },
});
