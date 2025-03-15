import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Text, useTheme, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomSurface } from './CustomSurface';
import { CustomTheme } from '@/lib/theme/types';

interface FoodEntryCardProps {
  title: string; // E.g., "Breakfast", "Lunch"
  description: string; // E.g., "Oatmeal, eggs, coffee and salad"
  calories: number;
  time: string; // E.g., "9:30 AM"
  image?: ImageSourcePropType;
  tag?: {
    text: string;
    color?: string;
    icon?: any; // Using any for now to avoid type issues
  };
  onPress?: () => void;
}

/**
 * A card component for displaying food entries in a calendar-style layout
 */
export const FoodEntryCard: React.FC<FoodEntryCardProps> = ({
  title,
  description,
  calories,
  time,
  image,
  tag,
  onPress,
}) => {
  const theme = useTheme<CustomTheme>();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <CustomSurface 
        style={[
          styles.surface, 
          { 
            backgroundColor: theme.colors.surface,
            borderRadius: theme.custom.radius.xl, // Using xl (24px) for consistent radius
          }
        ]} 
      >
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View>
              <Text variant="titleMedium" style={styles.title}>
                {title}
              </Text>
              <View style={styles.timeRow}>
                <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                  at
                </Text>
                <Text variant="bodySmall" style={[styles.time, { color: theme.colors.outline }]}>
                  {time}
                </Text>
              </View>
            </View>
            
            <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
              {calories} <Text variant="labelSmall" style={{ color: theme.colors.outline }}>kcal</Text>
            </Text>
          </View>
          
          {description && (
            <Text 
              variant="bodySmall" 
              style={styles.description}
              numberOfLines={2}
            >
              {description}
            </Text>
          )}
          
          {image && (
            <Image 
              source={image}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          
          {tag && (
            <Chip 
              icon={tag.icon} 
              style={[
                styles.tag, 
                { backgroundColor: tag.color || theme.colors.surfaceVariant }
              ]}
              textStyle={{ color: theme.colors.onSurfaceVariant }}
              compact
            >
              {tag.text}
            </Chip>
          )}
        </View>
      </CustomSurface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8, // Keep the default spacing between cards
    width: '100%',
  },
  surface: {
    overflow: 'hidden', // Ensure content respects border radius
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  time: {
    marginLeft: 4,
  },
  description: {
    marginBottom: 12,
    opacity: 0.7,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  tag: {
    alignSelf: 'flex-start',
    height: 28,
    marginTop: 4,
  },
}); 