/**
 * Services index
 * 
 * This file provides a centralized export point for all services.
 * It also initializes the SyncManager on import.
 */

// API Services
import { FoodService } from './api/FoodService';
import { NutritionService } from './api/NutritionService';

// Sync Manager
import { SyncManager } from './sync/SyncManager';

// Initialize the SyncManager on import
// This will set up network listeners and handle offline data sync
try {
  const syncManager = SyncManager.getInstance();
  syncManager.initialize();
} catch (error) {
  console.error('[Services] Failed to initialize SyncManager:', error);
  // Continue without sync functionality
}

// Export services
export {
  // API Services
  FoodService,
  NutritionService,
  
  // Sync Manager
  SyncManager,
};

// Export type definitions
export type { ApiResult, RequestConfig } from './api/BaseService';

// Re-export common types
export * from './api/types'; 