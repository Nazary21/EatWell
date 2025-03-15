import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform, Image, Pressable } from 'react-native';
import { Text, useTheme, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/shared/components/ui/ScreenHeader';
import { StatsCard } from '@/shared/components/ui/StatsCard';
import { MacroRatioCard } from '@/shared/components/ui/MacroRatioCard';
import { AddFoodCard } from '@/shared/components/ui/AddFoodCard';
import { FoodEntryCard } from '@/shared/components/ui/FoodEntryCard';
import { PlusIcon } from '@/shared/components/ui/PlusIcon';
import { CustomTheme } from '@/lib/theme/types';
import { useNutrition } from '@/features/nutrition/context/NutritionContext';
import { useUser } from '@/features/user/context/UserContext';

export default function HomeScreen() {
  const theme = useTheme<CustomTheme>();
  const { user } = useUser();
  const { todayMeals, recentMeals, dailyNutrition, isLoading } = useNutrition();
  const [fabPressed, setFabPressed] = useState(false);
  
  // Sample data for macronutrient ratio
  const macroData = {
    carbs: 21,
    protein: 24,
    fat: 55,
    status: 'Balanced',
    statusColor: '#4CAF50',
  };

  // Mock food entry data with descriptions and tags
  const foodEntries = [
    {
      id: '1',
      title: 'Breakfast',
      description: 'Oatmeal, eggs, coffee and salad',
      calories: 867,
      time: '9:34 AM',
      image: require('@/assets/breakfast.png'),
      tag: { text: 'Protein rich', color: '#FF4500', icon: 'food-drumstick' },
    },
    {
      id: '2',
      title: 'Lunch',
      description: 'Pork steak, chips and coke',
      calories: 920,
      time: '1:34 PM',
      tag: { text: 'Micro elements rich', color: '#4CAF50', icon: 'leaf' },
    },
  ];

  const handleAddPhoto = () => {
    console.log('Photo pressed');
  };

  const handleAddWriteDown = () => {
    console.log('Write down pressed');
  };

  const handleAddBarcode = () => {
    console.log('Barcode pressed');
  };

  const handleAddMeal = () => {
    console.log('Add meal pressed');
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScreenHeader 
        title={`Hey, ${user?.name?.split(' ')[0] || 'there'}`} 
        rightIcon="bell-outline" 
        onRightIconPress={() => console.log('Notifications')} 
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards Row */}
        <View style={styles.statsRow}>
          <StatsCard 
            title="Daily Calories" 
            value={dailyNutrition?.totalCalories || 0}
            subtitle="<2800 goal"
            style={styles.statsCard}
          />
          <StatsCard 
            title="Nutri score" 
            value="45%"
            badgeText="Unhealthy"
            badgeColor="#FF9800"
            style={styles.statsCard}
          />
        </View>
        
        {/* Macronutrients Ratio */}
        <MacroRatioCard 
          carbsPercentage={macroData.carbs}
          proteinPercentage={macroData.protein}
          fatPercentage={macroData.fat}
          status={macroData.status}
          statusColor={macroData.statusColor}
        />
        
        {/* Add Food Entry Card */}
        <AddFoodCard 
          onPhotoPress={handleAddPhoto}
          onWritePress={handleAddWriteDown}
          onBarcodePress={handleAddBarcode}
        />
        
        {/* Food Tracking Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Food tracking
            </Text>
            <TouchableOpacity onPress={() => console.log('See all pressed')}>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.entriesContainer}>
            {foodEntries.map(entry => (
              <FoodEntryCard
                key={entry.id}
                title={entry.title}
                description={entry.description}
                calories={entry.calories}
                time={entry.time}
                image={entry.image}
                tag={entry.tag}
                onPress={() => console.log(`Entry ${entry.id} pressed`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.fabContainer}>
        <Pressable 
          style={({ pressed }) => [
            styles.fab, 
            { backgroundColor: pressed ? '#4D4D4D' : '#333333' } // Change tone when pressed
          ]}
          onPress={handleAddMeal}
          onPressIn={() => setFabPressed(true)}
          onPressOut={() => setFabPressed(false)}
        >
          <PlusIcon size={28} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0', // Updated to tertiary surface color
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80, // More space for iOS
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
    gap: 16, // Added to ensure 16px gap between cards
  },
  statsCard: {
    flex: 1, // Use flex instead of width % for proper gap handling
    marginHorizontal: 0, // Remove horizontal margin to match design
    height: 'auto', // Remove fixed height to prevent padding glitch
  },
  sectionContainer: {
    marginTop: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 22, // Adjust size to match design
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '500',
  },
  entriesContainer: {
    marginTop: 4,
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: Platform.OS === 'ios' ? 24 : 16, // 12px margin from navbar
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16, // Inner padding as requested
  },
}); 