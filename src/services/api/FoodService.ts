import { FoodItem } from './types';
import { BaseService, ApiResult } from './BaseService';

/**
 * Service for food-related API operations
 * Extends BaseService to use caching, offline support, and retry logic
 */
export class FoodService extends BaseService {
  private static instance: FoodService;

  private constructor() {
    super('food'); // Service name for cache keys and logging
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): FoodService {
    if (!FoodService.instance) {
      FoodService.instance = new FoodService();
    }
    return FoodService.instance;
  }

  /**
   * Search for foods by name
   * Implements caching for faster repeat searches
   */
  public async searchFoods(query: string): Promise<ApiResult<FoodItem[]>> {
    try {
      // In production, this would call the API
      // For now, we'll use the backend connection layer with mock data
      
      // Generate a cache key from the query
      const cacheKey = `food_search_${query.toLowerCase()}`;
      
      // For demonstration during UI phase, we'll simulate the API call but use mock data
      // This follows our architecture pattern for easy transition to real API later
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Filter mock data (this simulates a server response)
      const filteredFoods = mockFoods.filter(food => 
        food.name.toLowerCase().includes(query.toLowerCase())
      );
      
      // Return the result in the standard ApiResult format
      return {
        data: filteredFoods,
        status: 'success',
      };
      
      // FUTURE IMPLEMENTATION:
      // When connecting to a real backend, we'd use this:
      // return await this.apiRequest<FoodItem[]>(
      //   `/foods/search?q=${encodeURIComponent(query)}`,
      //   'GET',
      //   undefined,
      //   { cacheKey }
      // );
    } catch (error) {
      console.error('Error searching foods:', error);
      return {
        error: error instanceof Error ? error : new Error(String(error)),
        status: 'error'
      };
    }
  }

  /**
   * Get food details by ID
   * Implements caching to avoid repeated fetches for the same food
   */
  public async getFoodById(id: string): Promise<ApiResult<FoodItem>> {
    try {
      // Cache key for this specific food
      const cacheKey = `food_details_${id}`;
      
      // For demonstration during UI phase
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Find food in mock data
      const food = mockFoods.find(f => f.id === id);
      
      if (!food) {
        return {
          error: new Error(`Food with ID ${id} not found`),
          status: 'error'
        };
      }
      
      return {
        data: food,
        status: 'success'
      };
      
      // FUTURE IMPLEMENTATION:
      // When connecting to a real backend:
      // return await this.apiRequest<FoodItem>(
      //   `/foods/${id}`,
      //   'GET',
      //   undefined,
      //   { cacheKey }
      // );
    } catch (error) {
      console.error(`Error getting food with ID ${id}:`, error);
      return {
        error: error instanceof Error ? error : new Error(String(error)),
        status: 'error'
      };
    }
  }
  
  /**
   * Save user food entry
   * For adding personal or custom food items
   * Supports offline queue for adding foods when offline
   */
  public async saveFood(food: Omit<FoodItem, 'id'>): Promise<ApiResult<FoodItem>> {
    try {
      // For demonstration during UI phase
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Generate a new ID (this would be done by the server in a real app)
      const newId = `custom_${Date.now()}`;
      
      // Create the new food with ID
      const newFood: FoodItem = {
        id: newId,
        ...food
      };
      
      return {
        data: newFood,
        status: 'success'
      };
      
      // FUTURE IMPLEMENTATION:
      // With a real backend, using offline capabilities:
      // return await this.apiRequest<FoodItem>(
      //   '/foods',
      //   'POST',
      //   food,
      //   { offlineQueue: true } // Will be queued if offline
      // );
    } catch (error) {
      console.error('Error saving food:', error);
      return {
        error: error instanceof Error ? error : new Error(String(error)),
        status: 'error'
      };
    }
  }
}

// Mock data for development
const mockFoods: FoodItem[] = [
  {
    id: '1',
    name: 'Grilled Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    servingSize: 100,
    servingUnit: 'g',
    nutrients: {
      'Vitamin B6': 30,
      'Niacin': 50,
      'Phosphorus': 20,
      'Selenium': 35,
    },
  },
  {
    id: '2',
    name: 'Salmon Fillet',
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    servingSize: 100,
    servingUnit: 'g',
    nutrients: {
      'Vitamin D': 100,
      'Vitamin B12': 80,
      'Omega-3': 70,
      'Potassium': 15,
    },
  },
  {
    id: '3',
    name: 'Brown Rice',
    calories: 112,
    protein: 2.6,
    carbs: 24,
    fat: 0.9,
    servingSize: 100,
    servingUnit: 'g',
    nutrients: {
      'Manganese': 40,
      'Magnesium': 15,
      'Phosphorus': 10,
      'Fiber': 5,
    },
  },
  {
    id: '4',
    name: 'Avocado',
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    servingSize: 100,
    servingUnit: 'g',
    nutrients: {
      'Vitamin K': 25,
      'Folate': 20,
      'Vitamin C': 15,
      'Potassium': 15,
    },
  },
  {
    id: '5',
    name: 'Greek Yogurt',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    servingSize: 100,
    servingUnit: 'g',
    nutrients: {
      'Calcium': 15,
      'Vitamin B12': 25,
      'Riboflavin': 15,
      'Phosphorus': 15,
    },
  },
]; 