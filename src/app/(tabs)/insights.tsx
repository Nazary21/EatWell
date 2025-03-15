import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/shared/components/ui/ScreenHeader';
import { InsightCard } from '@/shared/components/ui/InsightCard';
import { CustomTheme } from '@/lib/theme/types';
import { useNutrition } from '@/features/nutrition/context/NutritionContext';

export default function InsightsScreen() {
  const theme = useTheme<CustomTheme>();
  const { dailyNutrition, insights } = useNutrition();
  
  // Find specific insights
  const findInsight = (nutrient: string) => {
    return insights.find(insight => insight.nutrient === nutrient);
  };

  const topNutrient = insights.find(insight => insight.type === 'excess');
  const lowNutrient = insights.find(insight => insight.type === 'deficiency');

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScreenHeader title="Insights" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Today's Summary */}
        <View style={styles.sectionContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Today's Summary
          </Text>
          
          <View style={styles.cardsRow}>
            <InsightCard
              title="Total Calories"
              value={dailyNutrition?.totalCalories || 0}
              unit="kcal"
              icon="fire"
              color={theme.colors.primary}
            />
            <InsightCard
              title="Protein"
              value={dailyNutrition?.totalProtein || 0}
              unit="g"
              icon="arm-flex"
              color={theme.colors.primary}
            />
          </View>
          
          <View style={styles.cardsRow}>
            <InsightCard
              title="Carbs"
              value={dailyNutrition?.totalCarbs || 0}
              unit="g"
              icon="bread-slice"
              color={theme.colors.primary}
            />
            <InsightCard
              title="Fat"
              value={dailyNutrition?.totalFat || 0}
              unit="g"
              icon="oil"
              color={theme.colors.primary}
            />
          </View>
        </View>
        
        <Divider style={styles.divider} />
        
        {/* Weekly Trends */}
        <View style={styles.sectionContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Weekly Trends
          </Text>
          
          <View style={[styles.chartPlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Text>Calorie Chart Placeholder</Text>
          </View>
          
          <View style={styles.cardsRow}>
            <InsightCard
              title="Weekly Average"
              value={1850}
              unit="kcal"
              icon="chart-line"
              color={theme.colors.secondary}
            />
            <InsightCard
              title="Goal Progress"
              value="75"
              unit="%"
              icon="target"
              color={theme.colors.secondary}
            />
          </View>
        </View>
        
        <Divider style={styles.divider} />
        
        {/* Nutrient Insights */}
        <View style={styles.sectionContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Nutrient Insights
          </Text>
          
          {topNutrient && (
            <View style={styles.fullWidthCard}>
              <InsightCard
                title={`Top Nutrient: ${topNutrient.nutrient}`}
                value={topNutrient.value}
                unit="% of daily need"
                icon="information"
                color={theme.colors.tertiary}
              />
            </View>
          )}
          
          {lowNutrient && (
            <View style={styles.fullWidthCard}>
              <InsightCard
                title={`Low Nutrient: ${lowNutrient.nutrient}`}
                value={lowNutrient.value}
                unit="% of daily need"
                icon="alert"
                color={theme.colors.error}
              />
            </View>
          )}
        </View>
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
  sectionContainer: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  fullWidthCard: {
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    marginVertical: 8,
  },
});
