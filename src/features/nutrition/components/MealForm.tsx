import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput as RNTextInput } from 'react-native';
import { Text, Button, TextInput, Chip, useTheme } from 'react-native-paper';
import { FoodItem, Meal } from '@/services/api/types';
import { CustomTheme } from '@/lib/theme/types';

interface MealFormProps {
  onSave: (meal: Omit<Meal, 'id'>) => void;
  onCancel: () => void;
  initialData?: Partial<Meal>;
}

/**
 * Form for adding or editing a meal
 * This is a placeholder component that will be implemented with actual functionality
 */
export const MealForm: React.FC<MealFormProps> = ({ onSave, onCancel, initialData }) => {
  const theme = useTheme<CustomTheme>();
  const [name, setName] = useState(initialData?.name || '');
  const [foods, setFoods] = useState<FoodItem[]>(initialData?.foods || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  
  // Calculate total calories
  const totalCalories = foods.reduce((total, food) => total + food.calories, 0);

  // Handle save
  const handleSave = () => {
    if (!name) {
      // Show validation error
      return;
    }
    
    const mealData: Omit<Meal, 'id'> = {
      userId: '1', // This would come from auth context in a real app
      name,
      dateTime: new Date().toISOString(),
      totalCalories,
      foods,
    };
    
    onSave(mealData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        {initialData ? 'Edit Meal' : 'Add New Meal'}
      </Text>
      
      <TextInput
        label="Meal Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />
      
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Add Foods
      </Text>
      
      <TextInput
        label="Search for foods"
        value={searchQuery}
        onChangeText={setSearchQuery}
        mode="outlined"
        style={styles.input}
        right={<TextInput.Icon icon="magnify" />}
      />
      
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Selected Foods
      </Text>
      
      {foods.length > 0 ? (
        foods.map((food, index) => (
          <Chip 
            key={index}
            style={styles.chip}
            onClose={() => {
              setFoods(foods.filter((_, i) => i !== index));
            }}
          >
            {food.name} - {food.calories} kcal
          </Chip>
        ))
      ) : (
        <Text style={styles.emptyText}>No foods added yet</Text>
      )}
      
      <View style={styles.summaryContainer}>
        <Text variant="titleMedium">Total Calories:</Text>
        <Text variant="titleMedium">{totalCalories} kcal</Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <Button mode="outlined" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button 
          mode="contained"
          onPress={handleSave}
          style={styles.button}
          disabled={!name || foods.length === 0}
        >
          Save
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
  chip: {
    margin: 4,
  },
  emptyText: {
    fontStyle: 'italic',
    opacity: 0.6,
    marginVertical: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
}); 