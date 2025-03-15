import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Text, Surface, useTheme, IconButton } from 'react-native-paper';
import { CustomTheme } from '@/lib/theme/types';

interface MealCardProps {
  title: string;
  time: string;
  calories: number;
  image?: ImageSourcePropType;
  onPress?: () => void;
}

/**
 * A card component for displaying meal information
 */
export const MealCard: React.FC<MealCardProps> = ({
  title,
  time,
  calories,
  image,
  onPress,
}) => {
  const theme = useTheme<CustomTheme>();

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
    >
      <View style={styles.contentRow}>
        <View style={styles.infoContainer}>
          <Text variant="titleMedium" style={styles.title}>
            {title}
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
            {time}
          </Text>
          <Text variant="bodyLarge" style={styles.calories}>
            {calories} kcal
          </Text>
        </View>
        
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={image} style={styles.image} />
          ) : (
            <View 
              style={[
                styles.imagePlaceholder, 
                { backgroundColor: theme.colors.surfaceVariant }
              ]} 
            />
          )}
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 16,
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calories: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  imageContainer: {
    marginLeft: 16,
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
  },
});
