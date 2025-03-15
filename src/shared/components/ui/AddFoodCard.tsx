import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomSurface } from './CustomSurface';
import { CustomTheme } from '@/lib/theme/types';

interface AddFoodCardProps {
  onPhotoPress: () => void;
  onWritePress: () => void;
  onBarcodePress: () => void;
}

/**
 * A card component with options to add food entries via different methods
 */
export const AddFoodCard: React.FC<AddFoodCardProps> = ({
  onPhotoPress,
  onWritePress,
  onBarcodePress,
}) => {
  const theme = useTheme<CustomTheme>();

  return (
    <CustomSurface
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.custom.radius.xl,
        },
      ]}
    >
      <Text variant="titleMedium" style={styles.title}>
        Add food entry
      </Text>
      
      <View style={styles.optionsRow}>
        <TouchableOpacity
          style={[
            styles.optionButton, 
            { backgroundColor: theme.colors.surfaceVariant }
          ]}
          onPress={onPhotoPress}
        >
          <MaterialCommunityIcons 
            name="camera" 
            size={24} 
            color="#555" 
          />
          <Text style={styles.optionText}>Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.optionButton, 
            { backgroundColor: theme.colors.surfaceVariant }
          ]}
          onPress={onWritePress}
        >
          <MaterialCommunityIcons 
            name="pencil" 
            size={24} 
            color="#555" 
          />
          <Text style={styles.optionText}>Write down</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.optionButton, 
            { backgroundColor: theme.colors.surfaceVariant }
          ]}
          onPress={onBarcodePress}
        >
          <MaterialCommunityIcons 
            name="barcode-scan" 
            size={24} 
            color="#555" 
          />
          <Text style={styles.optionText}>Barcode</Text>
        </TouchableOpacity>
      </View>
    </CustomSurface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 12,
    width: '100%',
  },
  title: {
    fontWeight: '600',
    marginBottom: 16,
    fontSize: 18,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '31%',
    height: 82,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  optionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
}); 