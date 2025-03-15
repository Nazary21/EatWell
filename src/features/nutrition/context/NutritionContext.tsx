import React, { createContext, useContext, useState, useEffect } from 'react';
import { Meal, DailyNutrition, NutritionInsight, FoodItem } from '@/services/api/types';
import { NutritionService } from '@/services/api/NutritionService';
import { FoodService } from '@/services/api/FoodService';

// Define the shape of the NutritionContext
interface NutritionContextType {
  meals: Meal[];
  todayMeals: Meal[];
  recentMeals: Meal[];
  dailyNutrition: DailyNutrition | null;
  insights: NutritionInsight[];
  isLoading: boolean;
  error: string | null;
  addMeal: (meal: Omit<Meal, 'id'>) => Promise<Meal | null>;
  updateMeal: (id: string, mealData: Partial<Meal>) => Promise<Meal | null>;
  deleteMeal: (id: string) => Promise<boolean>;
  fetchMeals: (startDate?: string, endDate?: string) => Promise<void>;
  searchFoods: (query: string) => Promise<FoodItem[]>;
  getFoodById: (id: string) => Promise<FoodItem | null>;
}

// Sample food items
const sampleFoods: FoodItem[] = [
  {
    id: '1',
    name: 'Scrambled Eggs',
    calories: 220,
    protein: 14,
    carbs: 2,
    fat: 16,
    servingSize: 100,
    servingUnit: 'g',
  },
  {
    id: '2',
    name: 'Whole Wheat Toast',
    calories: 130,
    protein: 4,
    carbs: 24,
    fat: 2,
    servingSize: 1,
    servingUnit: 'slice',
  },
  {
    id: '3',
    name: 'Grilled Chicken',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    servingSize: 100,
    servingUnit: 'g',
  },
  {
    id: '4',
    name: 'Brown Rice',
    calories: 215,
    protein: 5,
    carbs: 45,
    fat: 1.8,
    servingSize: 100,
    servingUnit: 'g',
  },
];

// Sample meals
const sampleMeals: Meal[] = [
  {
    id: '1',
    userId: '1',
    name: 'Breakfast',
    dateTime: new Date().toISOString(),
    totalCalories: 450,
    foods: [sampleFoods[0], sampleFoods[1]],
  },
  {
    id: '2',
    userId: '1',
    name: 'Lunch',
    dateTime: new Date().toISOString(),
    totalCalories: 680,
    foods: [sampleFoods[2], sampleFoods[3]],
  },
  {
    id: '3',
    userId: '1',
    name: 'Pasta',
    dateTime: new Date(Date.now() - 86400000).toISOString(), // yesterday
    totalCalories: 720,
    foods: [],
  },
  {
    id: '4',
    userId: '1',
    name: 'Salad',
    dateTime: new Date(Date.now() - 86400000).toISOString(), // yesterday
    totalCalories: 320,
    foods: [],
  },
  {
    id: '5',
    userId: '1',
    name: 'Sandwich',
    dateTime: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    totalCalories: 480,
    foods: [],
  },
];

// Sample daily nutrition
const sampleDailyNutrition: DailyNutrition = {
  date: new Date().toISOString().split('T')[0],
  totalCalories: 1130,
  totalProtein: 180,
  totalCarbs: 140,
  totalFat: 45,
  meals: ['1', '2'],
  nutrients: {
    'Vitamin C': 240,
    'Iron': 35,
    'Calcium': 80,
    'Fiber': 25,
  },
};

// Sample insights
const sampleInsights: NutritionInsight[] = [
  {
    id: '1',
    userId: '1',
    type: 'deficiency',
    nutrient: 'Iron',
    value: 35,
    recommendation: 'Consider adding more leafy greens to your diet',
  },
  {
    id: '2',
    userId: '1',
    type: 'excess',
    nutrient: 'Vitamin C',
    value: 240,
    recommendation: 'You are getting plenty of Vitamin C',
  },
];

// Create the context with a default undefined value
const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

// Provider component
export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get service instances
  const nutritionService = NutritionService.getInstance();
  const foodService = FoodService.getInstance();
  
  // State
  const [meals, setMeals] = useState<Meal[]>([]);
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition | null>(null);
  const [insights, setInsights] = useState<NutritionInsight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Default user ID (would come from auth in a real app)
  const userId = '1';

  // Load data on mount
  useEffect(() => {
    fetchMeals();
    fetchDailyNutrition();
    fetchInsights();
    
    // Listen for network status changes to process offline queue
    // This is a simplified version - in a real app, we'd use NetInfo's event listener
    const checkAndSyncOfflineData = async () => {
      try {
        await nutritionService.processOfflineQueue();
        await foodService.processOfflineQueue();
      } catch (error) {
        console.error('Error processing offline queue:', error);
      }
    };
    
    // Run once on mount
    checkAndSyncOfflineData();
    
    // Clean up expired cache items
    nutritionService.clearExpiredCache();
    foodService.clearExpiredCache();
  }, []);

  // Get today's meals
  const todayMeals = meals.filter(meal => {
    const mealDate = new Date(meal.dateTime).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    return mealDate === today;
  });

  // Get recent meals (not today)
  const recentMeals = meals.filter(meal => {
    const mealDate = new Date(meal.dateTime).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    return mealDate !== today;
  });

  // Fetch daily nutrition
  const fetchDailyNutrition = async () => {
    const today = new Date().toISOString().split('T')[0];
    const result = await nutritionService.getDailyNutrition(userId, today);
    
    if (result.status === 'success' && result.data) {
      setDailyNutrition(result.data);
    } else if (result.error) {
      setError(`Failed to fetch nutrition: ${result.error.message}`);
    }
  };
  
  // Fetch insights
  const fetchInsights = async () => {
    const result = await nutritionService.getInsights(userId);
    
    if (result.status === 'success' && result.data) {
      setInsights(result.data);
    } else if (result.error) {
      setError(`Failed to fetch insights: ${result.error.message}`);
    }
  };

  // Add a new meal
  const addMeal = async (meal: Omit<Meal, 'id'>): Promise<Meal | null> => {
    setIsLoading(true);
    
    try {
      // Call the nutrition service to add the meal
      const result = await nutritionService.addMeal({
        ...meal,
        userId, // Ensure the meal is associated with the user
      });
      
      if (result.status === 'success' && result.data) {
        // Update local state
        setMeals([...meals, result.data]);
        
        // Refresh daily nutrition if this is today's meal
        const mealDate = new Date(meal.dateTime).toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];
        if (mealDate === today) {
          fetchDailyNutrition();
        }
        
        setIsLoading(false);
        return result.data;
      } else {
        throw result.error || new Error('Failed to add meal');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(`Failed to add meal: ${errorMessage}`);
      setIsLoading(false);
      return null;
    }
  };

  // Update a meal
  const updateMeal = async (id: string, mealData: Partial<Meal>): Promise<Meal | null> => {
    setIsLoading(true);
    
    try {
      // Call the nutrition service to update the meal
      const result = await nutritionService.updateMeal(id, mealData);
      
      if (result.status === 'success' && result.data) {
        // Update local state
        setMeals(
          meals.map(meal => meal.id === id ? result.data : meal)
        );
        
        // Refresh daily nutrition (if this might affect today's data)
        fetchDailyNutrition();
        
        setIsLoading(false);
        return result.data;
      } else {
        throw result.error || new Error('Failed to update meal');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(`Failed to update meal: ${errorMessage}`);
      setIsLoading(false);
      return null;
    }
  };

  // Delete a meal
  const deleteMeal = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Call the nutrition service to delete the meal
      const result = await nutritionService.deleteMeal(id);
      
      if (result.status === 'success' && result.data) {
        // Update local state
        setMeals(meals.filter(meal => meal.id !== id));
        
        // Refresh daily nutrition (if this might affect today's data)
        fetchDailyNutrition();
        
        setIsLoading(false);
        return true;
      } else {
        throw result.error || new Error('Failed to delete meal');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(`Failed to delete meal: ${errorMessage}`);
      setIsLoading(false);
      return false;
    }
  };

  // Fetch meals for a date range
  const fetchMeals = async (startDate?: string, endDate?: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the nutrition service to get meals
      const result = await nutritionService.getMeals(userId, startDate, endDate);
      
      if (result.status === 'success' && result.data) {
        setMeals(result.data);
        setIsLoading(false);
      } else if (result.status === 'offline') {
        // Handle offline mode - we might show a notification or use cached data
        setError('You are offline. Showing most recent data.');
        setIsLoading(false);
      } else {
        throw result.error || new Error('Failed to fetch meals');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(`Failed to fetch meals: ${errorMessage}`);
      setIsLoading(false);
    }
  };
  
  // Search foods
  const searchFoods = async (query: string): Promise<FoodItem[]> => {
    try {
      const result = await foodService.searchFoods(query);
      
      if (result.status === 'success' && result.data) {
        return result.data;
      } else {
        console.error('Error searching foods:', result.error);
        return [];
      }
    } catch (error) {
      console.error('Error searching foods:', error);
      return [];
    }
  };
  
  // Get food by ID
  const getFoodById = async (id: string): Promise<FoodItem | null> => {
    try {
      const result = await foodService.getFoodById(id);
      
      if (result.status === 'success' && result.data) {
        return result.data;
      } else {
        console.error('Error getting food:', result.error);
        return null;
      }
    } catch (error) {
      console.error('Error getting food:', error);
      return null;
    }
  };

  // The value that will be provided to consumers of this context
  const value = {
    meals,
    todayMeals,
    recentMeals,
    dailyNutrition,
    insights,
    isLoading,
    error,
    addMeal,
    updateMeal,
    deleteMeal,
    fetchMeals,
    searchFoods,
    getFoodById,
  };

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  );
};

// Custom hook to use the nutrition context
export const useNutrition = (): NutritionContextType => {
  const context = useContext(NutritionContext);
  
  if (context === undefined) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  
  return context;
}; 