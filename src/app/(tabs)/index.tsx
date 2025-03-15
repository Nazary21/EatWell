import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, useTheme, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/shared/components/ui/ScreenHeader';
import { MealCard } from '@/shared/components/ui/MealCard';
import { ActionButton } from '@/shared/components/ui/ActionButton';
import { CustomTheme } from '@/lib/theme/types';
import { useNutrition } from '@/features/nutrition/context/NutritionContext';

export default function HomeScreen() {
  const theme = useTheme<CustomTheme>();
  const { todayMeals, recentMeals, dailyNutrition, isLoading } = useNutrition();

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScreenHeader title="Today" rightIcon="bell-outline" onRightIconPress={() => console.log('Notifications')} />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Summary Section */}
        <View style={styles.summaryContainer}>
          <View style={[styles.progressCircle, { borderColor: theme.colors.primary }]}>
            <Text variant="headlineMedium" style={styles.caloriesText}>
              {dailyNutrition?.totalCalories || 0}
            </Text>
            <Text variant="bodySmall">kcal</Text>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="titleMedium">2000</Text>
              <Text variant="bodySmall">Goal</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="titleMedium">{2000 - (dailyNutrition?.totalCalories || 0)}</Text>
              <Text variant="bodySmall">Left</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="titleMedium">{dailyNutrition?.totalProtein || 0}g</Text>
              <Text variant="bodySmall">Protein</Text>
            </View>
          </View>
        </View>

        {/* Today's Meals Section */}
        <View style={styles.sectionContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Today's Meals
          </Text>
          
          {todayMeals.length > 0 ? (
            todayMeals.map((meal) => (
              <MealCard
                key={meal.id}
                title={meal.name}
                time={new Date(meal.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                calories={meal.totalCalories}
                onPress={() => console.log('Meal pressed:', meal.id)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No meals added yet today</Text>
          )}
        </View>

        <Divider style={styles.divider} />

        {/* Recent Meals Section */}
        <View style={styles.sectionContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Recent Meals
          </Text>
          
          {recentMeals.length > 0 ? (
            recentMeals.map((meal) => (
              <MealCard
                key={meal.id}
                title={meal.name}
                time={new Date(meal.dateTime).toLocaleDateString()}
                calories={meal.totalCalories}
                onPress={() => console.log('Meal pressed:', meal.id)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No recent meals</Text>
          )}
        </View>
      </ScrollView>

      <ActionButton
        icon="plus"
        onPress={() => console.log('Add meal')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80, // Space for the FAB
  },
  summaryContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  caloriesText: {
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  sectionContainer: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    opacity: 0.6,
  },
  divider: {
    marginVertical: 16,
  },
}); 