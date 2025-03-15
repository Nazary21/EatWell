import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/lib/theme/useTheme';
import { Card } from '@/components/ui/Card';
import { Meal } from '@/features/nutrition/types';

interface MealCardProps {
  meal: Meal;
  onPress?: () => void;
}

export const MealCard = ({ meal, onPress }: MealCardProps) => {
  const theme = useTheme();
  
  const getTotalCalories = () => {
    return meal.foods.reduce((total, food) => total + food.calories, 0);
  };
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card variant="elevated" style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.colors.neutral[900] }]}>
              {meal.name}
            </Text>
            <Text style={[styles.time, { color: theme.colors.neutral[500] }]}>
              {meal.time}
            </Text>
          </View>
          <View style={[styles.calorieContainer, { backgroundColor: theme.colors.purple[100] }]}>
            <Text style={[styles.calories, { color: theme.colors.purple[700] }]}>
              {getTotalCalories()} cal
            </Text>
          </View>
        </View>
        
        <View style={styles.foodsContainer}>
          {meal.foods.map((food, index) => (
            <View key={index} style={styles.foodItem}>
              <Text style={[styles.foodName, { color: theme.colors.neutral[800] }]}>
                {food.name}
              </Text>
              <View style={styles.foodInfoContainer}>
                <Text style={[styles.foodCalories, { color: theme.colors.neutral[700] }]}>
                  {food.calories} cal
                </Text>
                <Text style={[styles.foodServing, { color: theme.colors.neutral[500] }]}>
                  {food.servingSize} {food.servingUnit}
                </Text>
              </View>
            </View>
          ))}
        </View>
        
        <TouchableOpacity style={styles.addMoreButton}>
          <Ionicons name="add-circle-outline" size={16} color={theme.colors.purple[500]} />
          <Text style={[styles.addMoreText, { color: theme.colors.purple[500] }]}>
            Add more
          </Text>
        </TouchableOpacity>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  time: {
    fontSize: 14,
  },
  calorieContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  calories: {
    fontSize: 14,
    fontWeight: '600',
  },
  foodsContainer: {
    marginBottom: 8,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E1E1E1',
  },
  foodName: {
    flex: 1,
    fontSize: 15,
  },
  foodInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodCalories: {
    fontSize: 14,
    marginRight: 8,
    fontWeight: '500',
  },
  foodServing: {
    fontSize: 12,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  addMoreText: {
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  },
}); 