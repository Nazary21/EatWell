import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import { ScreenHeader } from '@/shared/components/ui/ScreenHeader';
import { MacroRatioCard } from '@/shared/components/ui/MacroRatioCard';
import { CaloriesStatsCard } from '@/shared/components/ui/CaloriesStatsCard';
import { NutritionalScoreCard } from '@/shared/components/ui/NutritionalScoreCard';
import { FilterTabs } from '@/shared/components/ui/FilterTabs';
import { CustomTheme } from '@/lib/theme/types';
import { useNutrition } from '@/features/nutrition/context/NutritionContext';

type FilterPeriod = 'today' | 'weekly' | 'monthly';

export default function InsightsScreen() {
  const theme = useTheme<CustomTheme>();
  const { dailyNutrition, meals } = useNutrition();
  const [selectedPeriod, setSelectedPeriod] = useState<FilterPeriod>('today');
  
  // Today's date formatted for display
  const todayFormatted = format(new Date(), "d MMM");
  const todayLabel = `Today, ${todayFormatted}`;
  
  // Mock data for the week calories chart
  const mockWeekData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday
    
    return days.map((day, index) => {
      const dayDiff = index - currentDay;
      const date = new Date(today);
      date.setDate(today.getDate() + dayDiff);
      
      // If the day is in the future, show 0 calories
      const isFuture = dayDiff > 0;
      
      return {
        day,
        date: format(date, 'd MMM'),
        calories: isFuture ? 0 : 1800 + Math.floor(Math.random() * 1200), // Random calories for past days
        goal: 2800, // Consistent goal
      };
    });
  }, []);
  
  // Calculate macronutrient percentages
  const macros = useMemo(() => {
    if (!dailyNutrition) {
      return { carbs: 21, protein: 24, fat: 55 }; // Default values matching design
    }
    
    const totalCalories = dailyNutrition.totalCalories || 1;
    
    // Convert grams to calories and calculate percentages
    const carbsCalories = (dailyNutrition.totalCarbs || 0) * 4; // 4 calories per gram
    const proteinCalories = (dailyNutrition.totalProtein || 0) * 4; // 4 calories per gram
    const fatCalories = (dailyNutrition.totalFat || 0) * 9; // 9 calories per gram
    
    const carbsPercentage = Math.round((carbsCalories / totalCalories) * 100);
    const proteinPercentage = Math.round((proteinCalories / totalCalories) * 100);
    const fatPercentage = Math.round((fatCalories / totalCalories) * 100);
    
    // Ensure percentages add up to 100%
    const total = carbsPercentage + proteinPercentage + fatPercentage;
    if (total !== 100) {
      // Adjust the largest value to make sum 100%
      if (carbsPercentage >= proteinPercentage && carbsPercentage >= fatPercentage) {
        return { carbs: carbsPercentage - (total - 100), protein: proteinPercentage, fat: fatPercentage };
      } else if (proteinPercentage >= carbsPercentage && proteinPercentage >= fatPercentage) {
        return { carbs: carbsPercentage, protein: proteinPercentage - (total - 100), fat: fatPercentage };
      } else {
        return { carbs: carbsPercentage, protein: proteinPercentage, fat: fatPercentage - (total - 100) };
      }
    }
    
    return { carbs: carbsPercentage, protein: proteinPercentage, fat: fatPercentage };
  }, [dailyNutrition]);
  
  // Calculate nutritional score (mock for now)
  const nutritionalScore = 99; // As shown in the design

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScreenHeader title="Insights" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter Tabs */}
        <FilterTabs
          selected={selectedPeriod}
          onSelect={setSelectedPeriod}
          todayLabel={todayLabel}
        />
        
        {/* Calories Stats Card */}
        <CaloriesStatsCard
          current={dailyNutrition?.totalCalories || 2350}
          goal={2800}
          changePercentage={5}
          weekData={mockWeekData}
        />
        
        {/* Macro Ratio Card */}
        <MacroRatioCard
          carbsPercentage={macros.carbs}
          proteinPercentage={macros.protein}
          fatPercentage={macros.fat}
          status="Balanced"
          statusColor="#4CAF50"
        />
        
        {/* Nutritional Score Card */}
        <NutritionalScoreCard score={nutritionalScore} />
      </ScrollView>
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
    paddingBottom: 24,
  },
});
