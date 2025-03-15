import { Meal, DailyNutrition, NutritionInsight } from './types';
import { BaseService, ApiResult } from './BaseService';

/**
 * Service for nutrition-related API operations
 * Extends BaseService to use caching, offline support, and retry logic
 */
export class NutritionService extends BaseService {
  private static instance: NutritionService;

  private constructor() {
    super('nutrition'); // Service name for cache keys and logging
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): NutritionService {
    if (!NutritionService.instance) {
      NutritionService.instance = new NutritionService();
    }
    return NutritionService.instance;
  }

  /**
   * Get meals for a user in a date range
   */
  public async getMeals(
    userId: string,
    startDate?: string,
    endDate?: string
  ): Promise<ApiResult<Meal[]>> {
    try {
      // Cache key based on parameters
      const dateParams = startDate && endDate 
        ? `_${startDate}_${endDate}` 
        : '';
      const cacheKey = `meals_${userId}${dateParams}`;
      
      // For demonstration during UI phase
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Return mock data
      return {
        data: sampleMeals,
        status: 'success'
      };
      
      // FUTURE IMPLEMENTATION:
      // let url = `/meals?userId=${userId}`;
      // if (startDate) url += `&startDate=${startDate}`;
      // if (endDate) url += `&endDate=${endDate}`;
      // 
      // return await this.apiRequest<Meal[]>(
      //   url,
      //   'GET',
      //   undefined,
      //   { cacheKey }
      // );
    } catch (error) {
      console.error('Error fetching meals:', error);
      return {
        error: error instanceof Error ? error : new Error(String(error)),
        status: 'error'
      };
    }
  }
  
  /**
   * Get daily nutrition for a specific date
   */
  public async getDailyNutrition(
    userId: string,
    date: string
  ): Promise<ApiResult<DailyNutrition>> {
    try {
      const cacheKey = `daily_nutrition_${userId}_${date}`;
      
      // For demonstration during UI phase
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // For demo, adjust the date to today
      const today = new Date().toISOString().split('T')[0];
      
      // Return mock data for today, null for other dates
      if (date === today) {
        return {
          data: sampleDailyNutrition,
          status: 'success'
        };
      } else {
        return {
          data: {
            ...sampleDailyNutrition,
            date,
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFat: 0,
            meals: [],
            nutrients: {}
          },
          status: 'success'
        };
      }
      
      // FUTURE IMPLEMENTATION:
      // return await this.apiRequest<DailyNutrition>(
      //   `/nutrition/daily?userId=${userId}&date=${date}`,
      //   'GET',
      //   undefined,
      //   { cacheKey }
      // );
    } catch (error) {
      console.error('Error fetching daily nutrition:', error);
      return {
        error: error instanceof Error ? error : new Error(String(error)),
        status: 'error'
      };
    }
  }
  
  /**
   * Get nutrition insights for a user
   */
  public async getInsights(userId: string): Promise<ApiResult<NutritionInsight[]>> {
    try {
      const cacheKey = `insights_${userId}`;
      
      // For demonstration during UI phase
      await new Promise(resolve => setTimeout(resolve, 350));
      
      // Return mock data
      return {
        data: sampleInsights,
        status: 'success'
      };
      
      // FUTURE IMPLEMENTATION:
      // return await this.apiRequest<NutritionInsight[]>(
      //   `/nutrition/insights?userId=${userId}`,
      //   'GET',
      //   undefined,
      //   { cacheKey }
      // );
    } catch (error) {
      console.error('Error fetching insights:', error);
      return {
        error: error instanceof Error ? error : new Error(String(error)),
        status: 'error'
      };
    }
  }
  
  /**
   * Add a new meal
   * Supports offline queuing for adding meals when offline
   */
  public async addMeal(meal: Omit<Meal, 'id'>): Promise<ApiResult<Meal>> {
    try {
      // For demonstration during UI phase
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Create a new meal with generated ID
      const newMeal: Meal = {
        ...meal,
        id: `meal_${Date.now()}`
      };
      
      return {
        data: newMeal,
        status: 'success'
      };
      
      // FUTURE IMPLEMENTATION:
      // return await this.apiRequest<Meal>(
      //   '/meals',
      //   'POST',
      //   meal,
      //   { offlineQueue: true }
      // );
    } catch (error) {
      console.error('Error adding meal:', error);
      return {
        error: error instanceof Error ? error : new Error(String(error)),
        status: 'error'
      };
    }
  }
  
  /**
   * Update an existing meal
   * Supports offline queuing for updates when offline
   */
  public async updateMeal(id: string, mealData: Partial<Meal>): Promise<ApiResult<Meal>> {
    try {
      // For demonstration during UI phase
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Find the meal to update in our mock data
      const existingMeal = sampleMeals.find(m => m.id === id);
      
      if (!existingMeal) {
        return {
          error: new Error(`Meal with ID ${id} not found`),
          status: 'error'
        };
      }
      
      // Update the meal
      const updatedMeal: Meal = {
        ...existingMeal,
        ...mealData
      };
      
      return {
        data: updatedMeal,
        status: 'success'
      };
      
      // FUTURE IMPLEMENTATION:
      // return await this.apiRequest<Meal>(
      //   `/meals/${id}`,
      //   'PUT',
      //   mealData,
      //   { offlineQueue: true }
      // );
    } catch (error) {
      console.error('Error updating meal:', error);
      return {
        error: error instanceof Error ? error : new Error(String(error)),
        status: 'error'
      };
    }
  }
  
  /**
   * Delete a meal
   * Supports offline queuing for deletion when offline
   */
  public async deleteMeal(id: string): Promise<ApiResult<boolean>> {
    try {
      // For demonstration during UI phase
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return {
        data: true,
        status: 'success'
      };
      
      // FUTURE IMPLEMENTATION:
      // return await this.apiRequest<boolean>(
      //   `/meals/${id}`,
      //   'DELETE',
      //   undefined,
      //   { offlineQueue: true }
      // );
    } catch (error) {
      console.error('Error deleting meal:', error);
      return {
        error: error instanceof Error ? error : new Error(String(error)),
        status: 'error'
      };
    }
  }
}

// Sample data for development
// In a real app, this would come from the API

// Sample food items
const sampleFoods = [
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