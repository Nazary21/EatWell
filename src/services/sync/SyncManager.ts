import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Services that need to process offline queue
import { NutritionService } from '../api/NutritionService';
import { FoodService } from '../api/FoodService';

/**
 * SyncManager
 * 
 * Manages synchronization of offline data when network connectivity is restored
 * - Monitors network status
 * - Processes offline queue when online
 * - Handles conflict resolution
 */
export class SyncManager {
  private static instance: SyncManager;
  private isInitialized: boolean = false;
  
  private constructor() {}
  
  /**
   * Get singleton instance
   */
  public static getInstance(): SyncManager {
    if (!SyncManager.instance) {
      SyncManager.instance = new SyncManager();
    }
    return SyncManager.instance;
  }
  
  /**
   * Initialize the sync manager
   * Sets up network monitoring and sync processes
   */
  public initialize(): void {
    if (this.isInitialized) return;
    
    try {
      // Set up network change listener
      NetInfo.addEventListener(state => {
        // When connection is restored, process offline queue
        if (state.isConnected) {
          this.syncOfflineData();
        }
      });
      
      // Initial sync check
      this.checkAndSync();
      
      this.isInitialized = true;
      console.log('[SyncManager] Initialized');
    } catch (error) {
      console.error('[SyncManager] Initialization error:', error);
      // Continue with app without sync functionality
      this.isInitialized = true;
    }
  }
  
  /**
   * Run an initial check to see if we need to sync
   */
  private async checkAndSync(): Promise<void> {
    const networkState = await NetInfo.fetch();
    if (networkState.isConnected) {
      this.syncOfflineData();
    }
  }
  
  /**
   * Process offline data for all services
   */
  private async syncOfflineData(): Promise<void> {
    try {
      console.log('[SyncManager] Processing offline data...');
      
      // Process offline queues for each service
      const services = [
        NutritionService.getInstance(),
        FoodService.getInstance(),
      ];
      
      // Process queues in sequence
      for (const service of services) {
        await service.processOfflineQueue();
      }
      
      // Update last sync timestamp
      await AsyncStorage.setItem('last_sync_timestamp', Date.now().toString());
      
      console.log('[SyncManager] Offline data processed successfully');
    } catch (error) {
      console.error('[SyncManager] Error syncing offline data:', error);
    }
  }
  
  /**
   * Manually trigger sync
   * Can be called from UI when user initiates sync
   */
  public async syncNow(): Promise<boolean> {
    try {
      const networkState = await NetInfo.fetch();
      if (!networkState.isConnected) {
        console.log('[SyncManager] Cannot sync: offline');
        return false;
      }
      
      await this.syncOfflineData();
      return true;
    } catch (error) {
      console.error('[SyncManager] Manual sync failed:', error);
      return false;
    }
  }
  
  /**
   * Clear all expired cache data across services
   */
  public async clearExpiredCache(): Promise<void> {
    try {
      const services = [
        NutritionService.getInstance(),
        FoodService.getInstance(),
      ];
      
      for (const service of services) {
        await service.clearExpiredCache();
      }
      
      console.log('[SyncManager] Expired cache cleared');
    } catch (error) {
      console.error('[SyncManager] Error clearing expired cache:', error);
    }
  }
  
  /**
   * Check if the device is currently online
   */
  public async isOnline(): Promise<boolean> {
    const networkState = await NetInfo.fetch();
    return !!networkState.isConnected;
  }
  
  /**
   * Get the timestamp of the last successful sync
   */
  public async getLastSyncTime(): Promise<number | null> {
    try {
      const timestamp = await AsyncStorage.getItem('last_sync_timestamp');
      return timestamp ? parseInt(timestamp, 10) : null;
    } catch (error) {
      console.error('[SyncManager] Error getting last sync time:', error);
      return null;
    }
  }
} 