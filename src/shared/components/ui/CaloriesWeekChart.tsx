import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useTheme } from 'react-native-paper';
import { colors } from '../../../lib/theme/tokens';

type DayData = {
  day: string;
  date: string;
  calories: number;
  goal: number;
};

interface CaloriesWeekChartProps {
  data: DayData[];
}

/**
 * Component that displays weekly calories in a bar chart
 * with day labels and a goal line indicator
 */
export const CaloriesWeekChart: React.FC<CaloriesWeekChartProps> = ({ data }) => {
  const theme = useTheme();
  
  // Extract day labels for the chart (e.g., "Mon", "Tue", etc.)
  const labels = data.map(item => item.day.substring(0, 3));
  
  // Calculate max value for chart scaling (max of calories or goal)
  const maxValue = Math.max(
    ...data.map(item => Math.max(item.calories, item.goal)),
    2000 // Ensure we have a reasonable minimum scale
  );
  
  // Determine if each day is over or under goal
  const isOverGoal = data.map(item => item.calories > item.goal);
  
  // Create chart dataset
  const chartData = {
    labels,
    datasets: [
      {
        data: data.map(item => item.calories),
        // Color functions as expected by react-native-chart-kit
        colors: isOverGoal.map(over => 
          (opacity = 1) => over 
            ? colors.chart.excess // Use excess color for over goal
            : colors.chart.success // Use success color for under goal
        ),
      },
    ],
  };
  
  // Calculate the relative position of the goal line
  const goalLineValue = data[0]?.goal || 2000;
  const goalLinePosition = (goalLineValue / maxValue) * 0.8; // Adjust for chart scale
  
  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: theme.colors.background,
    backgroundGradientTo: theme.colors.background,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 12,
      fill: theme.colors.onSurface,
    },
    barRadius: 5,
  };
  
  const screenWidth = Dimensions.get('window').width - 40; // Adjust for padding

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={screenWidth}
          height={180}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          showBarTops={false}
          fromZero
          withInnerLines={false}
          style={styles.chart}
        />
        
        {/* Goal line indicator */}
        <View 
          style={[
            styles.goalLine, 
            { 
              bottom: `${goalLinePosition * 100}%`, 
              backgroundColor: colors.chart.goalLine
            }
          ]}
        />
        
        {/* Goal label */}
        <View style={[styles.goalLabel, { bottom: `${goalLinePosition * 100}%` }]}>
          <Text style={styles.goalText}>Goal</Text>
        </View>
      </View>
      
      {/* Date labels below the chart */}
      <View style={styles.dateLabels}>
        {data.map((item, index) => (
          <View key={index} style={styles.dateLabel}>
            <Text style={styles.dateLabelText}>{item.date}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  chartContainer: {
    position: 'relative',
    height: 180,
    marginBottom: 8,
  },
  chart: {
    borderRadius: 16,
  },
  goalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    zIndex: 1,
  },
  goalLabel: {
    position: 'absolute',
    right: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    transform: [{ translateY: -10 }],
    zIndex: 2,
  },
  goalText: {
    fontSize: 10,
    color: '#666',
  },
  dateLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  dateLabel: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabelText: {
    fontSize: 10,
    color: '#666',
  },
});

export default CaloriesWeekChart; 